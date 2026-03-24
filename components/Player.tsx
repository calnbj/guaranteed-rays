'use client'
import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Player() {
  const { camera } = useThree()
  const [ref] = useSphere(() => ({ mass: 1, type: 'Dynamic', position: [0, 2, 0] }))
  useFrame(() => {
    if (ref.current) {
      camera.position.copy(new THREE.Vector3(ref.current.position.x, ref.current.position.y + 1, ref.current.position.z))
    }
  })
  return <mesh ref={ref as any} />
}
