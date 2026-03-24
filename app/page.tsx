'use client'
import dynamic from 'next/dynamic'

const World = dynamic(() => import('../components/World'), { 
  ssr: false,
  loading: () => <div style={{color: 'white', padding: '20px', background: 'black', height: '100vh'}}>LOADING LAB...</div>
})

export default function Home() {
  return <main><World /></main>
}
