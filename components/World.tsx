'use client'
import { Canvas } from '@react-three/fiber'
import { Stars, Float, Text, ContactShadows, OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import Player from './Player'

function Pub({ position, name, color = "#222" }) {
  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 6, 0]}
          fontSize={1.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </Float>
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[4, 5, 4]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
      </mesh>
      <pointLight position={[0, 2, 3]} intensity={10} color="#5B5BFF" distance={15} />
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505' }}>
      <Canvas shadows camera={{ position: [50, 50, 50], fov: 45 }}>
        <Suspense fallback={<div style={{color: 'white'}}>Loading Peckham...</div>}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 50, 10]} intensity={1.5} />
          
          <Physics gravity={[0, -9.81, 0]}>
            <Player />
            
            {/* THE FLOATING ISLAND */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <circleGeometry args={[150, 64]} />
              <meshStandardMaterial color="#111" />
            </mesh>

            {/* PUB LOCATIONS */}
            <Pub position={[0, 0, 0]} name="THE VICTORIA" color="#5B5BFF" />
            <Pub position={[10, 0, -20]} name="THE MONTPELIER" />
            <Pub position={[30, 0, 40]} name="THE GOWLETT" />
            <Pub position={[-40, 0, 60]} name="EDT" />
            <Pub position={[-30, 0, 100]} name="CLOCK HOUSE" />
            <Pub position={[-35, 0, 150]} name="THE HERNE" />
            <Pub position={[80, 0, 120]} name="THE IVY HOUSE" />
            
          </Physics>

          <OrbitControls makeDefault />
          <Stars radius={100} depth={50} count={5000} factor={4} />
        </Suspense>
      </Canvas>
    </div>
  )
}
