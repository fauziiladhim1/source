import { cn } from "../../../lib/utils";
import React, { useEffect, useState } from "react";
import { Meteors } from "./meteors";

interface InfiniteMovingCardsProps {
  items: {
    name: string;
    avatar: string;
    title: string;
    quote: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const scrollerRef = React.useRef<HTMLUListElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true) as HTMLElement;
        scrollerRef.current!.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item) => (
          <li
            key={item.name}
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl border border-zinc-300/30 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-[#2c2c3a] dark:via-[#1f1f2b] dark:to-[#14141f] px-6 py-6 md:w-[450px] overflow-hidden transition transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <Meteors number={5} className={undefined} />
            </div>

            <div className="relative z-10 flex flex-col items-start space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md dark:border-zinc-700"
                />
                <div>
                  <div className="text-base font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    {item.title}
                  </div>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {item.quote}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};