'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrthographicCamera, OrbitControls, ContactShadows } from '@react-three/drei'
import DioramaPath from './DioramaPath'

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#e8e2d6' }}>
      <Canvas shadows dpr={[1, 2]}>
        {/* THE FIX: Zooming in 4x closer so you can see the buildings */}
        <OrthographicCamera 
          makeDefault 
          position={[100, 100, 100]} 
          zoom={250} 
          near={0.1} 
          far={2000} 
        />
        
        <color attach="background" args={['#e8e2d6']} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
        
        {/* Centering the map in the middle of the camera's view */}
        <group position={[0, -5, 0]}>
          <DioramaPath />
        </group>

        <ContactShadows opacity={0.4} scale={200} blur={2.5} far={20} color="#4a4030" />
        <OrbitControls makeDefault enablePan={true} />
      </Canvas>
    </div>
  )
}
