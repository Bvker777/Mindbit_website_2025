"use client";

import { motion, useInView, Easing } from "framer-motion";
import { useRef, ReactNode } from "react";

interface RollingTextProps {
  text: string;
  className?: string;
  inView?: boolean;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: Easing;
  };
  children?: ReactNode;
}

export default function RollingText({ 
  text, 
  className = "", 
  inView = true,
  transition = { duration: 0.6, delay: 0.08, ease: "easeOut" as Easing },
  children
}: RollingTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const letters = text.split("");

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ 
            rotateX: -90,
            opacity: 0,
            transformOrigin: "bottom"
          }}
          animate={inView && isInView ? {
            rotateX: 0,
            opacity: 1,
            transformOrigin: "bottom"
          } : {
            rotateX: -90,
            opacity: 0,
            transformOrigin: "bottom"
          }}
          transition={{
            duration: transition.duration,
            delay: index * (transition.delay || 0.08),
            ease: transition.ease,
          }}
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </div>
  );
}
