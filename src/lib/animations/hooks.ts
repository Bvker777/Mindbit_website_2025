// Animation hooks - consolidated from use-scroll-animation.ts and use-optimized-animation.ts
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { shouldDisableMobileAnimations, createOptimizedObserver } from './core';

// Custom hook for consistent scroll animations
export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-100px",
    once: true,
    amount: 0.2,
    ...options
  });

  return { ref, isInView };
}

// Accessibility-aware motion configuration
export const getMotionConfig = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Check if mobile animations should be disabled
  const disableMobileAnimations = typeof window !== 'undefined' && shouldDisableMobileAnimations();

  if (prefersReducedMotion || disableMobileAnimations) {
    return {
      initial: "visible",
      animate: "visible",
      transition: { duration: 0 }
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

    // Disable parallax on mobile devices
    if (shouldDisableMobileAnimations()) {
      setOffsetY(0);
      return;
    }

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

// Optimized scroll animation hook
export const useOptimizedScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = createOptimizedObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
};