'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { isLegalMove } from '../lib/mapData'

export default function Player() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const [, getKeys] = useKeyboardControls()
  const [pos] = useState(() => new THREE.Vector3(0, 1, 0))
  
  const speed = 0.5
  const cameraOffset = new THREE.Vector3(30, 30, 30)

  useFrame(() => {
    const { forward, backward, left, right } = getKeys()
    
    // 1. Calculate where the player WANTS to go
    let dx = 0
    let dz = 0
    if (forward) dz -= speed
    if (backward) dz += speed
    if (left) dx -= speed
    if (right) dx += speed

    if (dx !== 0 || dz !== 0) {
      const nextX = pos.x + dx
      const nextZ = pos.z + dz

      // 2. Only update the 'pos' if that specific coordinate is allowed
      if (isLegalMove(nextX, nextZ)) {
        pos.x = nextX
        pos.z = nextZ
      } else {
        // Optional: log to browser console to verify it's working
        // console.log("Wall hit at:", nextX, nextZ)
      }
    }

    // 3. Smoothly move the visual box and the camera
    mesh.current.position.lerp(pos, 0.2)
    camera.position.lerp(pos.clone().add(cameraOffset), 0.1)
    camera.lookAt(pos)
  })

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 2, 1]} />
      <meshBasicMaterial color="#5B5BFF" />
    </mesh>
  )
}
