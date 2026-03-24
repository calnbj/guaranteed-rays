'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'

export default function Player() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const [pos] = useState(() => new THREE.Vector3(0, 1.5, 0))
  const curKeys = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const down = (e: KeyboardEvent) => { curKeys.current[e.key.toLowerCase()] = true }
    const up = (e: KeyboardEvent) => { curKeys.current[e.key.toLowerCase()] = false }
    
    // Listen to the window directly to bypass focus issues
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { 
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up) 
    }
  }, [])

  useFrame(() => {
    const speed = 0.8
    if (curKeys.current['w'] || curKeys.current['arrowup']) pos.z -= speed
    if (curKeys.current['s'] || curKeys.current['arrowdown']) pos.z += speed
    if (curKeys.current['a'] || curKeys.current['arrowleft']) pos.x -= speed
    if (curKeys.current['d'] || curKeys.current['arrowright']) pos.x += speed

    mesh.current.position.copy(pos)
    
    const offset = new THREE.Vector3(40, 40, 40) 
    camera.position.lerp(pos.clone().add(offset), 0.1)
    camera.lookAt(pos)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
    </mesh>
  )
}
