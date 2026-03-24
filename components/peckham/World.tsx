'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, OrthographicCamera, ContactShadows } from '@react-three/drei'
import { Landmark } from './Landmark'
import { RoadTile, ParkTile } from './Environment'
import { mapNodes } from '../../lib/mapData'

export default function World() {
  return (
    <div className="w-full h-screen bg-[#e8e2d6]">
      <Canvas shadows dpr={[1, 2]}>
        {/* THE MONUMENT VALLEY CAMERA: Orthographic makes it look like a toy */}
        <OrthographicCamera 
          makeDefault 
          position={[40, 40, 40]} 
          zoom={80} 
          near={0.1} 
          far={200} 
        />
        
        <OrbitControls 
          enablePan={true} 
          enableRotate={true} 
          enableZoom={true}
          minZoom={40}
          maxZoom={120}
        />

        <color attach="background" args={['#e8e2d6']} />
        
        {/* Soft, even lighting like a studio photo */}
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 20, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#ffccaa" />

        <group rotation={[0, -Math.PI / 4, 0]}>
          {mapNodes.map((node: any) => (
            <group key={node.id} position={[node.x * 2.5, 0, node.z * 2.5]}>
              {node.type === 'pub' ? <Landmark node={node} /> : <RoadTile node={node} />}
            </group>
          ))}
        </group>

        {/* Soft Contact Shadows are ESSENTIAL for this look */}
        <ContactShadows 
          position={[0, -0.01, 0]} 
          opacity={0.3} 
          scale={100} 
          blur={3} 
          far={10} 
          color="#4a4030"
        />
      </Canvas>
    </div>
  )
}
