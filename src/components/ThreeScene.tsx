import { Canvas } from '@react-three/fiber'
import { Float, Image as DreiImage } from '@react-three/drei'
import { Suspense } from 'react'

function FloatingSprite({ url, position, rotation, scale = [3, 3], floatIntensity = 2 }: any) {
  return (
    <Float speed={2} rotationIntensity={0} floatIntensity={floatIntensity} floatingRange={[-0.2, 0.2]}>
      <DreiImage url={url} position={position} rotation={rotation} scale={scale} transparent />
    </Float>
  )
}

function RetroScene() {
  return (
    <>
      
      {/* Positioned along the bottom like the cutouts in the ref image, leaning in toward the center */}
      <FloatingSprite url="/assets/robot.png" position={[-6.5, -2, 0]} rotation={[0, 0, -0.1]} scale={[4, 4]} floatIntensity={1} />
      <FloatingSprite url="/assets/lightbulb.png" position={[-2.5, -1, 0]} rotation={[0, 0, 0]} scale={[3.5, 3.5]} floatIntensity={1.5} />
      <FloatingSprite url="/assets/laptop.png" position={[6, -2, 0]} rotation={[0, 0, 0.1]} scale={[4.5, 4.5]} floatIntensity={1} />
    </>
  )
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 z-20 pointer-events-auto h-full w-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <RetroScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
