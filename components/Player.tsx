'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { isLegalMove } from '../lib/mapData'

export default function Player() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const [pos] = useState(() => new THREE.Vector3(0, 1.5, 0))
  const curKeys = useRef<Record<string, boolean>>({})

  useEffect(() => {
    const down = (e: KeyboardEvent) => { curKeys.current[e.key.toLowerCase()] = true }
    const up   = (e: KeyboardEvent) => { curKeys.current[e.key.toLowerCase()] = false }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  useFrame((state, delta) => {
    const speed   = 20 * delta
    const nextPos = pos.clone()
    if (curKeys.current['w'] || curKeys.current['arrowup'])    nextPos.z -= speed
    if (curKeys.current['s'] || curKeys.current['arrowdown'])  nextPos.z += speed
    if (curKeys.current['a'] || curKeys.current['arrowleft'])  nextPos.x -= speed
    if (curKeys.current['d'] || curKeys.current['arrowright']) nextPos.x += speed
    if (isLegalMove(nextPos.x, nextPos.z)) { pos.copy(nextPos) }
    mesh.current.position.lerp(pos, 0.2)
    const offset = new THREE.Vector3(50, 50, 50)
    camera.position.lerp(pos.clone().add(offset), 0.1)
    camera.lookAt(mesh.current.position)
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshLambertMaterial color="white" emissive="#ffffff" emissiveIntensity={0.35} />
    </mesh>
  )
}
