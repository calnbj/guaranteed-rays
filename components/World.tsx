'use client'

// =============================================================================
// World.tsx — Monument Valley diorama with Peckham maze, Rye plateau,
// geometric foliage, and atmospheric fog.
//
// CONSTRAINTS: MeshLambertMaterial only. No shadow maps. No ContactShadows.
// AmbientLight(0.7) + DirectionalLight(1.2) at [10,20,10].
// Geometry: BoxGeometry / CylinderGeometry / ConeGeometry only.
// =============================================================================

import { Canvas }   from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import Player          from './Player'
import Path            from './Path'
import PubArchitecture from './PubArchitecture'
import { mapNodes }    from '../lib/mapData'

// ---------------------------------------------------------------------------
// Name → PubArchitecture key
// ---------------------------------------------------------------------------
function getPubName(name: string): string {
  const map: Record<string, string> = {
    'THE VICTORIA': 'victoria',
    'MONTPELIER':   'montpelier',
    'GOWLETT':      'gowlett',
    'CLOCK HOUSE':  'clockhouse',
  }
  return map[name] ?? 'default'
}

// ---------------------------------------------------------------------------
// GROUND — large base plane + subtle stone-tile slabs under each node
// ---------------------------------------------------------------------------
function Ground() {
  return (
    <>
      {/* World floor */}
      <mesh position={[0, -0.08, 40]}>
        <boxGeometry args={[220, 0.14, 240]} />
        <meshLambertMaterial color="#ccc5b8" />
      </mesh>
      {/* Per-node stone slabs */}
      {mapNodes.map((node, i) => (
        <mesh key={i} position={[node.x, -0.04, node.z]}>
          <boxGeometry args={[16, 0.05, 16]} />
          <meshLambertMaterial color={i % 2 === 0 ? '#cac3b6' : '#d2cbc0'} />
        </mesh>
      ))}
    </>
  )
}


// ---------------------------------------------------------------------------
// TREE — abstract geometric foliage: 3 stacked ConeGeometry tiers
// on a CylinderGeometry trunk. Scale prop allows size variation.
// ---------------------------------------------------------------------------
function Tree({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const s = scale
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 1.5 * s, 0]}>
        <cylinderGeometry args={[0.28 * s, 0.42 * s, 3.0 * s, 6]} />
        <meshLambertMaterial color="#5c3d1e" />
      </mesh>
      {/* Foliage tier 1 — widest, lowest */}
      <mesh position={[0, 4.2 * s, 0]}>
        <coneGeometry args={[3.2 * s, 3.8 * s, 7]} />
        <meshLambertMaterial color="#3a6b44" />
      </mesh>
      {/* Foliage tier 2 — mid */}
      <mesh position={[0, 6.4 * s, 0]}>
        <coneGeometry args={[2.3 * s, 3.2 * s, 7]} />
        <meshLambertMaterial color="#4a8055" />
      </mesh>
      {/* Foliage tier 3 — narrowest, top */}
      <mesh position={[0, 8.3 * s, 0]}>
        <coneGeometry args={[1.4 * s, 2.6 * s, 7]} />
        <meshLambertMaterial color="#3a6b44" />
      </mesh>
    </group>
  )
}

