'use client'
import { Canvas } from '@react-three/fiber'
import { Stars, Float, Text, ContactShadows } from '@react-three/drei'
import { Physics, useBox } from '@react-three/cannon'
import { Suspense } from 'react'
import Player from './Player'

// A simple reusable "Pub" building component
function Pub({ position, name, color = "#1a1a1a" }) {
  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 6, 0]}
          fontSize={0.8}
          color="white"
          font="/fonts/GeistMono-Bold.woff" // We can add this later
        >
          {name}
        </Text>
      </Float>
      <mesh position={[0, 2.5, 0]} castShadow>
        <boxGeometry args={[4, 5, 4]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
      {/* "Windows" / Light Glow */}
      <pointLight position={[0, 2, 3]} intensity={5} color="#FFD700" distance={10} />
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#0a0a0a' }}>
      <Canvas shadows camera={{ position: [20, 20, 20], fov: 50 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#0a0a0a']} />
          <fog attach="fog" args={['#0a0a0a', 30, 150]} />
          <ambientLight intensity={0.4} />
          <spotLight position={[50, 50, 50]} angle={0.15} penumbra={1} castShadow />

          <Physics gravity={[0, -9.81, 0]}>
            <Player />
            
            {/* THE FLOATING ISLAND FLOOR */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <circleGeometry args={[150, 64]} />
              <meshStandardMaterial color="#111" />
            </mesh>

            {/* THE PUB CIRCUIT */}
            <Pub position={[0, 0, 0]} name="THE VICTORIA" color="#5B5BFF" />
            <Pub position={[5, 0, -10]} name="THE MONTPELIER" />
            <Pub position={[15, 0, 25]} name="THE GOWLETT" />
            <Pub position={[-30, 0, 40]} name="EDT" />
            <Pub position={[-20, 0, 70]} name="CLOCK HOUSE" />
            <Pub position={[-25, 0, 110]} name="THE HERNE" />
            <Pub position={[60, 0, 90]} name="THE IVY HOUSE" />
            
          </Physics>

          <ContactShadows position={[0, 0.01, 0]} opacity={0.5} scale={200} blur={2} far={10} />
        </Suspense>
      </Canvas>
    </div>
  )
}
