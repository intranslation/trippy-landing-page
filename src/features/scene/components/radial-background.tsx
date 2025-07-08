import { createPortal, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo } from "react";

export default function RadialBackground() {
  const { gl, scene: mainScene, camera: mainCamera } = useThree();

  const backgroundScene = useMemo(() => new THREE.Scene(), []);
  const backgroundCamera = useMemo(() => new THREE.Camera(), []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color1: { value: new THREE.Color("#2F2F6E") },
        color2: { value: new THREE.Color("#0F182E") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
          float dist = distance(vUv, vec2(0.5, 0.5));
          float t = smoothstep(0.0, 0.7, dist);
          vec3 color = mix(color1, color2, t);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
      depthWrite: false,
      depthTest: false,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame(() => {
    gl.autoClear = false;
    gl.clear();
    gl.render(backgroundScene, backgroundCamera);
    gl.render(mainScene, mainCamera);
  }, 1);

  return createPortal(
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>,
    backgroundScene,
  );
}
