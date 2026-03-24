'use client'
import { Canvas } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'
import Path from './Path'

function Landmark({ position, name, color = "#5B5BFF" }) {
  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
        <Text position={[0, 8, 0]} fontSize={1.6} color="white">
          {name}
        </Text>
      </Float>
      
      {/* THE BUILDING - Lambert reflects light simply, creating depth */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[4, 6, 4]} />
        <meshLambertMaterial color="#333333" /> 
      </mesh>

      {/* THE NEON BASE */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.2, 4.5, 64]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#080808' }}>
      {/* Standard Canvas - No 'shadows' flag to avoid GPU crashes */}
      <Canvas camera={{ fov: 35, position: [80, 80, 80] }}>
        <color attach="background" args={['#080808']} />
        
        {/* LIGHTING - The secret to the Monument Valley depth */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#5B5BFF" />

        <Suspense fallback={null}>
          <Player />
          <Path />

          {/* THE FLOOR */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
            <planeGeometry args={[2000, 2000]} />
            <meshBasicMaterial color="#080808" />
          </mesh>

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
