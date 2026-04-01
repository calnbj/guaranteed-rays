'use client'

/**
 * PubShared.tsx
 * ─────────────────────────────────────────────────────────
 * Shared primitives for the high-fidelity Pub Hero system.
 *
 * Design language: Monument Valley / WoraWork "Soft-Surface" aesthetic.
 * • Every extruded face carries a slight bevel via layered sub-meshes
 *   (Three.js RoundedBoxGeometry from drei or manual 2-layer offsets)
 * • MeshStandardMaterial configured for hand-painted / MatCap look:
 *     - roughness: 1.0 (fully matte, zero specular flash)
 *     - metalness: 0.0
 *     - subtle emissive tint on facade faces to simulate warm bounce-light
 * • Colour palette functions return graduated tints (lighter top, darker base)
 *   faking ambient-occlusion + diffuse ramp without a custom shader graph
 * ─────────────────────────────────────────────────────────
 */

import React, { useMemo } from 'react'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────
// MATERIAL FACTORY
// ─────────────────────────────────────────────────────────

/** Returns a MeshStandardMaterial configured for a painterly, matte look. */
export function paintMat(
  color: string,
  opts: {
    emissive?: string
    emissiveIntensity?: number
    roughness?: number
    metalness?: number
    transparent?: boolean
    opacity?: number
  } = {}
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    roughness:           opts.roughness          ?? 1.0,
    metalness:           opts.metalness          ?? 0.0,
    emissive:            new THREE.Color(opts.emissive ?? '#000000'),
    emissiveIntensity:   opts.emissiveIntensity  ?? 0,
    transparent:         opts.transparent        ?? false,
    opacity:             opts.opacity            ?? 1,
  })
}

// ─────────────────────────────────────────────────────────
// SOFT BOX  – the fundamental building block
// ─────────────────────────────────────────────────────────

interface SoftBoxProps {
  w: number
  h: number
  d: number
  color: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  radius?: number
  segments?: number
  emissive?: string
  emissiveIntensity?: number
  castShadow?: boolean
}

/**
 * A rounded-corner box using drei's RoundedBox.
 * radius defaults to min(0.18, smallest_side * 0.12) so proportions stay right.
 */
export function SoftBox({
  w, h, d, color, position = [0, 0, 0],
  rotation = [0, 0, 0],
  radius,
  segments = 4,
  emissive,
  emissiveIntensity = 0,
  castShadow = false,
}: SoftBoxProps) {
  const r = radius ?? Math.min(0.22, Math.min(w, h, d) * 0.14)
  const mat = useMemo(
    () => paintMat(color, { emissive, emissiveIntensity }),
    [color, emissive, emissiveIntensity]
  )
  return (
    <RoundedBox
      args={[w, h, d]}
      radius={r}
      smoothness={segments}
      position={position}
      rotation={rotation}
      castShadow={castShadow}
    >
      <primitive object={mat} attach="material" />
    </RoundedBox>
  )
}

// ─────────────────────────────────────────────────────────
// SOFT CYLINDER
// ─────────────────────────────────────────────────────────

interface SoftCylProps {
  rt?: number; rb?: number; h: number
  color: string
  position?: [number, number, number]
  segs?: number
  emissive?: string
  emissiveIntensity?: number
}

export function SoftCyl({
  rt = 0.5, rb = 0.5, h, color,
  position = [0, 0, 0], segs = 16,
  emissive, emissiveIntensity = 0,
}: SoftCylProps) {
  const mat = useMemo(
    () => paintMat(color, { emissive, emissiveIntensity }),
    [color, emissive, emissiveIntensity]
  )
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[rt, rb, h, segs]} />
      <primitive object={mat} attach="material" />
    </mesh>
  )
}

// ─────────────────────────────────────────────────────────
// ARCHED WINDOW
// ─────────────────────────────────────────────────────────

interface ArchedWindowProps {
  position?: [number, number, number]
  w?: number; h?: number; d?: number
  frameColor?: string
  glassColor?: string
  archHeight?: number
}

