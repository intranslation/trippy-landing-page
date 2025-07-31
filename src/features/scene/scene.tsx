// import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import RadialBackground from "./components/radial-background";
import PlanetModel from "./components/planet-model";
import FontText from "./components/welcome-text";
import { useEffect, useRef, useState } from "react";
import Stars from "./components/stars";

export default function MyScene() {
  const [bringWorldForward, setBringWorldForward] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setBringWorldForward(true);
    }, 3500);
  }, []);
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
        <NebulaBackground />
        {bringWorldForward && <AnimatedPlanetModel />}
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

function NebulaBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Vertex shader
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  // Fragment shader for nebula effect
  const fragmentShader = `
    uniform float time;
    varying vec2 vUv;

    // Simple noise function
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    float noise(vec2 st) {
      vec2 i = floor(st);
      vec2 f = fract(st);
      float a = random(i);
      float b = random(i + vec2(1.0, 0.0));
      float c = random(i + vec2(0.0, 1.0));
      float d = random(i + vec2(1.0, 1.0));
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    void main() {
      vec2 st = vUv * 3.0;

      // Animate the noise
      vec2 q = vec2(fbm(st + 0.0 * time), fbm(st + vec2(1.0)));
      vec2 r = vec2(fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.15 * time),
                    fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.126 * time));

      float f = fbm(st + r);

      // Create nebula colors
      vec3 color1 = vec3(0.1, 0.05, 0.2); // Dark blue
      vec3 color2 = vec3(0.3, 0.1, 0.5);  // Purple
      vec3 color3 = vec3(0.11, 0.12, 0.33);  // Bright purple
      vec3 color4 = vec3(0.11, 0.12, 0.33);  // Light purple

      vec3 color = mix(color1, color2, f);
      color = mix(color, color3, f * f);
      color = mix(color, color4, f * f * f);

      // Add some brightness variation
      color *= 0.3 + 0.7 * f;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const uniforms = {
    time: { value: 0.0 },
  };

  useFrame((state) => {
    if (meshRef.current) {
      uniforms.time.value = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -50]} scale={[100, 100, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function AnimatedPlanetModel() {
  const planetRef = useRef<THREE.Group>(null);
  const [position] = useState(new THREE.Vector3(0, -4, -10)); // Start further back
  const targetPosition = useRef(new THREE.Vector3(0, 0, 0)); // End closer to camera

  useFrame(() => {
    if (!planetRef.current) return;

    // Slowly move towards the target position
    position.lerp(targetPosition.current, 0.01); // 0.01 controls the speed (slower = smaller value)
    planetRef.current.position.copy(position);
  });

  return (
    <group ref={planetRef}>
      <PlanetModel position={new THREE.Vector3(0, 0, 0)} />
    </group>
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
