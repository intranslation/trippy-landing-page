import { motion, useScroll, useTransform } from "motion/react";
import About from "./features/about/about";
import MyScene from "./features/scene/scene";
import { useGLTF } from "@react-three/drei";
import ModelLoaderBar from "./features/scene/components/model-loader-bar";

function App() {
  const { scrollYProgress } = useScroll();
  const background = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    ["#00000000", "#09090B", "#09090B"],
  );

  useGLTF.preload("/low_poly_world.glb");

  return (
    <div className="bg-black">
      <ModelLoaderBar />
      <MyScene />
      <motion.section style={{ background }} className="absolute top-0 left-0">
        <About />
      </motion.section>
    </div>
  );
}

export default App;
