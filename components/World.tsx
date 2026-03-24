'use client'
import { Canvas } from '@react-three/fiber'
import { Float, Text, MeshDistortMaterial } from '@react-three/drei'
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
        >
          {name}
        </Text>
      </Float>
      
      {/* THE BUILDING - Using MeshNormalMaterial for 'fake' 3D depth without lights */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[4, 6, 4]} />
        <meshNormalMaterial />
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
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505' }}>
      <Canvas camera={{ fov: 35, position: [60, 60, 60] }}>
        <color attach="background" args={['#050505']} />
        
        <Suspense fallback={null}>
          <Player />
          <Path />

          {/* THE FLOOR - Static dark plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <planeGeometry args={[1000, 1000]} />
            <meshBasicMaterial color="#0a0a0a" />
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
