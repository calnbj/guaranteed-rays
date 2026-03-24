'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Float } from '@react-three/drei'
import { Suspense } from 'react'

function Pub({ position, name, color = "#444" }) {
  return (
    <group position={position}>
      {/* THE LABEL */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 6, 0]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </Float>
      {/* THE BUILDING */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[4, 5, 4]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505' }}>
      <Canvas camera={{ position: [60, 60, 60], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#050505']} />
          
          {/* THE FLOATING ISLAND */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
            <circleGeometry args={[120, 64]} />
            <meshBasicMaterial color="#1a1a1a" />
          </mesh>

          {/* THE PUB CIRCUIT */}
          <Pub position={[0, 0, 0]} name="THE VICTORIA" color="#5B5BFF" />
          <Pub position={[15, 0, -20]} name="THE MONTPELIER" color="#333" />
          <Pub position={[35, 0, 30]} name="THE GOWLETT" color="#333" />
          <Pub position={[-40, 0, 50]} name="EDT" color="#333" />
          <Pub position={[-30, 0, 90]} name="CLOCK HOUSE" color="#333" />
          <Pub position={[-35, 0, 130]} name="THE HERNE" color="#333" />
          <Pub position={[80, 0, 100]} name="THE IVY HOUSE" color="#333" />

          <OrbitControls makeDefault minDistance={20} maxDistance={200} />
        </Suspense>
      </Canvas>
    </div>
  )
}
