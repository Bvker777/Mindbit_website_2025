// Performance utilities for animation optimization

// Interface for navigator with deviceMemory (experimental API)
interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number;
}

export const getDevicePerformance = () => {
  if (typeof window === 'undefined') return 'high';
  
  // Check for low-end device indicators
  const nav = navigator as NavigatorWithDeviceMemory;
  const isLowEnd = 
    navigator.hardwareConcurrency <= 2 || // Low CPU cores
    (nav.deviceMemory && nav.deviceMemory <= 4) || // Low RAM (if available)
    /Android.*Chrome\/[.0-9]* (?!.*Mobile)/i.test(navigator.userAgent) || // Android tablets
    /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // Mobile devices
  
  return isLowEnd ? 'low' : 'high';
};

export const shouldReduceAnimations = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check device performance
  const devicePerformance = getDevicePerformance();
  
  return prefersReducedMotion || devicePerformance === 'low';
};

export const getOptimizedAnimationConfig = () => {
  const shouldReduce = shouldReduceAnimations();
  
  if (shouldReduce) {
    return {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.05,
      delayChildren: 0.02
    };
  }
  
  return {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
    staggerChildren: 0.15,
    delayChildren: 0.1
  };
};

// Intersection Observer with performance optimizations
export const createOptimizedObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '-50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};

// Throttle function for scroll events
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

// Debounce function for resize events
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  }) as T;
};
