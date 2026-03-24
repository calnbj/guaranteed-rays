'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { isLegalMove } from '../lib/mapData'

export default function Player() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const [pos] = useState(() => new THREE.Vector3(0, 1.5, 0))
  const [keys, setKeys] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      setKeys(k => ({ ...k, [e.key.toLowerCase()]: true, [e.key.replace('Arrow', '').toLowerCase()]: true }))
    }
    const up = (e: KeyboardEvent) => {
      setKeys(k => ({ ...k, [e.key.toLowerCase()]: false, [e.key.replace('Arrow', '').toLowerCase()]: false }))
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useFrame((state, delta) => {
    const speed = 15 * delta // Frame-rate independent speed
    const nextPos = pos.clone()

    if (keys.w || keys.up) nextPos.z -= speed
    if (keys.s || keys.down) nextPos.z += speed
    if (keys.a || keys.left) nextPos.x -= speed
    if (keys.d || keys.right) nextPos.x += speed

    // Only update if it's a valid part of the Peckham maze
    if (isLegalMove(nextPos.x, nextPos.z)) {
      pos.copy(nextPos)
    }

    mesh.current.position.lerp(pos, 0.2)
    
    // Smooth Isometric Camera Follow
    const offset = new THREE.Vector3(60, 60, 60)
    camera.position.lerp(pos.clone().add(offset), 0.1)
    camera.lookAt(mesh.current.position)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
      <pointLight intensity={20} distance={20} color="#fff" />
    </mesh>
  )
}
