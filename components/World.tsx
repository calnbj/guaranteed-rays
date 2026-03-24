'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls, ContactShadows } from '@react-three/drei'
import Path from './Path'
import Player from './Player'

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#e8e2d6' }}>
      <Canvas shadows dpr={[1, 2]}>
        <OrthographicCamera 
          makeDefault 
          position={[50, 50, 50]} 
          zoom={50} 
          near={0.1} 
          far={1000} 
        />
        
        <color attach="background" args={['#e8e2d6']} />
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.2} 
          castShadow 
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ffccaa" />

        <group rotation={[0, -Math.PI / 4, 0]}>
          <Path />
          <Player />
        </group>

        <ContactShadows 
          position={[0, -0.01, 0]} 
          opacity={0.4} 
          scale={100} 
          blur={2.5} 
          far={10} 
          color="#4a4030" 
        />
        
        <OrbitControls enablePan={true} makeDefault />
      </Canvas>
    </div>
  )
}
