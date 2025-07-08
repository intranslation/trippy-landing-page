import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

export default function Stars({ count = 1000 }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Create geometry and userData once
  const { geometry, speeds, baseY } = useMemo(() => {
    const positions: number[] = [];
    const baseY: number[] = [];
    const speeds: number[] = [];

    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(100);
      const y = THREE.MathUtils.randFloatSpread(100);
      const z = THREE.MathUtils.randFloat(-5, -1);

      positions.push(x, y, z);
      baseY.push(y);
      speeds.push(Math.random() * 0.5 + 0.5);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );

    return { geometry, speeds, baseY };
  }, [count]);

  // Animate the Y position of stars with sine wave
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const positions = geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < positions.count; i++) {
      const iy = i * 3 + 1;
      positions.array[iy] = baseY[i] + Math.sin(time * speeds[i]) * 0.5;
    }

    positions.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry} renderOrder={1}>
      <pointsMaterial
        color={0xffffff}
        size={0.1}
        sizeAttenuation
        transparent
        depthWrite={false}
      />
    </points>
  );
}