/**
 * An arched window built from:
 * 1. Rectangular lower pane
 * 2. Semi-circular arch top (lathe of a semicircle)
 * Both framed by a slightly extruded surround.
 */
export function ArchedWindow({
  position = [0, 0, 0],
  w = 1.2, h = 1.6, d = 0.14,
  frameColor = '#e8dfd0',
  glassColor = '#1a2a4a',
  archHeight = 0.55,
}: ArchedWindowProps) {
  // Build arch shape
  const archShape = useMemo(() => {
    const shape = new THREE.Shape()
    const hw = w * 0.5
    // rectangular lower section
    shape.moveTo(-hw, 0)
    shape.lineTo(-hw, h)
    // arch top
    shape.absarc(0, h, hw, Math.PI, 0, false)
    shape.lineTo(hw, 0)
    shape.lineTo(-hw, 0)
    return shape
  }, [w, h])

  const innerArchShape = useMemo(() => {
    const shape = new THREE.Shape()
    const iw = (w - 0.18) * 0.5
    const ih = h - 0.1
    shape.moveTo(-iw, 0)
    shape.lineTo(-iw, ih)
    shape.absarc(0, ih, iw, Math.PI, 0, false)
    shape.lineTo(iw, 0)
    shape.lineTo(-iw, 0)
    return shape
  }, [w, h])

  const extrudeSettings = useMemo<THREE.ExtrudeGeometryParameters>(() => ({
    depth: d * 0.55,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 3,
  }), [d])

  const glassExtrudeSettings = useMemo<THREE.ExtrudeGeometryParameters>(() => ({
    depth: d * 0.18,
    bevelEnabled: false,
  }), [d])

  const frameMat  = useMemo(() => paintMat(frameColor), [frameColor])
  const glassMat  = useMemo(() => paintMat(glassColor, { emissive: glassColor, emissiveIntensity: 0.12 }), [glassColor])

  return (
    <group position={position}>
      {/* Frame surround */}
      <mesh castShadow>
        <extrudeGeometry args={[archShape, extrudeSettings]} />
        <primitive object={frameMat} attach="material" />
      </mesh>
      {/* Glass inner */}
      <mesh position={[0, 0, d * 0.28]}>
        <extrudeGeometry args={[innerArchShape, glassExtrudeSettings]} />
        <primitive object={glassMat} attach="material" />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// RECTANGULAR WINDOW WITH BEVEL FRAME
// ─────────────────────────────────────────────────────────

interface RectWindowProps {
  position?: [number, number, number]
  w?: number; h?: number; depth?: number
  frameColor?: string
  glassColor?: string
  divisions?: boolean
}

export function RectWindow({
  position = [0, 0, 0],
  w = 1.2, h = 1.6, depth = 0.14,
  frameColor = '#e8dfd0',
  glassColor = '#1a2a4a',
  divisions = true,
}: RectWindowProps) {
  const frameMat = useMemo(() => paintMat(frameColor), [frameColor])
  const glassMat = useMemo(
    () => paintMat(glassColor, { emissive: glassColor, emissiveIntensity: 0.08 }),
    [glassColor]
  )
  const divMat = useMemo(() => paintMat(frameColor), [frameColor])

  const fr = 0.09 // frame thickness
  return (
    <group position={position}>
      {/* Outer frame (rounded box) */}
      <RoundedBox args={[w, h, depth * 0.6]} radius={0.06} smoothness={3} castShadow>
        <primitive object={frameMat} attach="material" />
      </RoundedBox>
      {/* Glass pane */}
      <RoundedBox
        args={[w - fr * 2, h - fr * 2, depth * 0.3]}
        radius={0.04} smoothness={3}
        position={[0, 0, depth * 0.18]}
      >
        <primitive object={glassMat} attach="material" />
      </RoundedBox>
      {/* Horizontal glazing bar */}
      {divisions && (
        <RoundedBox args={[w - fr * 2, 0.06, depth * 0.35]} radius={0.02} smoothness={2} position={[0, 0, depth * 0.2]}>
          <primitive object={divMat} attach="material" />
        </RoundedBox>
      )}
      {/* Vertical glazing bar */}
      {divisions && (
        <RoundedBox args={[0.06, h - fr * 2, depth * 0.35]} radius={0.02} smoothness={2} position={[0, 0, depth * 0.2]}>
          <primitive object={divMat} attach="material" />
        </RoundedBox>
      )}
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// PUB SIGN  – hanging panel with bracket
// ─────────────────────────────────────────────────────────

interface PubSignProps {
  position?: [number, number, number]
  color?: string
  w?: number; h?: number
  facing?: 'z' | 'x'
}

export function PubHeroSign({
  position = [0, 0, 0],
  color = '#1c2d58',
  w = 3.6, h = 0.85,
  facing = 'z',
}: PubSignProps) {
  const boardMat  = useMemo(() => paintMat(color, { emissive: color, emissiveIntensity: 0.05 }), [color])
  const goldMat   = useMemo(() => paintMat('#c9a84c', { emissive: '#c9a84c', emissiveIntensity: 0.08 }), [])
  const bracketMat = useMemo(() => paintMat('#4a3828'), [])

  const rot: [number, number, number] = facing === 'x' ? [0, Math.PI * 0.5, 0] : [0, 0, 0]

  return (
    <group position={position} rotation={rot}>
      {/* Bracket arm */}
      <RoundedBox args={[0.1, 0.1, 0.9]} radius={0.04} smoothness={3} position={[0, 0.35, -0.42]}>
        <primitive object={bracketMat} attach="material" />
      </RoundedBox>
      {/* Sign board */}
      <RoundedBox args={[w, h, 0.14]} radius={0.06} smoothness={4} position={[0, 0, -0.9]}>
        <primitive object={boardMat} attach="material" />
      </RoundedBox>
      {/* Gold lettering panel */}
      <RoundedBox args={[w - 0.2, h - 0.2, 0.05]} radius={0.04} smoothness={3} position={[0, 0, -0.82]}>
        <primitive object={goldMat} attach="material" />
      </RoundedBox>
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// CHIMNEY STACK
// ─────────────────────────────────────────────────────────

interface ChimneyProps {
  position?: [number, number, number]
  color?: string
  h?: number
  w?: number
}

export function Chimney({ position = [0, 0, 0], color = '#b06838', h = 2.2, w = 0.7 }: ChimneyProps) {
  const potMat = useMemo(() => paintMat('#8a5030'), [])
  const stackMat = useMemo(() => paintMat(color), [color])
  return (
    <group position={position}>
      <RoundedBox args={[w, h, w]} radius={0.08} smoothness={3} position={[0, h * 0.5, 0]}>
        <primitive object={stackMat} attach="material" />
      </RoundedBox>
      {/* Cap */}
      <RoundedBox args={[w + 0.16, 0.22, w + 0.16]} radius={0.05} smoothness={3} position={[0, h + 0.11, 0]}>
        <primitive object={stackMat} attach="material" />
      </RoundedBox>
      {/* Flue pot */}
      <SoftCyl rt={0.18} rb={0.22} h={0.5} color="#7a4828" position={[0, h + 0.5, 0]} segs={12} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// AWNING
// ─────────────────────────────────────────────────────────

interface AwningProps {
  position?: [number, number, number]
  w?: number
  color?: string
  stripeColor?: string
}

export function Awning({ position = [0, 0, 0], w = 4, color = '#2e5a2e', stripeColor = '#a0c864' }: AwningProps) {
  const mat    = useMemo(() => paintMat(color), [color])
  const stripMat = useMemo(() => paintMat(stripeColor), [stripeColor])
  const stripeCount = Math.floor(w / 0.55)
  return (
    <group position={position}>
      {/* Main awning sloped slab */}
      <mesh rotation={[0.38, 0, 0]}>
        <boxGeometry args={[w, 0.08, 1.6]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Valance */}
      <mesh position={[0, -0.28, 0.72]}>
        <boxGeometry args={[w, 0.32, 0.06]} />
        <primitive object={mat} attach="material" />
      </mesh>
      {/* Highlight stripes */}
      {Array.from({ length: stripeCount }).map((_, i) => (
        <mesh key={i} position={[-w * 0.5 + 0.28 + i * 0.55, 0, 0]} rotation={[0.38, 0, 0]}>
          <boxGeometry args={[0.14, 0.09, 1.6]} />
          <primitive object={stripMat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// OUTDOOR BENCH (toy-like)
// ─────────────────────────────────────────────────────────

interface BenchProps {
  position?: [number, number, number]
  rotation?: [number, number, number]
  color?: string
}

export function ToyBench({ position = [0, 0, 0], rotation = [0, 0, 0], color = '#7a6040' }: BenchProps) {
  const mat  = useMemo(() => paintMat(color), [color])
  const legMat = useMemo(() => paintMat('#5a4030'), [])
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[2.2, 0.18, 0.55]} radius={0.06} smoothness={3} position={[0, 0.55, 0]}>
        <primitive object={mat} attach="material" />
      </RoundedBox>
      {/* Legs */}
      {([-0.85, 0.85] as number[]).map((x, i) => (
        <RoundedBox key={i} args={[0.14, 0.46, 0.55]} radius={0.05} smoothness={3} position={[x, 0.22, 0]}>
          <primitive object={legMat} attach="material" />
        </RoundedBox>
      ))}
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// PICNIC TABLE
// ─────────────────────────────────────────────────────────

export function PicnicTable({ position = [0, 0, 0] as [number, number, number] }) {
  const topMat  = useMemo(() => paintMat('#8a6848'), [])
  const legMat  = useMemo(() => paintMat('#6a5030'), [])
  return (
    <group position={position}>
      <RoundedBox args={[1.8, 0.14, 0.9]} radius={0.05} smoothness={3} position={[0, 0.82, 0]}>
        <primitive object={topMat} attach="material" />
      </RoundedBox>
      {/* Bench seats */}
      {([-0.65, 0.65] as number[]).map((z, i) => (
        <RoundedBox key={i} args={[1.8, 0.1, 0.38]} radius={0.04} smoothness={3} position={[0, 0.52, z]}>
          <primitive object={topMat} attach="material" />
        </RoundedBox>
      ))}
      {/* Cross legs */}
      {([-0.6, 0.6] as number[]).map((x, i) => (
        <mesh key={i} position={[x, 0.38, 0]} rotation={[0.55, 0, 0]}>
          <boxGeometry args={[0.12, 0.85, 0.12]} />
          <primitive object={legMat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// HANGING FLOWER BASKET
// ─────────────────────────────────────────────────────────

export function FlowerBasket({ position = [0, 0, 0] as [number, number, number] }) {
  const basketMat  = useMemo(() => paintMat('#8a6840'), [])
  const leaf1Mat   = useMemo(() => paintMat('#3a8a48', { emissive: '#3a8a48', emissiveIntensity: 0.04 }), [])
  const leaf2Mat   = useMemo(() => paintMat('#da5070', { emissive: '#da5070', emissiveIntensity: 0.06 }), [])
  return (
    <group position={position}>
      {/* Chain */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.6, 5]} />
        <primitive object={basketMat} attach="material" />
      </mesh>
      {/* Basket */}
      <SoftCyl rt={0.3} rb={0.2} h={0.35} color="#7a5a30" position={[0, 0, 0]} segs={10} />
      {/* Foliage */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.38, 8, 6]} />
        <primitive object={leaf1Mat} attach="material" />
      </mesh>
      {/* Flowers */}
      {([
        [0.22, 0.38, 0.1], [-0.2, 0.3, 0.15], [0.05, 0.42, -0.2]
      ] as [number, number, number][]).map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.1, 6, 5]} />
          <primitive object={leaf2Mat} attach="material" />
        </mesh>
      ))}
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// ENTRANCE DOOR
// ─────────────────────────────────────────────────────────

interface DoorProps {
  position?: [number, number, number]
  color?: string
  w?: number; h?: number
  arched?: boolean
}

export function PubDoor({ position = [0, 0, 0], color = '#1a3020', w = 1.4, h = 2.6, arched = true }: DoorProps) {
  const doorMat  = useMemo(() => paintMat(color, { emissive: color, emissiveIntensity: 0.04 }), [color])
  const frameMat = useMemo(() => paintMat('#d8cfc0'), [])
  const glassMat = useMemo(
    () => paintMat('#1a2a40', { emissive: '#2a4060', emissiveIntensity: 0.15, transparent: true, opacity: 0.85 }),
    []
  )
  const panelMat = useMemo(() => paintMat('#c89a50', { emissive: '#c89a50', emissiveIntensity: 0.06 }), [])

  const archH = arched ? 0.45 : 0
  return (
    <group position={position}>
      {/* Frame */}
      <RoundedBox args={[w + 0.28, h + archH + 0.2, 0.18]} radius={0.06} smoothness={3}>
        <primitive object={frameMat} attach="material" />
      </RoundedBox>
      {/* Door panel */}
      <RoundedBox args={[w, h, 0.14]} radius={0.05} smoothness={3} position={[0, -archH * 0.5, 0.08]}>
        <primitive object={doorMat} attach="material" />
      </RoundedBox>
      {/* Upper glass transom */}
      <RoundedBox args={[w - 0.1, 0.55, 0.1]} radius={0.04} smoothness={3} position={[0, h * 0.5 + 0.08, 0.1]}>
        <primitive object={glassMat} attach="material" />
      </RoundedBox>
      {/* Panel details */}
      {([
        [0, h * 0.22 - archH * 0.5],
        [0, -h * 0.18 - archH * 0.5],
      ] as [number, number][]).map(([px, py], i) => (
        <RoundedBox key={i} args={[w - 0.26, 0.55, 0.06]} radius={0.04} smoothness={3} position={[px, py, 0.14]}>
          <primitive object={panelMat} attach="material" />
        </RoundedBox>
      ))}
      {/* Door knob */}
      <mesh position={[w * 0.28, -0.1 - archH * 0.5, 0.2]}>
        <sphereGeometry args={[0.08, 8, 6]} />
        <meshStandardMaterial color="#d4a020" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// NIGHTLIFE POINT LIGHT  – warm entryway glow
// ─────────────────────────────────────────────────────────

interface NightLightProps {
  position?: [number, number, number]
  color?: string
  intensity?: number
  distance?: number
}

export function NightLight({
  position = [0, 2, -4],
  color = '#ffb060',
  intensity = 8,
  distance = 12,
}: NightLightProps) {
  return (
    <group position={position}>
      {/* Visible warm globe */}
      <mesh>
        <sphereGeometry args={[0.18, 10, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={2.5}
          roughness={0.2}
          metalness={0}
          transparent
          opacity={0.92}
        />
      </mesh>
      {/* Actual point light */}
      <pointLight
        color={color}
        intensity={intensity}
        distance={distance}
        decay={2}
        castShadow={false}
      />
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// WALL LAMP SCONCE
// ─────────────────────────────────────────────────────────

export function WallSconce({ position = [0, 0, 0] as [number, number, number] }) {
  const bktMat = useMemo(() => paintMat('#3a3028'), [])
  return (
    <group position={position}>
      {/* Bracket arm */}
      <RoundedBox args={[0.08, 0.08, 0.55]} radius={0.03} smoothness={3} position={[0, 0, -0.25]}>
        <primitive object={bktMat} attach="material" />
      </RoundedBox>
      {/* Globe */}
      <mesh position={[0, 0, -0.55]}>
        <sphereGeometry args={[0.15, 10, 8]} />
        <meshStandardMaterial color="#ffe8a0" emissive="#ffe8a0" emissiveIntensity={2} roughness={0.15} metalness={0} />
      </mesh>
      <pointLight position={[0, 0, -0.55]} color="#ffcc70" intensity={3} distance={6} decay={2} />
    </group>
  )
}
