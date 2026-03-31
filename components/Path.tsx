'use client'

// =============================================================================
// Path.tsx — Raised stone walkways / plinths connecting map nodes.
// Uses mapEdges (explicit pairs) instead of sequential segments, enabling
// true 90° corner turns in the road grid.
//
// CONSTRAINTS: BoxGeometry only. MeshLambertMaterial only. No shadow maps.
// =============================================================================

import { useMemo } from 'react'
import * as THREE from 'three'
import { mapNodes, mapEdges } from '../lib/mapData'

const PLINTH_TOP  = '#ddd5c8'  // Pale limestone — top face
const PLINTH_BODY = '#c8bfb2'  // Warm stone — vertical faces
const PLINTH_BASE = '#b0a89a'  // Shadow tone — base trim

// ---------------------------------------------------------------------------
// Single plinth segment between two arbitrary world-space points
// ---------------------------------------------------------------------------
function PlinthSegment({
  from,
  to,
}: {
  from: [number, number, number]
  to:   [number, number, number]
}) {
  const { position, rotY, length } = useMemo(() => {
    const a   = new THREE.Vector3(...from)
    const b   = new THREE.Vector3(...to)
    const dir = new THREE.Vector3().subVectors(b, a)
    const len = dir.length()
    const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5)
    return {
      position: mid.toArray() as [number, number, number],
      rotY:     Math.atan2(dir.x, dir.z),
      length:   len,
    }
  }, [from, to])

  const W = 4.5   // walkway width — proportional to node spacing of 12–40 units
  const H = 0.45  // plinth height — physical volume, not a flat line
  const L = length

  return (
    <group position={position} rotation={[0, rotY, 0]}>
      {/* Top surface — lightest, catches the directional light */}
      <mesh position={[0, H * 0.5 + 0.03, 0]}>
        <boxGeometry args={[W - 0.4, 0.05, L]} />
        <meshLambertMaterial color={PLINTH_TOP} />
      </mesh>
      {/* Main plinth body */}
      <mesh>
        <boxGeometry args={[W, H, L]} />
        <meshLambertMaterial color={PLINTH_BODY} />
      </mesh>
      {/* Base trim — slightly wider, darkest */}
      <mesh position={[0, -H * 0.5 + 0.05, 0]}>
        <boxGeometry args={[W + 0.8, 0.12, L + 0.3]} />
        <meshLambertMaterial color={PLINTH_BASE} />
      </mesh>
    </group>
  )
}

// ---------------------------------------------------------------------------
// PathNetwork — resolves mapEdges to world positions and renders each segment
// ---------------------------------------------------------------------------
export default function Path() {
  const segments = useMemo(() => {
    const nodeMap: Record<string, [number, number, number]> = {}
    mapNodes.forEach(n => { nodeMap[n.id] = [n.x, 0, n.z] })

    return mapEdges
      .map(([a, b]) => {
        const from = nodeMap[a]
        const to   = nodeMap[b]
        if (!from || !to) return null
        return { from, to }
      })
      .filter(Boolean) as { from: [number,number,number]; to: [number,number,number] }[]
  }, [])

  return (
    <group name="path-network">
      {segments.map(({ from, to }, i) => (
        <PlinthSegment key={i} from={from} to={to} />
      ))}
    </group>
  )
}
