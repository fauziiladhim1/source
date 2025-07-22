"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = (ref.current as HTMLElement).getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => {
          const sectionRef = useRef(null); 
          const { scrollYProgress: sectionScrollYProgress } = useScroll({
            target: sectionRef,
            offset: ["start 60%", "end 50%"], 
          });

          // Transformasi warna untuk dot
          const dotColor = useTransform(
            sectionScrollYProgress,
            [0, 1],
            ["rgb(163 163 163)", "rgb(129 140 248)"] 
          );

          // Transformasi warna untuk teks
          const textColor = useTransform(
            sectionScrollYProgress,
            [0, 1],
            ["rgb(115 115 115)", "rgb(255 255 255)"] 
          );
          const darkTextColor = useTransform(
            sectionScrollYProgress,
            [0, 1],
            ["rgb(115 115 115)", "rgb(0 0 0)"] 
          );

          return (
            <div
              key={index}
              ref={sectionRef} 
              className="flex justify-start pt-10 md:pt-32 md:gap-8"
            >
              {/* Left dot and title (desktop) */}
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-8 absolute left-3 md:left-3 w-8 rounded-full bg-white dark:bg-black flex items-center justify-center">
                  <motion.div
                    style={{ backgroundColor: dotColor, borderColor: dotColor }}
                    className="h-3 w-3 rounded-full border p-1"
                  />
                </div>
                <motion.h3
                  style={{
                    color: textColor,
                  }}
                  className="hidden md:block text-base md:pl-16 md:text-3xl font-bold dark:text-neutral-500 text-neutral-500" // Kelas fallback
                >
                  {item.title}
                </motion.h3>
              </div>

              {/* Content block */}
              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <motion.h3
                  style={{
                    color: textColor, 
                  }}
                  className="md:hidden block text-lg mb-3 text-left font-semibold dark:text-neutral-500 text-neutral-500"
                >
                  {item.title}
                </motion.h3>
                <div className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                  {item.content}
                </div>
              </div>
            </div>
          );
        })}

        {/* Vertical timeline bar */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent via-neutral-200 dark:via-neutral-700 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};