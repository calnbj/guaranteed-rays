'use client'

// =============================================================================
// Path.tsx
// Raised stone plinth segments built from mapEdges.
// Each segment has a 3-layer slab (top cap, body, base trim) plus a
// road-name label rendered flat on the top surface via drei <Text>.
//
// CONSTRAINTS: BoxGeometry only. MeshLambertMaterial only. No shadows.
// =============================================================================

import { useMemo } from 'react'
import { Text }    from '@react-three/drei'
import * as THREE  from 'three'
import { mapNodes, mapEdges } from '../lib/mapData'

// ── Plinth palette ────────────────────────────────────────────────────────────
const TOP  = '#ddd5c8'   // pale limestone — catches light
const BODY = '#c0b8ab'   // warm stone
const BASE = '#a8a096'   // shadow-side trim

const W = 4.5            // road width (world units)
const H = 0.48           // plinth height

// ---------------------------------------------------------------------------
// Single road plinth segment
// ---------------------------------------------------------------------------

interface SegProps {
  from:  [number, number, number]
  to:    [number, number, number]
  label: string
}

function PlinthSegment({ from, to, label }: SegProps) {
  const { mid, rotY, len } = useMemo(() => {
    const a   = new THREE.Vector3(...from)
    const b   = new THREE.Vector3(...to)
    const dir = new THREE.Vector3().subVectors(b, a)
    return {
      mid:  new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5).toArray() as [number,number,number],
      rotY: Math.atan2(dir.x, dir.z),
      len:  dir.length(),
    }
  }, [from, to])

  return (
    <group position={mid} rotation={[0, rotY, 0]}>

      {/* ── Top cap — lightest, catches directional light */}
      <mesh position={[0, H * 0.5 + 0.015, 0]}>
        <boxGeometry args={[W - 0.1, 0.04, len]} />
        <meshLambertMaterial color={TOP} />
      </mesh>

      {/* ── Main body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[W, H, len]} />
        <meshLambertMaterial color={BODY} />
      </mesh>

      {/* ── Base trim — slightly wider, darkest tone */}
      <mesh position={[0, -H * 0.5 + 0.05, 0]}>
        <boxGeometry args={[W + 0.12, 0.1, len + 0.06]} />
        <meshLambertMaterial color={BASE} />
      </mesh>


      {/* ── Road name label flat on top surface */}
      {label && len > 10 && (
        <Text
          position={[0, H * 0.5 + 0.06, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={1.1}
          color="#8c8278"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.12}
          maxWidth={len - 1}
        >
          {label}
        </Text>
      )}

    </group>
  )
}

// ---------------------------------------------------------------------------
// PathNetwork — resolves mapEdges to world positions and renders all segments
// ---------------------------------------------------------------------------

export default function Path() {
  const nodeMap = useMemo(() => {
    const m: Record<string, [number, number, number]> = {}
    mapNodes.forEach(n => { m[n.id] = [n.x, 0, n.z] })
    return m
  }, [])

  return (
    <group name="path-network">
      {mapEdges.map(([a, b, roadName], i) => {
        const from = nodeMap[a]
        const to   = nodeMap[b]
        if (!from || !to) return null
        return (
          <PlinthSegment
            key={`path-${i}`}
            from={from}
            to={to}
            label={roadName}
          />
        )
      })}
    </group>
  )
}
