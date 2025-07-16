import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveModel = () => {
  const meshRef = useRef(null);

  // Load the Untitled.glb model
  const { scene } = useGLTF('/models/Untitled.glb');
  
  // Animation loop - auto rotation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  // Process scene with useMemo
  const processedScene = React.useMemo(() => {
    const clonedScene = scene.clone();
    
    // จัดตำแหน่งให้อยู่ตรงกลาง
    const bbox = new THREE.Box3().setFromObject(clonedScene);
    const center = bbox.getCenter(new THREE.Vector3());
    clonedScene.position.sub(center);
    
    // ปรับขนาดโมเดลให้ใหญ่ขึ้น (เพิ่ม scale)
    const size = bbox.getSize(new THREE.Vector3());
    const maxSize = Math.max(size.x, size.y, size.z);
    const scale = 2.5 / maxSize; // ปรับตัวเลขนี้เพื่อเปลี่ยนขนาด
    clonedScene.scale.setScalar(scale);
    
    // ปรับตำแหน่งโมเดล (x, y, z)
    // x: ซ้าย(-) / ขวา(+)
    // y: ลง(-) / ขึ้น(+)
    // z: หน้า(-) / หลัง(+)
    clonedScene.position.y -= 0.2; // ปรับลง 0.5 หน่วย
    // clonedScene.position.x += 0.0; // ปรับซ้าย-ขวา
    // clonedScene.position.z += 0.0; // ปรับหน้า-หลัง
    
    return clonedScene;
  }, [scene]);

  return (
    <>
      <group ref={meshRef}>
        <primitive object={processedScene} />
      </group>
    </>
  );
};

export default InteractiveModel; 