'use client'
import dynamic from 'next/dynamic'

// We use ../ to go UP one level out of the app folder to find components
const World = dynamic(() => import('../components/World'), { 
  ssr: false,
  loading: () => <div style={{color: 'white', padding: '20px', fontFamily: 'monospace'}}>INITIALIZING 3D LAB...</div>
})

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', backgroundColor: 'black', margin: 0, padding: 0 }}>
      <World />
    </main>
  )
}
