// import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import RadialBackground from "./components/radial-background";
import PlanetModel from "./components/planet-model";
import FontText from "./components/welcome-text";
import { useEffect, useRef, useState } from "react";
import Stars from "./components/stars";

export default function MyScene() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        gl={{
          toneMapping: THREE.ReinhardToneMapping,
          toneMappingExposure: 2.3,
        }}
        shadows
      >
        <PlanetModel position={new THREE.Vector3(0, 0, 0)} />
        <RadialBackground />
        <FontText />
        <Stars count={1500} />

        <hemisphereLight args={[0xffeeb1, 0x080820]} />
        <WorldSpotlight position={[0, 4.6, 4]} />
        <WorldSpotlight position={[-1.8, 3, 4.3]} />
        <WorldSpotlight position={[2.2, -5, 5.4]} />

        <InteractiveCamera />
        <ScrollCamera />
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
}

function InteractiveCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const targetPos = useRef(new THREE.Vector3());

  // Update mouse on move
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    const range = 0.1;

    targetPos.current.set(
      mouse.current.x * range,
      mouse.current.y * range,
      10, // fixed distance from scene
    );

    camera.position.lerp(targetPos.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null; // this is a logic-only component
}

function WorldSpotlight(props: {
  position: [x: number, y: number, z: number];
}) {
  return (
    <spotLight
      args={[0xffa95c, 120, 10]}
      castShadow
      penumbra={0.5}
      // angle={0.3}
      shadow-mapSize-width={1024 * 4}
      shadow-mapSize-height={1024 * 4}
      shadow-bias={-0.0001}
      {...props}
    />
  );
}

function ScrollCamera() {
  const { camera } = useThree();
  const [scrollY, setScrollY] = useState(0);
  const targetZ = useRef(camera.position.z);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      setScrollY(scroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(() => {
    // Map scroll to desired Z movement (adjust scaling as needed)
    targetZ.current = 10 + scrollY * 0.01; // Example: move from Z = 10 to Z = 30+
    const lerp = THREE.MathUtils.lerp(camera.position.z, targetZ.current, 0.1);
    camera.position.z = lerp <= 20 ? lerp : 20;
  });

  return null;
}
