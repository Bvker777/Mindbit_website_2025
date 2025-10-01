import { useRef, useEffect, useState } from 'react';
import { 
  getOptimizedAnimationConfig, 
  shouldReduceAnimations,
  createOptimizedObserver,
  throttle 
} from './performance-utils';

// Optimized scroll animation hook
export const useOptimizedScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = createOptimizedObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);
        
        // Only animate once for better performance
        if (isVisible && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { 
        rootMargin: "-50px",
        threshold: 0.1,
        ...options 
      }
    );
    
    observer.observe(ref.current);
    
    return () => observer.disconnect();
  }, [hasAnimated, options]);
  
  return { ref, isInView: isInView || hasAnimated };
};

// Optimized parallax hook
export const useOptimizedParallax = (velocity = 0.5, elementRef?: React.RefObject<HTMLElement>) => {
  const [offsetY, setOffsetY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef?.current) return;
    
    let ticking = false;
    let lastScrollY = 0;
    
    const updateOffset = throttle(() => {
      if (!ticking && elementRef.current && isVisible) {
        const rect = elementRef.current.getBoundingClientRect();
        // const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Only calculate if element is in viewport
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          const elementCenter = rect.top + rect.height / 2;
          const screenCenter = windowHeight / 2;
          const distance = elementCenter - screenCenter;
          const parallaxOffset = distance * velocity;
          
          setOffsetY(parallaxOffset);
        }
        ticking = false;
      }
    }, 16); // ~60fps
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      if (scrollDelta > 1) {
        updateOffset();
        lastScrollY = currentScrollY;
      }
    };
    
    // Visibility observer
    const observer = createOptimizedObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '100px' }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [velocity, elementRef, isVisible]);
  
  return offsetY;
};

// Get optimized animation variants
export const getOptimizedVariants = () => {
  const config = getOptimizedAnimationConfig();
  const shouldReduce = shouldReduceAnimations();
  
  if (shouldReduce) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
      }
    };
  }
  
  return {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: config.duration,
        ease: config.ease,
        staggerChildren: config.staggerChildren,
        delayChildren: config.delayChildren
      }
    }
  };
};
