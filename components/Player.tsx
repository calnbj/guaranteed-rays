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
    const speed = 0.5
    const move = new THREE.Vector3(0, 0, 0)
    if (keys.ArrowUp || keys.w) move.z -= speed
    if (keys.ArrowDown || keys.s) move.z += speed
    if (keys.ArrowLeft || keys.a) move.x -= speed
    if (keys.ArrowRight || keys.d) move.x += speed

    if (move.length() > 0) {
      const nextX = pos.x + move.x
      const nextZ = pos.z + move.z
      
      // Sliding Logic: Check X and Z independently so you don't 'stick' on corners
      if (isLegalMove(nextX, nextZ)) {
        pos.x = nextX
        pos.z = nextZ
      } else if (isLegalMove(nextX, pos.z)) {
        pos.x = nextX
      } else if (isLegalMove(pos.x, nextZ)) {
        pos.z = nextZ
      }
    }

    mesh.current.position.lerp(pos, 0.2)
    // Locked Isometric Camera Angle
    const camTarget = pos.clone().add(new THREE.Vector3(50, 50, 50))
    camera.position.lerp(camTarget, 0.05)
    camera.lookAt(pos)
  })

  return (
    <mesh ref={mesh} castShadow>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshLambertMaterial color="white" />
    </mesh>
  )
}
