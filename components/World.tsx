'use client'
import { Canvas } from '@react-three/fiber'
import { KeyboardControls, Grid, Float, Text, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import Player from './Player'
import Path from './Path'
import { roads } from '../lib/mapData'

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
]

function Landmark({ position, name, color = "#5B5BFF" }) {
  return (
    <group position={position}>
      <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text position={[0, 8, 0]} fontSize={2} color="white" font="https://fonts.gstatic.com/s/raleway/v28/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVvaorCIPrQ.woff">
          {name}
        </Text>
      </Float>
      {/* GLOWING BASE */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4, 5, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      {/* THE BUILDING UNIT */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[4, 6, 4]} />
        <meshBasicMaterial color="#111" wireframe />
      </mesh>
    </group>
  )
}

export default function World() {
  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#020202' }}>
      <KeyboardControls map={keyboardMap}>
        <Canvas camera={{ fov: 40 }}>
          <color attach="background" args={['#020202']} />
          <Suspense fallback={null}>
            <Player />
            <Path />
            
            <Grid 
              infiniteGrid 
              cellSize={5} 
              cellColor="#0a0a0a" 
              sectionSize={25} 
              sectionColor="#151515" 
              fadeDistance={150} 
            />

            <Landmark position={[0, 0, 0]} name="VICTORIA" color="#5B5BFF" />
            <Landmark position={[10, 0, -20]} name="MONTPELIER" color="#FF5B5B" />
            <Landmark position={[35, 0, 30]} name="GOWLETT" color="#5BFF5B" />
            <Landmark position={[-40, 0, 50]} name="EDT" color="#FFFF5B" />
            <Landmark position={[-30, 0, 90]} name="CLOCK HOUSE" color="#FF5BFF" />
            <Landmark position={[-35, 0, 130]} name="HERNE" color="#5BFFFF" />
            <Landmark position={[80, 0, 100]} name="IVY HOUSE" color="#FFFFFF" />

            <ContactShadows opacity={0.5} scale={100} blur={2} far={10} color="#000" />
          </Suspense>
        </Canvas>
      </KeyboardControls>
      
      {/* INSTRUCTIONS OVERLAY */}
      <div style={{ position: 'absolute', bottom: 40, left: 40, color: 'white', fontFamily: 'monospace', opacity: 0.6 }}>
        USE ARROWS TO NAVIGATE THE CIRCUIT
      </div>
    </div>
  )
}
