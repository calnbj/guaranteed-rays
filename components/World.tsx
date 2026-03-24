'use client'
import { Canvas } from '@react-three/fiber'
import { PointerLockControls, Sky, Stars } from '@react-three/drei'
import { Physics, usePlane } from '@react-three/cannon'
import { Suspense } from 'react'
import Player from './Player'

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}>
      <Canvas shadows camera={{ fov: 45 }}>
        <Suspense fallback={null}>
          <Sky sunPosition={[100, 20, 100]} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <Physics gravity={[0, -9.81, 0]}>
            <Player />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          </Physics>
          <PointerLockControls />
        </Suspense>
      </Canvas>
    </div>
  )
}
