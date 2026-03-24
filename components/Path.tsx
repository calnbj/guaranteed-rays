'use client'
import * as THREE from 'three'
import { useRef, useMemo } from 'react'
import { roads } from '../lib/mapData'

export default function Path() {
  const points = useMemo(() => roads.map(r => new THREE.Vector3(r.x, 0.1, r.z)), [])
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.5, 8, false]} />
      <meshBasicMaterial color="#5B5BFF" transparent opacity={0.6} />
    </mesh>
  )
}
