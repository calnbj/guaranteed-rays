'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { Rays } from './Rays'

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#e8e2d6' }}>
      <Canvas shadows dpr={[1, 2]}>
        {/* 1. THE ISOMETRIC LENS: Parallel lines, no perspective distortion */}
        <OrthographicCamera 
          makeDefault 
          position={[50, 50, 50]} 
          zoom={50} 
          near={0.1} 
          far={1000} 
        />
        
        {/* 2. THE STUDIO LIGHTING: Warm, linen-toned atmosphere */}
        <color attach="background" args={['#e8e2d6']} />
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ffccaa" />

        {/* 3. YOUR ACTUAL DATA: This renders your original Rays/Pubs */}
        <group rotation={[0, -Math.PI / 4, 0]}>
          <Rays />
        </group>

        {/* 4. THE GROUNDING: Soft shadows where buildings meet the floor */}
        <ContactShadows 
          position={[0, -0.01, 0]} 
          opacity={0.4} 
          scale={100} 
          blur={2.5} 
          far={10} 
          color="#4a4030" 
        />
        
        <OrbitControls 
          enablePan={true} 
          minZoom={30} 
          maxZoom={100} 
          makeDefault 
        />
      </Canvas>
    </div>
  )
}
