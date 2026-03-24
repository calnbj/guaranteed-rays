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
    if (curKeys.current['w'] || curKeys.current['arrowup']) pos.z -= speed
    if (curKeys.current['s'] || curKeys.current['arrowdown']) pos.z += speed
    if (curKeys.current['a'] || curKeys.current['arrowleft']) pos.x -= speed
    if (curKeys.current['d'] || curKeys.current['arrowright']) pos.x += speed

    mesh.current.position.lerp(pos, 0.2)
    
    // Smooth Follow Cam
    const offset = new THREE.Vector3(50, 50, 50)
    camera.position.lerp(pos.clone().add(offset), 0.1)
    camera.lookAt(mesh.current.position)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial color="#ffffff" roughness={0.1} />
      <pointLight intensity={10} distance={15} color="#ffffff" />
    </mesh>
  )
}
