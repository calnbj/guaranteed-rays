'use client'
import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect } from 'react'
import Player from './Player'
import { mapNodes } from '../lib/mapData'

export default function World() {
  // Force focus to the window so keyboard works immediately
  useEffect(() => {
    window.focus();
  }, []);

  return (
    <div 
      id="canvas-container"
      style={{ width: '100vw', height: '100vh', backgroundColor: '#e8e2d6', outline: 'none' }}
      tabIndex={0} // Makes the div focusable for keyboard events
    >
      <Canvas camera={{ fov: 45, position: [50, 50, 50] }}>
        <color attach="background" args={['#e8e2d6']} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />
        
        <Suspense fallback={null}>
          <Player />
          
          {mapNodes.map((node, i) => (
             <group key={i}>
                {/* The "Road" or "Base" Tile */}
                <mesh position={[node.x, 0, node.z]}>
                   <boxGeometry args={[10, 0.2, 10]} />
                   <meshLambertMaterial color="#d1c7b7" />
                </mesh>
                {/* Visual indicator for Pubs */}
                {node.type === 'pub' && (
                  <mesh position={[node.x, 3, node.z]}>
                    <boxGeometry args={[5, 6, 5]} />
                    <meshLambertMaterial color={node.color} />
                  </mesh>
                )}
             </group>
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
