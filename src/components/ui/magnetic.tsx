"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number;
  range?: number;
  springOptions?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  onlyOnHover?: boolean;
  disableOnTouch?: boolean;
}

export function Magnetic({
  children,
  strength = 0.5,
  range = 120,
  springOptions = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
  onlyOnHover = false,
  disableOnTouch = true,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  const rotateX = useTransform(springY, [-range, range], [15, -15]);
  const rotateY = useTransform(springX, [-range, range], [-15, 15]);

  useEffect(() => {
    if (disableOnTouch) {
      const checkTouch = () => {
        setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
      };
      
      checkTouch();
      window.addEventListener("resize", checkTouch);
      return () => window.removeEventListener("resize", checkTouch);
    }
  }, [disableOnTouch]);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      if (distance < range) {
        const shouldActivate = !onlyOnHover || isHovered;
        
        if (shouldActivate) {
          const deltaX = (e.clientX - centerX) * strength;
          const deltaY = (e.clientY - centerY) * strength;

          x.set(deltaX);
          y.set(deltaY);
        }
      } else {
        x.set(0);
        y.set(0);
      }
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    if (!onlyOnHover || isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y, range, strength, onlyOnHover, isHovered, isTouchDevice]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onlyOnHover) {
      x.set(0);
      y.set(0);
    }
  };

  if (isTouchDevice) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
