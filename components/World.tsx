'use client'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Grid } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'

// Defines the keys we listen for
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
]

function Pub({ position, color = "#444" }) {
  return (
    <mesh position={[position[0], 2.5, position[2]]}>
      <boxGeometry args={[4, 5, 4]} />
      <meshBasicMaterial color={color} wireframe />
    </mesh>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050505' }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas gl={{ antialias: true }}>
          <color attach="background" args={['#050505']} />
          <ambientLight intensity={1} />
          
          <Suspense fallback={null}>
            {/* 1. THE PLAYER (Follow-Cam) */}
            <Player />

            {/* 2. THE GRID (The Wora Look) */}
            <Grid 
              infiniteGrid
              cellSize={2}
              cellThickness={0.5}
              cellColor="#1a1a1a"
              sectionSize={10}
              sectionThickness={1}
              sectionColor="#333"
              fadeDistance={100}
            />

            {/* 3. THE PUBS (Landmarks) */}
            <Pub position={[0, 0, 0]} color="#5B5BFF" /> {/* Victoria */}
            <Pub position={[15, 0, -20]} /> {/* Montpelier */}
            <Pub position={[35, 0, 30]} />  {/* Gowlett */}
            <Pub position={[-40, 0, 50]} /> {/* EDT */}
            <Pub position={[-30, 0, 90]} /> {/* Clock House */}
            <Pub position={[-35, 0, 130]} />{/* Herne */}
            <Pub position={[80, 0, 100]} /> {/* Ivy House */}

          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  )
}
