// Animation variants - consolidated from use-scroll-animation.ts
import { shouldDisableMobileAnimations } from './core';

// Standardized animation configuration
export const ANIMATION_CONFIG = {
  margin: "-100px",
  once: true,
  amount: 0.2,
} as const;

// Mobile-optimized animation variants (no animations)
export const MOBILE_VARIANTS = {
  container: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 1, y: 0, scale: 1 },
    visible: { opacity: 1, y: 0, scale: 1 }
  },
  slideLeft: {
    hidden: { opacity: 1, x: 0 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 1, x: 0 },
    visible: { opacity: 1, x: 0 }
  },
  fadeIn: {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  },
  scaleIn: {
    hidden: { opacity: 1, scale: 1 },
    visible: { opacity: 1, scale: 1 }
  },
  title: {
    hidden: { opacity: 1, y: 0, scale: 1 },
    visible: { opacity: 1, y: 0, scale: 1 }
  }
};

// Standard animation variants
export const STANDARD_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.6,
        ease: "easeOut",
      }
    }
  },

  slideUp: {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing curve
      }
    }
  },

  slideLeft: {
    hidden: {
      opacity: 0,
      x: -60
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  slideRight: {
    hidden: {
      opacity: 0,
      x: 60
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },

  fadeIn: {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  },

  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
      }
    }
  },

  title: {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  }
} as const;

// Get appropriate animation variants based on device type
export const getAnimationVariants = () => {
  if (typeof window !== 'undefined' && shouldDisableMobileAnimations()) {
    return MOBILE_VARIANTS;
  }
  return STANDARD_VARIANTS;
};