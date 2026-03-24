'use client'
import { Canvas } from '@react-three/fiber'
import { Stars, OrbitControls, Sky } from '@react-three/drei'
import { Physics } from '@react-three/cannon'
import { Suspense } from 'react'
import Player from './Player'

function Pub({ position, color = "#222" }) {
  return (
    <mesh position={[position[0], 4, position[2]]}>
      <boxGeometry args={[4, 8, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#111' }}>
      <Canvas shadows camera={{ position: [100, 100, 100], fov: 50 }}>
        <Suspense fallback={<div style={{color: 'white'}}>Loading 3D...</div>}>
          {/* 1. FORCE VISIBILITY */}
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
          <ambientLight intensity={1.0} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
          
          {/* 2. THE ISLAND (NON-PHYSICS FOR NOW TO ENSURE IT RENDERS) */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
            <circleGeometry args={[200, 64]} />
            <meshStandardMaterial color="#222" />
          </mesh>

          {/* 3. THE PUBS */}
          <Pub position={[0, 0, 0]} color="#5B5BFF" /> {/* VICTORIA */}
          <Pub position={[20, 0, -30]} color="#444" /> {/* MONTPELIER */}
          <Pub position={[40, 0, 40]} color="#444" />  {/* GOWLETT */}
          <Pub position={[-50, 0, 70]} color="#444" /> {/* EDT */}
          <Pub position={[-40, 0, 110]} color="#444" />{/* CLOCK HOUSE */}
          <Pub position={[-45, 0, 160]} color="#444" />{/* HERNE */}
          <Pub position={[100, 0, 130]} color="#444" />{/* IVY HOUSE */}

          <Physics>
            <Player />
          </Physics>

          <OrbitControls />
          <Stars radius={100} depth={50} count={5000} factor={4} />
        </Suspense>
      </Canvas>
    </div>
  )
}
