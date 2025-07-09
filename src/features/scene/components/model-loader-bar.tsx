import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export function SmoothedProgress() {
  const { progress } = useProgress();
  const [smoothed, setSmoothed] = useState(0);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setSmoothed((prev) => prev + (progress - prev) * 0.1); // lerp smoothing
      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  return <div>{Math.round(smoothed)}%</div>;
}

export default function ModelLoaderBar() {
  const { progress } = useProgress();
  const [smoothed, setSmoothed] = useState(0);

  useEffect(() => {
    let frame: number;

    const animate = () => {
      setSmoothed((prev) => prev + (progress - prev) * 0.3); // lerp smoothing
      console.log(smoothed);
      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  //   const { progress, loaded } = useProgress();
  return (
    <AnimatePresence>
      {smoothed <= 99.99999 && (
        <motion.div
          key="loading-overlay"
          className="fixed top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black"
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: {
              delay: 1.25,
              duration: 1,
            },
          }}
        >
          {/* <small className="animate-gradient-x bg-gradient-to-r from-blue-400 to-purple-400 bg-size-[400%_400%] bg-clip-text text-[10px] text-transparent uppercase">
            Preparando algo incrível {smoothed} _ {progress}
          </small> */}
          <div className="h-[15px] w-[50vw] border border-white p-1">
            <motion.div
              className="h-full w-0 bg-white/40"
              animate={{
                width: `${Math.round(smoothed)}%`,
                transition: {
                  duration: 1,
                },
              }}
            ></motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
