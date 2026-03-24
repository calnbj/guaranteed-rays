'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

export default function Player({ onMove }: { onMove: () => void }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const [pos] = useState(() => new THREE.Vector3(0, 1.2, 0))
  const curKeys = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const down = (e: KeyboardEvent) => { curKeys.current[e.key.toLowerCase()] = true; onMove() }
    const up = (e: KeyboardEvent) => { curKeys.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', down); window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [onMove])

  useFrame(() => {
    const speed = 0.6
    const move = new THREE.Vector3(0, 0, 0)
    if (curKeys.current['w'] || curKeys.current['arrowup']) move.z -= speed
    if (curKeys.current['s'] || curKeys.current['arrowdown']) move.z += speed
    if (curKeys.current['a'] || curKeys.current['arrowleft']) move.x -= speed
    if (curKeys.current['d'] || curKeys.current['arrowright']) move.x += speed

    pos.add(move)
    mesh.current.position.lerp(pos, 0.2)
    
    const camOffset = new THREE.Vector3(60, 60, 60)
    camera.position.lerp(pos.clone().add(camOffset), 0.1)
    camera.lookAt(mesh.current.position)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshLambertMaterial color="#ffffff" />
    </mesh>
  )
}
