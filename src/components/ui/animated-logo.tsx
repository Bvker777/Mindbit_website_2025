"use client";

import { motion, useReducedMotion } from "framer-motion";

type AnimatedLogoProps = {
  className?: string;
};

export default function AnimatedLogo({ className }: AnimatedLogoProps) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.svg
      viewBox="0 0 841.75 832.86"
      aria-hidden
      className={className}
      initial={false}
      animate={
        prefersReduced
          ? { opacity: 0.06 }
          : {
              rotate: [0, 2, 0, -2, 0],
              transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
            }
      }
      style={{ opacity: 0.06 }}
    >
      <defs>
        <style>{`.stroke{fill:none;stroke:#020202;stroke-miterlimit:10;stroke-width:4px;stroke-linecap:round}`}</style>
      </defs>

      {/* Outer ring + inner circle combined path */}
      <motion.path
        className="stroke"
        d="M396.23,45.4C180.02,45.4,5,220.62,5,436.63s175.02,391.23,391.23,391.23,391.23-175.23,391.23-391.23S612.23,45.4,396.23,45.4m0,566.3c-96.81,0-175.07-78.52-175.07-175.07s78.26-175.07,175.07-175.07,175.07,78.26,175.07,175.07-78.52,175.07-175.07,175.07"
        initial={prefersReduced ? {} : { pathLength: 0 }}
        animate={
          prefersReduced
            ? {}
            : {
                pathLength: 1,
                transition: { duration: 1.2, ease: "easeInOut" },
              }
        }
      />

      {/* Accent path */}
      <motion.path
        className="stroke"
        d="M836.75,19.1V209.84c0,14.31-19.03,19.6-26.1,7.18-44.08-77.05-107.98-141.37-184.76-185.92-12.32-7.18-6.97-26.1,7.29-26.1h189.48c7.81,0,14.1,6.29,14.1,14.1"
        initial={prefersReduced ? {} : { pathLength: 0 }}
        animate={
          prefersReduced
            ? {}
            : {
                pathLength: 1,
                transition: { delay: 0.2, duration: 1.0, ease: "easeInOut" },
              }
        }
      />

      {/* Optional very subtle dashed orbit once revealed */}
      {!prefersReduced && (
        <motion.path
          className="stroke"
          d="M396.23,45.4C180.02,45.4,5,220.62,5,436.63s175.02,391.23,391.23,391.23,391.23-175.23,391.23-391.23S612.23,45.4,396.23,45.4"
          strokeDasharray="4 12"
          animate={{ strokeDashoffset: [0, -200] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.05 }}
        />
      )}
    </motion.svg>
  );
}


