'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

import Player from './Player'
import Path from './Path'
import PubArchitecture from './PubArchitecture'
import { mapNodes } from '../lib/mapData'
import type { MapNode } from '../lib/mapData'

// Ground component: base terrain with park plateau
function Ground() {
  return (
    <group name="ground">
      {/* Main ground plane */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[400, 0.2, 400]} />
        <meshLambertMaterial color="#c8c2b6" />
      </mesh>

      {/* Park plateau - first layer */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[92, 0.6, 58]} />
        <meshLambertMaterial color="#7aad6a" />
      </mesh>

      {/* Park plateau - second depth layer */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[88, 0.4, 54]} />
        <meshLambertMaterial color="#8abd7a" />
      </mesh>

      {/* Park center darker grass */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[60, 0.2, 36]} />
        <meshLambertMaterial color="#5a9a5a" />
      </mesh>
    </group>
  )
}

// ParkFence component: perimeter fence with gate openings
function ParkFence() {
  const fenceColor = '#6a5a3a'
  const pillarColor = '#c8c0b0'

  return (
    <group name="park-fence">
      {/* North edge (z=-28) split at gate_n */}
      {/* West section rail */}
      <mesh position={[-24, 1.4, -28]}>
        <boxGeometry args={[42, 0.15, 0.25]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>
      <mesh position={[-24, 0.85, -28]}>
        <boxGeometry args={[42, 0.15, 0.25]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>

      {/* East section rail */}
      <mesh position={[24, 1.4, -28]}>
        <boxGeometry args={[42, 0.15, 0.25]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>
      <mesh position={[24, 0.85, -28]}>
        <boxGeometry args={[42, 0.15, 0.25]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>

      {/* North gate pillars */}
      <mesh position={[-3, 0, -28]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshLambertMaterial color={pillarColor} />
      </mesh>
      <mesh position={[3, 0, -28]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshLambertMaterial color={pillarColor} />
      </mesh>

      {/* South edge (z=28) split at gate_s */}
      {/* West section rail */}
      <mesh position={[-28.5, 1.4, 28]}>
        <boxGeometry args={[33, 0.15, 0.25]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>
      <mesh position={[-28.5, 0.85, 28]}>
        <boxGeometry args={[33, 0.15, 0.25]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>

      {/* East section rail */}
      <mesh position={[20.5, 1.4, 28]}>
        <boxGeometry args={[49, 0.15, 0.25]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>
      <mesh position={[20.5, 0.85, 28]}>
        <boxGeometry args={[49, 0.15, 0.25]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>

      {/* South gate pillars */}
      <mesh position={[-10, 0, 28]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshLambertMaterial color={pillarColor} />
      </mesh>
      <mesh position={[-6, 0, 28]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshLambertMaterial color={pillarColor} />
      </mesh>

      {/* West edge (x=-45) split at gate_w */}
      {/* North section rail */}
      <mesh position={[-45, 1.4, -13.5]}>
        <boxGeometry args={[0.25, 0.15, 29]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>
      <mesh position={[-45, 0.85, -13.5]}>
        <boxGeometry args={[0.25, 0.15, 29]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>

      {/* South section rail */}
      <mesh position={[-45, 1.4, 18.5]}>
        <boxGeometry args={[0.25, 0.15, 19]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>
      <mesh position={[-45, 0.85, 18.5]}>
        <boxGeometry args={[0.25, 0.15, 19]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>

      {/* West gate pillars */}
      <mesh position={[-45, 0, 3]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshLambertMaterial color={pillarColor} />
      </mesh>
      <mesh position={[-45, 0, 7]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshLambertMaterial color={pillarColor} />
      </mesh>

      {/* East edge (x=45) split at gate_e */}
      {/* North section rail */}
      <mesh position={[45, 1.4, -13.5]}>
        <boxGeometry args={[0.25, 0.15, 29]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>
      <mesh position={[45, 0.85, -13.5]}>
        <boxGeometry args={[0.25, 0.15, 29]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>

      {/* South section rail */}
      <mesh position={[45, 1.4, 18.5]}>
        <boxGeometry args={[0.25, 0.15, 19]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>
      <mesh position={[45, 0.85, 18.5]}>
        <boxGeometry args={[0.25, 0.15, 19]} />
        <meshLambertMaterial color={fenceColor} />
      </mesh>

      {/* East gate pillars */}
      <mesh position={[45, 0, 3]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshLambertMaterial color={pillarColor} />
      </mesh>
      <mesh position={[45, 0, 7]}>
        <boxGeometry args={[1.2, 2.8, 1.2]} />
        <meshLambertMaterial color={pillarColor} />
      </mesh>
    </group>
  )
}

// Tree component: geometric foliage with cone tiers and cylinder trunk
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const s = scale

  return (
    <group position={position} name="tree">
      {/* Trunk */}
      <mesh position={[0, 0.75 * s, 0]}>
        <cylinderGeometry args={[0.25 * s, 0.25 * s, 1.5 * s, 8]} />
        <meshLambertMaterial color="#5a4020" />
      </mesh>

      {/* Tier 1 (bottom) */}
      <mesh position={[0, 2.5 * s, 0]}>
        <coneGeometry args={[2.2 * s, 2.0 * s, 16]} />
        <meshLambertMaterial color="#4a8a3a" />
      </mesh>

      {/* Tier 2 (middle) */}
      <mesh position={[0, 3.8 * s, 0]}>
        <coneGeometry args={[1.7 * s, 1.8 * s, 16]} />
        <meshLambertMaterial color="#5a9a48" />
      </mesh>

      {/* Tier 3 (top) */}
      <mesh position={[0, 5.0 * s, 0]}>
        <coneGeometry args={[1.1 * s, 1.6 * s, 16]} />
        <meshLambertMaterial color="#6aaa58" />
      </mesh>
    </group>
  )
}

// Park trees array
const parkTrees: [[number, number, number], number][] = [
  [[-28, 0, -18], 1.1],
  [[-15, 0, 10], 0.9],
  [[-35, 0, 5], 1.2],
  [[20, 0, -15], 1.0],
  [[35, 0, 10], 0.85],
  [[10, 0, 18], 1.1],
  [[-20, 0, 20], 0.95],
  [[28, 0, -8], 1.0],
  [[-8, 0, -20], 0.9],
  [[15, 0, 5], 1.2],
  [[-30, 0, -8], 1.0],
  [[38, 0, -15], 0.85],
]

// BgBlock component: simple background building
interface BgBlockProps {
  position: [number, number, number]
  w: number
  d: number
  h: number
  color: string
}

function BgBlock({ position, w, d, h, color }: BgBlockProps) {
  return (
    <group position={position} name="bg-building">
      {/* Main block */}
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshLambertMaterial color={color} />
      </mesh>

      {/* Roof trim */}
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w + 0.2, 0.15, d + 0.2]} />
        <meshLambertMaterial color="#a8a8a0" />
      </mesh>

      {/* Window grid on front face */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => {
          const startY = h * 0.2
          const windowSpacing = h * 0.15
          const yPos = startY + row * windowSpacing
          const xSpacing = w * 0.2
          const xPos = -w / 2 + w * 0.15 + col * xSpacing

          return (
            <mesh key={`window-${row}-${col}`} position={[xPos, yPos, d / 2 + 0.05]}>
              <boxGeometry args={[0.3, 0.4, 0.08]} />
              <meshLambertMaterial color="#1e2d52" />
            </mesh>
          )
        })
      )}
    </group>
  )
}

// Background buildings array
const bgBuildings: { pos: [number, number]; w: number; d: number; h: number; color: string }[] = [
  { pos: [8, -130], w: 5, d: 5, h: 9, color: '#b8c0c8' },
  { pos: [-8, -130], w: 4, d: 5, h: 11, color: '#c0b8b0' },
  { pos: [8, -115], w: 4, d: 4, h: 7, color: '#b0b8c0' },
  { pos: [6, -90], w: 3, d: 4, h: 8, color: '#c0bab2' },
  { pos: [-6, -90], w: 3.5, d: 4, h: 9, color: '#b8b0a8' },
  { pos: [55, -55], w: 4, d: 4, h: 8, color: '#b8c0ba' },
  { pos: [55, -65], w: 3, d: 4, h: 10, color: '#c0b8c0' },
  { pos: [75, -55], w: 4, d: 4, h: 7, color: '#b8b8c0' },
  { pos: [-55, -90], w: 4, d: 4, h: 9, color: '#c0c0b8' },
  { pos: [-55, -70], w: 3.5, d: 4, h: 8, color: '#b8bcc0' },
  { pos: [-30, 55], w: 4, d: 4, h: 7, color: '#c0b8b8' },
  { pos: [-10, 60], w: 3.5, d: 4, h: 9, color: '#b8c0b8' },
  { pos: [8, -55], w: 3, d: 4, h: 8, color: '#c0bab8' },
  { pos: [-8, -55], w: 3.5, d: 4, h: 10, color: '#b8c0c0' },
]

// Landmark component: wraps PubArchitecture per project spec
function Landmark({ node }: { node: MapNode }) {
  return (
    <group position={[node.x, 0, node.z]} name={`landmark-${node.id}`}>
      <PubArchitecture pubName={node.id} />
    </group>
  )
}

// Scene component: main world render
function Scene() {
  return (
    <>
      <color attach="background" args={['#ddd8cc']} />
      <fog attach="fog" args={['#ddd8cc', 160, 400]} />
      {/* Soft global ambient — kept low so pub point lights pop */}
      <ambientLight intensity={0.55} color="#fdf4e8" />
      {/* Key directional light — angled for isometric depth */}
      <directionalLight
        intensity={1.05}
        position={[12, 28, 14]}
        color="#fff5e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />
      {/* Subtle cool fill from opposite side (sky bounce) */}
      <directionalLight intensity={0.28} position={[-8, 12, -10]} color="#c0d4f0" />
      
      <Suspense fallback={null}>
        <Player />
        <Ground />
        <ParkFence />
        <Path />
        
        {parkTrees.map(([pos, s], i) => (
          <Tree key={i} position={pos as [number, number, number]} scale={s as number} />
        ))}
        
        {bgBuildings.map((b, i) => (
          <BgBlock
            key={i}
            position={[b.pos[0], 0, b.pos[1]]}
            w={b.w}
            d={b.d}
            h={b.h}
            color={b.color}
          />
        ))}
        
        {mapNodes
          .filter(n => n.type === 'pub')
          .map(node => (
            <Landmark key={node.id} node={node} />
          ))}
      </Suspense>
    </>
  )
}

// Default export: main World component
export default function World() {
  return (
    <div style={{ width: '100%', height: '100vh', background: '#e8e2d6' }}>
      <Canvas
        orthographic
        camera={{ zoom: 45, position: [50, 50, 50], near: 0.1, far: 1400 }}
        shadows="soft"
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
