'use client'

// =============================================================================
// World.tsx — Monument Valley isometric diorama of Peckham's pub landscape.
//
// CONSTRAINTS (project spec):
//   – MeshLambertMaterial ONLY
//   – NO shadows on Canvas, NO ContactShadows/AccumulativeShadows
//   – AmbientLight (0.7) + DirectionalLight (1.2) at [10, 20, 10]
//   – BoxGeometry / CylinderGeometry / ConeGeometry only
//   – Landmark({ node }) is the single pub wrapper component
//   – mapNodes is the single source of truth (imported from lib/mapData)
//   – Player useFrame movement logic preserved exactly (camera follows player)
// =============================================================================

import { Canvas }   from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import Player        from './Player'
import Path          from './Path'
import PubArchitecture from './PubArchitecture'
import { mapNodes }  from '../lib/mapData'

// Map mapData names → PubArchitecture keys
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
// Ground — large base plane + individual stone slabs under each node
// ---------------------------------------------------------------------------
function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.07, 25]}>
        <planeGeometry args={[200, 200]} />
        <meshLambertMaterial color="#ccc5b8" />
      </mesh>
      {mapNodes.map((node, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[node.x, -0.05, node.z]}>
          <planeGeometry args={[14, 14]} />
          <meshLambertMaterial color={i % 2 === 0 ? '#cac3b6' : '#d2cbc0'} />
        </mesh>
      ))}
    </>
  )
}

// ---------------------------------------------------------------------------
// Background architecture — simplified urban filler, varying heights,
// geometric window cutouts. Deliberately muted to recede behind landmarks.
// ---------------------------------------------------------------------------
interface BgBlockProps {
  position: [number, number, number]
  w: number; d: number; h: number; color: string
}

function BgBlock({ position, w, d, h, color }: BgBlockProps) {
  const rows = Math.max(1, Math.floor(h / 3.5))
  const cols = Math.max(1, Math.floor(w / 3.5))
  return (
    <group position={position}>
      <mesh position={[0, h / 2, 0]}>
        <boxGeometry args={[w, h, d]} />
        <meshLambertMaterial color={color} />
      </mesh>
      <mesh position={[0, h + 0.3, 0]}>
        <boxGeometry args={[w + 0.6, 0.5, d + 0.6]} />
        <meshLambertMaterial color={'#a8a098'} />
      </mesh>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => (
          <mesh key={`${r}-${c}`} position={[
            (c - (cols - 1) / 2) * (w / cols),
            (r + 0.6) * (h / rows),
            d / 2 + 0.06,
          ]}>
            <boxGeometry args={[0.9, 1.3, 0.18]} />
            <meshLambertMaterial color={'#1e2d52'} />
          </mesh>
        ))
      )}
    </group>
  )
}

// Background blocks scattered to frame the pub landmarks
const bgBlocks: BgBlockProps[] = [
  { position: [-16, 0, -12], w: 6, d: 4, h: 9,  color: '#b8bfc8' },
  { position: [-15, 0,  12], w: 5, d: 3, h: 7,  color: '#c8c0b2' },
  { position: [16,  0, -22], w: 7, d: 4, h: 11, color: '#b0b8c0' },
  { position: [20,  0,   5], w: 5, d: 3, h: 8,  color: '#c0c8b8' },
  { position: [55,  0, -22], w: 8, d: 4, h: 10, color: '#b8c0ca' },
  { position: [55,  0,   5], w: 6, d: 4, h: 7,  color: '#c4bcb0' },
  { position: [-55, 0,  40], w: 7, d: 4, h: 12, color: '#bcc4c0' },
  { position: [-55, 0,  62], w: 5, d: 3, h: 8,  color: '#c8bfb2' },
  { position: [-12, 0, 102], w: 6, d: 4, h: 9,  color: '#c0b8c4' },
  { position: [6,   0, 102], w: 7, d: 3, h: 6,  color: '#b8c4bc' },
  { position: [16,  0,  55], w: 5, d: 3, h: 7,  color: '#c4c0b8' },
  { position: [-8,  0,  -8], w: 4, d: 3, h: 5,  color: '#cac2b8' },
]

// ---------------------------------------------------------------------------
// Landmark — project-spec single wrapper around PubArchitecture
// "Encapsulate the Pub design inside a single function Landmark({ node })"
// ---------------------------------------------------------------------------
function Landmark({ node }: { node: typeof mapNodes[0] }) {
  return (
    <group position={[node.x, 0, node.z]} name={`landmark-${node.name}`}>
      <PubArchitecture pubName={getPubName(node.name)} />
    </group>
  )
}

// ---------------------------------------------------------------------------
// Root export
// ---------------------------------------------------------------------------
export default function World() {
  useEffect(() => { window.focus() }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e2d6' }}>
      <Canvas
        orthographic
        camera={{ zoom: 45, position: [50, 50, 50], near: 0.1, far: 1200 }}
        style={{ background: '#e8e2d6' }}
        shadows={false}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#e8e2d6']} />

        {/* Lighting — per project spec: AmbientLight(0.7) + DirectionalLight(1.2) */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />

        <Suspense fallback={null}>
          {/* Player — preserves WASD useFrame camera-follow logic exactly */}
          <Player />
          <Ground />
          <Path />
          <group name="background-architecture">
            {bgBlocks.map((b, i) => <BgBlock key={i} {...b} />)}
          </group>
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
