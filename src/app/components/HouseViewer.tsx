"use client";

import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

interface HouseViewerProps {
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  material: string;
  shape?: 'cubo' | 'retangulo';
}

function House({ dimensions, material, shape = 'retangulo' }: HouseViewerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Materiais disponíveis
  const materials = {
    madeira: new THREE.MeshStandardMaterial({ 
      color: '#8B4513',
      roughness: 0.8,
      metalness: 0.1
    }),
    metal: new THREE.MeshStandardMaterial({ 
      color: '#B8B8B8',
      roughness: 0.3,
      metalness: 0.8
    }),
    vidro: new THREE.MeshPhysicalMaterial({
      color: '#FFFFFF',
      transmission: 0.9,
      opacity: 0.3,
      metalness: 0,
      roughness: 0,
      ior: 1.5,
      transparent: true,
    }),
    tijolo: new THREE.MeshStandardMaterial({
      color: '#b97a56',
      roughness: 0.8,
      metalness: 0.2
    })
  };

  let boxArgs: [number, number, number];
  let meshY: number;
  if (shape === 'cubo') {
    const side = Math.max(dimensions.length, dimensions.width, dimensions.height);
    boxArgs = [side, side, side];
    meshY = side / 2;
  } else {
    boxArgs = [dimensions.width, dimensions.height, dimensions.length];
    meshY = dimensions.height / 2;
  }

  return (
    <mesh ref={meshRef} position={[0, meshY, 0]} material={materials[material as keyof typeof materials]}>
      <boxGeometry args={boxArgs} />
    </mesh>
  );
}

export default function HouseViewer({ dimensions, material, shape = 'retangulo' }: HouseViewerProps) {
  const [cameraPosition, ] = useState<[number, number, number]>([10, 5, 10]);

  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <PerspectiveCamera makeDefault position={cameraPosition} />
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={80}
      />
      <gridHelper args={[100, 100]} />
      <House dimensions={dimensions} material={material} shape={shape} />
    </Canvas>
  );
} 