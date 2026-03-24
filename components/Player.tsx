'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { isLegalMove } from '../lib/mapData'

export default function Player() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const [pos] = useState(() => new THREE.Vector3(0, 1, 0))
  const [keys, setKeys] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const down = (e: KeyboardEvent) => setKeys(k => ({ ...k, [e.key]: true }))
    const up = (e: KeyboardEvent) => setKeys(k => ({ ...k, [e.key]: false }))
    window.addEventListener('keydown', down); window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [])

  useFrame(() => {
    const move = new THREE.Vector3(0, 0, 0)
    if (keys.ArrowUp || keys.w) move.z -= 0.6
    if (keys.ArrowDown || keys.s) move.z += 0.6
    if (keys.ArrowLeft || keys.a) move.x -= 0.6
    if (keys.ArrowRight || keys.d) move.x += 0.6

    const next = pos.clone().add(move)
    // If we can move, move. If not, try just moving X or just moving Z (Sliding)
    if (isLegalMove(next.x, next.z)) {
      pos.copy(next)
    } else if (isLegalMove(next.x, pos.z)) {
      pos.x = next.x
    } else if (isLegalMove(pos.x, next.z)) {
      pos.z = next.z
    }

    mesh.current.position.lerp(pos, 0.2)
    camera.position.lerp(pos.clone().add(new THREE.Vector3(40, 40, 40)), 0.1)
    camera.lookAt(pos)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="white" emissive="#5B5BFF" emissiveIntensity={2} />
      <pointLight distance={10} intensity={2} color="#5B5BFF" />
    </mesh>
  )
}
