// Centralized animation exports for better tree-shaking
export { motion, useInView, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
export type { Variants } from "framer-motion";

// Re-export animation utilities
export * from './core';
export * from './variants';
export * from './hooks';

// Re-export specific hooks that are commonly used
export { useScrollAnimation, useParallaxScroll, useOptimizedScrollAnimation, getMotionConfig } from './hooks';

// Re-export specific variants that are commonly used
export { STANDARD_VARIANTS, MOBILE_VARIANTS, getAnimationVariants } from './variants';
