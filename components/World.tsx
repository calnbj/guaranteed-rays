'use client'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls, ContactShadows } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import Player from './Player'

function Pub({ position, color = "#222" }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[4, 8, 4]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505' }}>
      <Canvas shadows camera={{ position: [80, 80, 80], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 50, 10]} intensity={2} castShadow />
          
          <Physics>
            <Player />
            
            {/* THE FLOATING ISLAND */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <circleGeometry args={[150, 64]} />
              <meshStandardMaterial color="#111" />
            </mesh>

            {/* PUB LOCATIONS (STABLE BLOCKS) */}
            <Pub position={[0, 4, 0]} color="#5B5BFF" /> {/* VICTORIA */}
            <Pub position={[10, 4, -20]} color="#333" /> {/* MONTPELIER */}
            <Pub position={[30, 4, 40]} color="#333" />  {/* GOWLETT */}
            <Pub position={[-40, 4, 60]} color="#333" /> {/* EDT */}
            <Pub position={[-30, 4, 100]} color="#333" />{/* CLOCK HOUSE */}
            <Pub position={[-35, 4, 150]} color="#333" />{/* HERNE */}
            <Pub position={[80, 4, 120]} color="#333" /> {/* IVY HOUSE */}
            
          </Physics>

          <OrbitControls />
          <Stars radius={100} depth={50} count={5000} factor={4} />
          <ContactShadows opacity={0.4} scale={300} blur={1} far={10} resolution={256} color="#000000" />
        </Suspense>
      </Canvas>
    </div>
  )
}
