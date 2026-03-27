'use client'

// =============================================================================
// Path.tsx — Raised stone walkways connecting map nodes.
// Each segment is a 3D plinth slab with top surface, body, and base trim.
// Replaces the old TubeGeometry/CatmullRom with BoxGeometry for Monument
// Valley aesthetic — structural walkways, not lines on a map.
//
// CONSTRAINTS: BoxGeometry only. MeshLambertMaterial only. No shadow maps.
// =============================================================================

import { useMemo } from 'react'
import * as THREE from 'three'
import { mapNodes } from '../lib/mapData'

const PLINTH_TOP  = '#ddd5c8'  // Pale limestone — top face catches the light
const PLINTH_BODY = '#c8bfb2'  // Warm stone — vertical faces
const PLINTH_BASE = '#b0a89a'  // Shadow tone — darkest base trim

interface SegmentProps {
  from: [number, number, number]
  to:   [number, number, number]
}

function PlinthSegment({ from, to }: SegmentProps) {
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

  const W = 4.0   // walkway width (proportional to node spacing of 15–40 units)
  const H = 0.45  // plinth height — physical volume, not a flat line
  const L = length

  return (
    <group position={position} rotation={[0, rotY, 0]}>
      {/* Top surface — lightest, catches the directional light */}
      <mesh position={[0, H * 0.5 + 0.025, 0]}>
        <boxGeometry args={[W - 0.4, 0.05, L]} />
        <meshLambertMaterial color={PLINTH_TOP} />
      </mesh>
      {/* Main plinth body */}
      <mesh>
        <boxGeometry args={[W, H, L]} />
        <meshLambertMaterial color={PLINTH_BODY} />
      </mesh>
      {/* Base trim — wider, darkest, ground-level */}
      <mesh position={[0, -H * 0.5 + 0.05, 0]}>
        <boxGeometry args={[W + 0.7, 0.12, L + 0.25]} />
        <meshLambertMaterial color={PLINTH_BASE} />
      </mesh>
    </group>
  )
}

export default function Path() {
  // Build consecutive segments through all mapNodes
  const segments = useMemo(() => {
    const segs: [[number,number,number],[number,number,number]][] = []
    for (let i = 0; i < mapNodes.length - 1; i++) {
      const a = mapNodes[i]
      const b = mapNodes[i + 1]
      segs.push([[a.x, 0, a.z], [b.x, 0, b.z]])
    }
    return segs
  }, [])

  return (
    <group name="path-network">
      {segments.map(([from, to], i) => (
        <PlinthSegment key={i} from={from} to={to} />
      ))}
    </group>
  )
}
