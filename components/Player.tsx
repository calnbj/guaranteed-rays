'use client'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useState, useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Player() {
  const mesh = useRef<THREE.Mesh>(null!)
  const { camera } = useThree()
  const [ , getKeys] = useKeyboardControls()
  
  // Player state: Position and target position for smooth movement
  const [pos] = useState(() => new THREE.Vector3(0, 1, 0)) // Start at Victoria
  const speed = 0.3
  const gridSnap = 2 // Move in 2-unit chunks (matching grid size)

  // Camera settings (isometric lock)
  const cameraOffset = new THREE.Vector3(25, 25, 25) // Fixed angle from player
  
  useEffect(() => {
    // Initial camera placement
    camera.position.addVectors(pos, cameraOffset)
    camera.lookAt(pos)
  }, [])

  useFrame((state, delta) => {
    const { forward, backward, left, right } = getKeys()
    
    // Calculate new position based on keyboard input
    const newPos = pos.clone()
    if (forward) newPos.z -= speed
    if (backward) newPos.z += speed
    if (left) newPos.x -= speed
    if (right) newPos.x += speed

    // (MAZE LOGIC WILL GO HERE IN STEP 2)
    pos.copy(newPos) // Update position

    // Update Player Mesh (Smooth movement)
    mesh.current.position.lerp(pos, 0.2) // Smoothly move mesh to target position

    // Lock Camera to Player (The 'Wora' look)
    const targetCameraPos = pos.clone().add(cameraOffset)
    camera.position.lerp(targetCameraPos, 0.1) // Smooth follow
    camera.lookAt(mesh.current.position) // Always look at player
  })

  return (
    <mesh ref={mesh} position={[0, 1, 0]}>
      <boxGeometry args={[1.5, 2, 1.5]} />
      <meshBasicMaterial color="#5B5BFF" wireframe /> {/* A simple wireframe character */}
    </mesh>
  )
}
