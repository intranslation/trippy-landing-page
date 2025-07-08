import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function PlanetModel(props: { position: THREE.Vector3 }) {
  const group = useRef<null | THREE.Mesh>(null);
  const { scene, animations } = useGLTF("/low_poly_world.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions && actions[Object.keys(actions)[0]]) {
      Object.keys(actions).forEach((key) => {
        (actions[key] as THREE.AnimationAction).play();
      });
    }
    scene.traverse((obj: THREE.Object3D<THREE.Object3DEventMap>) => {
      if ((obj as THREE.Mesh).isMesh) {
        (obj as THREE.Mesh).castShadow = true;
        (obj as THREE.Mesh).receiveShadow = true;
      }
    });
  }, [actions, scene]);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1; // smooth rotation
    }
  });

  return (
    <group ref={group} position={props.position}>
      <primitive object={scene} position={[0.2, -1, -0.4]} />
    </group>
  );
}
