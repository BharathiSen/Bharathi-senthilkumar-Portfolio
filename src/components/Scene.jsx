import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

const Scene = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Floating effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      
      // Mouse reactive movement
      const mouseX = (state.pointer.x * Math.PI) / 4;
      const mouseY = (state.pointer.y * Math.PI) / 4;
      
      meshRef.current.rotation.x += (mouseY - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (mouseX - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#808080" />
      
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial 
          color="#0a0a0c"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.9}
        />
        <Edges 
          linewidth={2} 
          threshold={15} 
          color="#ffffff" 
        />
      </mesh>
    </>
  );
};

export default Scene;
