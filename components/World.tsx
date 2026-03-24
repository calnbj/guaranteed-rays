'use client'
import { Canvas } from '@react-three/fiber'
import { Float, Text, ContactShadows, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'
import Path from './Path'

function Landmark({ position, name, color = "#5B5BFF" }) {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text 
          position={[0, 7, 0]} 
          fontSize={1.8} 
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCOjFwrHDOn4lVTs3_v72os.woff2"
        >
          {name}
        </Text>
      </Float>
      
      {/* THE BUILDING - Solid 'Clay' Look */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[4, 6, 4]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.1} />
      </mesh>

      {/* NEON ACCENT RING */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 4.2, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a0a' }}>
      <Canvas shadows camera={{ fov: 35, position: [60, 60, 60] }}>
        <color attach="background" args={['#0a0a0a']} />
        
        <Suspense fallback={null}>
          {/* LIGHTING SETUP */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 20, 10]} intensity={1.5} castShadow />
          <directionalLight position={[-10, 20, -10]} intensity={1} />
          
          <Player />
          <Path />

          {/* THE FLOOR */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
            <planeGeometry args={[1000, 1000]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.5} />
          </mesh>

          {/* SOFT SHADOWS UNDER EVERYTHING */}
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.6} 
            scale={200} 
            blur={2.5} 
            far={10} 
            color="#000000" 
          />

          <Landmark position={[0, 0, 0]} name="VICTORIA" color="#5B5BFF" />
          <Landmark position={[10, 0, -20]} name="MONTPELIER" color="#FF5B5B" />
          <Landmark position={[35, 0, 30]} name="GOWLETT" color="#5BFF5B" />
          <Landmark position={[-40, 0, 50]} name="EDT" color="#FFFF5B" />
          <Landmark position={[-30, 0, 90]} name="CLOCK HOUSE" color="#FF5BFF" />
          <Landmark position={[-35, 0, 130]} name="HERNE" color="#5BFFFF" />
          <Landmark position={[80, 0, 100]} name="IVY HOUSE" color="#FFFFFF" />

        </Suspense>
      </Canvas>
    </div>
  )
}