// ---------------------------------------------------------------------------
// PECKHAM RYE — raised green plateau with tree clusters.
// Positioned at the south end of the map, accessible via Barry Rd corner.
// Built from BoxGeometry slabs only (no PlaneGeometry).
// ---------------------------------------------------------------------------
function PeckhamRye() {
  return (
    <group name="peckham-rye">
      {/* Outer border / plinth — darkest green, gives the plateau an edge */}
      <mesh position={[-15, 0.22, 85]}>
        <boxGeometry args={[58, 0.44, 44]} />
        <meshLambertMaterial color="#2d5032" />
      </mesh>
      {/* Main plateau body */}
      <mesh position={[-15, 0.62, 85]}>
        <boxGeometry args={[54, 0.8, 40]} />
        <meshLambertMaterial color="#3d6640" />
      </mesh>
      {/* Top grass surface — slightly lighter */}
      <mesh position={[-15, 1.08, 85]}>
        <boxGeometry args={[53, 0.1, 39]} />
        <meshLambertMaterial color="#4a7c50" />
      </mesh>
      {/* Scattered path across the park — stone strip */}
      <mesh position={[-15, 1.1, 85]}>
        <boxGeometry args={[2.5, 0.06, 36]} />
        <meshLambertMaterial color="#c8bfb2" />
      </mesh>

      {/* Tree cluster — varied scales for natural silhouette */}
      <Tree position={[-30, 1.1, 76]} scale={1.1} />
      <Tree position={[-22, 1.1, 80]} scale={0.82} />
      <Tree position={[-10, 1.1, 77]} scale={1.0} />
      <Tree position={[-4,  1.1, 86]} scale={0.75} />
      <Tree position={[-26, 1.1, 91]} scale={0.9} />
      <Tree position={[-36, 1.1, 88]} scale={1.2} />
      <Tree position={[0,   1.1, 82]} scale={0.7} />
      <Tree position={[-18, 1.1, 94]} scale={0.85} />
      <Tree position={[-8,  1.1, 92]} scale={1.05} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// BACKGROUND BLOCK — urban filler building with window grid.
// Positioned to line the actual road corridors, not scattered randomly.
// ---------------------------------------------------------------------------
interface BgBlockProps {
  position: [number, number, number]
  w: number; d: number; h: number; color: string
  windows?: boolean
}

function BgBlock({ position, w, d, h, color, windows = true }: BgBlockProps) {
  const rows = Math.max(1, Math.floor(h / 3.8))
  const cols = Math.max(1, Math.floor(w / 3.8))
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshLambertMaterial color={color} />
      </mesh>
      {/* Flat roof parapet */}
      <mesh position={[0, h + 0.28, 0]}>
        <boxGeometry args={[w + 0.5, 0.5, d + 0.5]} />
        <meshLambertMaterial color="#a8a098" />
      </mesh>
      {/* Window grid on front face */}
      {windows && Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <mesh
            key={`${r}-${c}`}
            position={[
              (c - (cols - 1) / 2) * (w / cols),
              (r + 0.6) * (h / rows),
              d / 2 + 0.06,
            ]}
          >
            <boxGeometry args={[0.85, 1.2, 0.16]} />
            <meshLambertMaterial color="#1e2d52" />
          </mesh>
        ))
      )}
    </group>
  )
}

