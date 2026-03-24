'use client'
import * as THREE from 'three'
import { useMemo } from 'react'
import { mapNodes } from '../lib/mapData'

export default function Path() {
  const points = useMemo(() => 
    mapNodes.map(node => new THREE.Vector3(node.x, 0.2, node.z)), 
  [mapNodes])
  
  // Create a smooth curve through the map nodes
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points])
  
  return (
    <mesh>
      <tubeGeometry args={[curve, 64, 0.4, 8, false]} />
      {/* A soft, stone-like color for the path connector */}
      <meshLambertMaterial color="#c0b5a3" transparent opacity={0.8} />
    </mesh>
  )
}
