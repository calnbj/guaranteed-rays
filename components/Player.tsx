'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { isLegalMove } from '../lib/mapData'

export default function Player() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const [pos] = useState(() => new THREE.Vector3(0, 1, 0))
  const [keys, setKeys] = useState({ w: false, s: false, a: false, d: false, Up: false, Down: false, Left: false, Right: false })

  // Native JS keyboard listener (more reliable than wrappers)
  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => setKeys(s => ({ ...s, [e.key.replace('Arrow', '')]: true, [e.key.toLowerCase()]: true }))
    const handleUp = (e: KeyboardEvent) => setKeys(s => ({ ...s, [e.key.replace('Arrow', '')]: false, [e.key.toLowerCase()]: false }))
    window.addEventListener('keydown', handleDown)
    window.addEventListener('keyup', handleUp)
    return () => { window.removeEventListener('keydown', handleDown); window.removeEventListener('keyup', handleUp) }
  }, [])

  const speed = 0.6
  const cameraOffset = new THREE.Vector3(30, 30, 30)

  useFrame(() => {
    const nextPos = pos.clone()
    
    if (keys.w || keys.Up) nextPos.z -= speed
    if (keys.s || keys.Down) nextPos.z += speed
    if (keys.a || keys.Left) nextPos.x -= speed
    if (keys.d || keys.Right) nextPos.x += speed

    // Strict collision check
    if (isLegalMove(nextPos.x, nextPos.z)) {
      pos.copy(nextPos)
    }

    mesh.current.position.lerp(pos, 0.2)
    camera.position.lerp(pos.clone().add(cameraOffset), 0.1)
    camera.lookAt(pos)
  })

  return (
    <mesh ref={mesh}>
      <capsuleGeometry args={[0.5, 1, 4, 8]} />
      <meshBasicMaterial color="#5B5BFF" />
    </mesh>
  )
}
