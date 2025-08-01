import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "../../../lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.2
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  useEffect(() => {
    animate("span", {
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
    }, {
      duration: duration ? duration : 1,
      delay: stagger(0.2),
    });
  }, [scope.current]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0 mx-1"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}>
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("text-base", className)}> 
      <div className="mt-4">
        {/* Ubah ukuran font dari text-2xl menjadi ukuran yang diinginkan, misalnya text-base atau text-sm */}
        <div
          className=" dark:text-white text-black text-base leading-snug tracking-wide"> {/* Mengubah text-2xl menjadi text-base */}
          {renderWords()}
        </div>
      </div>
    </div>
  );
};