// Background blocks aligned to the actual road grid corridors:
// — North/south of Choumert Rd (z=0)
// — East/west of Bellenden Rd (x=0)
// — Around the Gowlett/Adys areas
const bgBlocks: BgBlockProps[] = [
  // Choumert Rd — north side (z = -9 to -14)
  { position: [-22, 0, -10], w: 8,  d: 5, h: 9,  color: '#b8bfc8' },
  { position: [-6,  0, -10], w: 6,  d: 4, h: 7,  color: '#c4bcb2' },
  { position: [12,  0, -10], w: 7,  d: 5, h: 11, color: '#b0b8c0' },
  { position: [32,  0, -10], w: 6,  d: 4, h: 8,  color: '#c0c8b8' },
  { position: [52,  0, -10], w: 8,  d: 5, h: 10, color: '#b8c0ca' },
  // Choumert Rd — south side (z = 9 to 14)
  { position: [-22, 0,  10], w: 7,  d: 4, h: 7,  color: '#c8c0b2' },
  { position: [-5,  0,  10], w: 6,  d: 4, h: 9,  color: '#bec6c2' },
  { position: [12,  0,  10], w: 8,  d: 5, h: 6,  color: '#c4c0b8' },
  { position: [32,  0,  10], w: 6,  d: 4, h: 10, color: '#b8bcc4' },
  // Bellenden Rd — east side (x = 8)
  { position: [9,   0,  34], w: 5,  d: 4, h: 8,  color: '#c0b8c4' },
  { position: [9,   0,  60], w: 6,  d: 4, h: 7,  color: '#bcc4c0' },
  // Bellenden Rd — west side (x = -8)
  { position: [-9,  0,  34], w: 5,  d: 4, h: 9,  color: '#c8bfb2' },
  { position: [-9,  0,  60], w: 6,  d: 4, h: 6,  color: '#b8c0bc' },
  // Around Gowlett Arms
  { position: [52,  0,  -2], w: 7,  d: 4, h: 8,  color: '#c4bcb0' },
  { position: [52,  0, -20], w: 6,  d: 4, h: 11, color: '#b8bfc8' },
  // Around Adys Rd / EDT
  { position: [-55, 0,  42], w: 8,  d: 4, h: 12, color: '#bcc4c0' },
  { position: [-55, 0,  58], w: 7,  d: 4, h: 8,  color: '#c8bfb2' },
  // South corridor to Rye
  { position: [10,  0,  90], w: 6,  d: 4, h: 7,  color: '#c0b8c4' },
  { position: [-10, 0, 102], w: 7,  d: 4, h: 9,  color: '#b8c4bc' },
  // Street trees along Choumert Rd (no windows — just tree stubs)
  { position: [-18, 0, -5],  w: 1,  d: 1, h: 0.5, color: '#7a9a70', windows: false },
  { position: [8,   0, -5],  w: 1,  d: 1, h: 0.5, color: '#7a9a70', windows: false },
]

// Street trees along Bellenden Rd and Choumert
const streetTrees: { p: [number, number, number]; s: number }[] = [
  { p: [-18, 0,  -4], s: 0.55 }, { p: [10,  0,  -4], s: 0.6  },
  { p: [28,  0,  -4], s: 0.5  }, { p: [-6,  0,  -4], s: 0.58 },
  { p: [4,   0,  35], s: 0.52 }, { p: [4,   0,  62], s: 0.55 },
  { p: [-4,  0,  35], s: 0.48 }, { p: [-4,  0,  62], s: 0.5  },
]

// ---------------------------------------------------------------------------
// LANDMARK — single project-spec wrapper around PubArchitecture
// ---------------------------------------------------------------------------
function Landmark({ node }: { node: typeof mapNodes[0] }) {
  return (
    <group position={[node.x, 0, node.z]} name={`landmark-${node.name}`}>
      <PubArchitecture pubName={getPubName(node.name)} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// ROOT EXPORT
// ---------------------------------------------------------------------------
export default function World() {
  useEffect(() => { window.focus() }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e2d6' }}>
      <Canvas
        orthographic
        camera={{ zoom: 45, position: [50, 50, 50], near: 0.1, far: 1400 }}
        style={{ background: '#e8e2d6' }}
        shadows={false}
        gl={{ antialias: true }}
      >
        {/* Background colour + atmospheric fog — fades world edge into mist */}
        <color attach="background" args={['#e8e2d6']} />
        <fog attach="fog" args={['#e8e2d6', 110, 280]} />

        {/* Lighting — AmbientLight(0.7) + single DirectionalLight(1.2) */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />

        <Suspense fallback={null}>
          {/* Player — WASD camera-follow useFrame preserved exactly */}
          <Player />

          <Ground />
          <PeckhamRye />
          <Path />

          {/* Background architecture — road-aligned urban blocks */}
          <group name="background-architecture">
            {bgBlocks.map((b, i) => <BgBlock key={i} {...b} />)}
          </group>

          {/* Street trees lining Choumert and Bellenden */}
          <group name="street-trees">
            {streetTrees.map(({ p, s }, i) => <Tree key={i} position={p} scale={s} />)}
          </group>

          {/* Pub landmarks — Victoria is the hero at [0,0,0] */}
          <group name="landmarks">
            {mapNodes
              .filter(n => n.type === 'pub')
              .map((node, i) => <Landmark key={i} node={node} />)
            }
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}
