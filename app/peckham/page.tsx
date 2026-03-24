'use client'
import dynamic from 'next/dynamic'

const World = dynamic(
  () => import('../../components/peckham/World'),
  {
    ssr: false,
    loading: () => <div style={{background: '#e8e2d6', height: '100vh'}}>Loading Peckham...</div>
  }
)

export default function PeckhamPage() {
  return <World />
}
