import { useProgress } from "@react-three/drei";
import { AnimatePresence, motion, useAnimationFrame } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface SmoothTimerProps {
  from: number;
  target: number;
  duration?: number;
}

const useSmoothTimer = ({
  from,
  target,
  duration = 2000,
}: SmoothTimerProps) => {
  const [count, setCount] = useState(0);
  const start = useRef(from);

  useAnimationFrame((time) => {
    const elapsed = time - start.current;
    const progress = Math.min(elapsed / duration, 1);
    const count =
      Math.floor(progress * target) < 0 ? 0 : Math.floor(progress * target);
    setCount(count);
  });

  return count;
};

export default function ModelLoaderBar() {
  // const t = useIntl()
  const { progress } = useProgress();
  const [smoothed, setSmoothed] = useState(0);

  const timer = useSmoothTimer({
    from: smoothed,
    target: 101,
    duration: 1500,
  });

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setSmoothed((prev) => prev + (progress - prev) * 0.3);
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [progress]);

  return (
    <AnimatePresence>
      {timer != 101 && (
        <motion.div
          className="fixed top-0 left-0 z-80 h-screen w-screen overflow-y-hidden bg-black"
          initial={{ top: 0 }}
          exit={{ top: "-100vh", transition: { delay: 2 } }}
        >
          <motion.div
            className="fixed top-0 left-0 z-90 flex h-screen w-screen items-center justify-center bg-blue-600"
            initial={{ opacity: 1, top: "100vh" }}
            exit={{
              opacity: 1,
              top: ["100vh", "0vh", "0vh", "-100vh"],
              scaleY: [1, 1, 1, 0.1],
              transition: {
                delay: 0.8,
                duration: 3,
                ease: "easeInOut",
              },
            }}
          >
            <h1 className="font-josefin-sans text-[7vw] text-white">TRIPPY</h1>
          </motion.div>
          <motion.div
            className="fixed top-0 left-0 z-100 flex h-screen w-screen flex-col items-start justify-between bg-purple-700 p-8"
            initial={{ opacity: 0, top: 0 }}
            animate={{ opacity: 1, top: 0 }}
            exit={{
              top: "-100vh",
              transition: {
                delay: 1,
                duration: 1,
                ease: "easeInOut",
              },
            }}
          >
            <h1 className="font-josefin-sans text-2xl text-[6vw] font-bold text-zinc-300">
              Planejando os destinos dos <br />
              seus sonhos...
            </h1>

            <motion.h1
              style={{
                left: "84%",
              }}
              className="m-4 text-[5vw] font-black text-white"
            >
              {timer}%
            </motion.h1>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
