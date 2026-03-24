'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Landmark } from './Landmark'
import { RoadTile, ParkTile } from './Environment'
import Environment from './Environment'
import { mapData } from '../../lib/mapData'

export default function World() {
  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[-15, 15, -15]} fov={35} />
        <OrbitControls 
          makeDefault 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={10} 
          maxDistance={60} 
        />
        
        <Environment />

        {mapData.nodes.map((node) => {
          if (node.type === 'pub') return <Landmark key={node.id} node={node} />
          if (node.type === 'road') return <RoadTile key={node.id} node={node} />
          if (node.type === 'park') return <ParkTile key={node.id} node={node} />
          return null
        })}
      </Canvas>
    </div>
  )
}
