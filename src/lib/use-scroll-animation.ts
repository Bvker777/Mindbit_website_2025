import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Standardized animation configuration
export const ANIMATION_CONFIG = {
  margin: "-100px",
  once: true,
  amount: 0.2,
} as const;

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

// Custom hook for consistent scroll animations
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    ...ANIMATION_CONFIG, 
    ...options 
  });
  
  return { ref, isInView };
}

// Accessibility-aware motion configuration
export const getMotionConfig = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return {
      initial: false,
      animate: { opacity: 1 },
      transition: { duration: 0.01 }
    };
  }
  
  return {
    initial: "hidden",
    animate: "visible"
  };
};

// Progressive enhancement for scroll effects
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateScrollProgress = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrolled / maxScroll, 1);
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
    
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);
  
  return scrollProgress;
};

// Custom hook for parallax scrolling effect with performance optimizations
export const useParallaxScroll = (velocity = 0.5, elementRef?: React.RefObject<HTMLElement | null>) => {
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let ticking = false;
    let lastScrollY = 0;
    
    const updateOffset = () => {
      if (!ticking && elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrolled = window.scrollY;
        const elementTop = rect.top + scrolled;
        const windowHeight = window.innerHeight;
        const elementHeight = rect.height;
        
        // Only calculate if element is near viewport for performance
        const elementBottom = elementTop + elementHeight;
        const viewportTop = scrolled - windowHeight;
        const viewportBottom = scrolled + windowHeight * 2;
        
        if (elementBottom >= viewportTop && elementTop <= viewportBottom) {
          // Calculate when element is in viewport
          const elementCenter = elementTop + elementHeight / 2;
          const screenCenter = scrolled + windowHeight / 2;
          
          // Calculate parallax offset based on distance from screen center
          const distance = elementCenter - screenCenter;
          const parallaxOffset = distance * velocity;
          
          setOffsetY(parallaxOffset);
        }
        ticking = false;
      }
    };
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Only update if scroll delta is significant (performance optimization)
      if (scrollDelta > 1) {
        if (!ticking) {
          requestAnimationFrame(updateOffset);
          ticking = true;
        }
        lastScrollY = currentScrollY;
      }
    };
    
    // Initial calculation
    updateOffset();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateOffset, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateOffset);
    };
  }, [velocity, elementRef]);
  
  return offsetY;
};
