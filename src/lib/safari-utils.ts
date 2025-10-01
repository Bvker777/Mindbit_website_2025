// Safari-specific utilities and detection

// Interface for webkit-specific CSS properties
interface WebkitCSSStyleDeclaration extends CSSStyleDeclaration {
  webkitOverflowScrolling?: string;
}

// Safari version detection
export const getSafariVersion = (): number | null => {
  if (typeof window === 'undefined') return null;
  
  const userAgent = navigator.userAgent;
  const safariMatch = userAgent.match(/Version\/(\d+)\./);
  
  if (safariMatch) {
    return parseInt(safariMatch[1], 10);
  }
  
  return null;
};

// Check if running on Safari
export const isSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  return /^((?!chrome|android).)*safari/i.test(userAgent);
};

// Check if running on Safari mobile (iOS)
export const isSafariMobile = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  return /iPhone|iPad|iPod.*Safari/i.test(userAgent);
};

// Check if running on Safari mobile with specific device detection
export const isSafariMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isSafari = /Safari/i.test(userAgent) && !/Chrome|Chromium|Edge|Firefox/i.test(userAgent);
  
  return isIOS && isSafari;
};

// Check if running on Safari desktop
export const isSafariDesktop = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  return /Safari/i.test(userAgent) && !/Chrome|Chromium|Edge|Firefox/i.test(userAgent);
};

// Check if Safari supports specific features
export const safariSupports = {
  backdropFilter: (): boolean => {
    if (typeof window === 'undefined') return false;
    return CSS.supports('backdrop-filter', 'blur(10px)');
  },
  
  webkitTransform: (): boolean => {
    if (typeof window === 'undefined') return false;
    return CSS.supports('-webkit-transform', 'translateZ(0)');
  },
  
  webkitBackfaceVisibility: (): boolean => {
    if (typeof window === 'undefined') return false;
    return CSS.supports('-webkit-backface-visibility', 'hidden');
  },
  
  webkitPerspective: (): boolean => {
    if (typeof window === 'undefined') return false;
    return CSS.supports('-webkit-perspective', '1000px');
  },
  
  webkitOverflowScrolling: (): boolean => {
    if (typeof window === 'undefined') return false;
    return CSS.supports('-webkit-overflow-scrolling', 'touch');
  }
};

// Get Safari-specific performance recommendations
export const getSafariPerformanceConfig = () => {
  const version = getSafariVersion();
  const isMobile = isSafariMobile();
  
  // Safari 14+ has better performance
  const isModernSafari = version && version >= 14;
  
  // Safari mobile has different performance characteristics
  const isMobileSafari = isSafariMobile();
  
  return {
    useWebkitPrefixes: true,
    enableGPUAcceleration: true,
    reduceAnimations: !isModernSafari || isMobileSafari,
    usePassiveListeners: true,
    optimizeScrollPerformance: isMobileSafari,
    enableBackdropFilter: safariSupports.backdropFilter(),
    enableWebkitTransforms: safariSupports.webkitTransform(),
    enableWebkitBackfaceVisibility: safariSupports.webkitBackfaceVisibility(),
    enableWebkitPerspective: safariSupports.webkitPerspective(),
    enableWebkitOverflowScrolling: safariSupports.webkitOverflowScrolling(),
    version,
    isMobile,
    isModernSafari
  };
};

// Safari-specific CSS class generator
export const getSafariOptimizedClasses = (): string[] => {
  const config = getSafariPerformanceConfig();
  const classes: string[] = [];
  
  if (config.enableWebkitTransforms) {
    classes.push('safari-optimized');
  }
  
  if (config.enableGPUAcceleration) {
    classes.push('safari-gpu-accelerated');
  }
  
  if (config.optimizeScrollPerformance) {
    classes.push('safari-scroll-optimized');
  }
  
  if (config.isMobile) {
    classes.push('safari-mobile-optimized');
  }
  
  return classes;
};

// Safari-specific animation configuration
export const getSafariAnimationConfig = () => {
  const config = getSafariPerformanceConfig();
  
  return {
    duration: config.reduceAnimations ? 0.3 : 0.8,
    ease: config.reduceAnimations ? 'easeOut' : [0.25, 0.46, 0.45, 0.94],
    staggerChildren: config.reduceAnimations ? 0.05 : 0.15,
    delayChildren: config.reduceAnimations ? 0.02 : 0.1,
    useWebkitPrefixes: config.useWebkitPrefixes,
    enableGPUAcceleration: config.enableGPUAcceleration
  };
};

// Safari-specific event listener options
export const getSafariEventOptions = () => {
  const config = getSafariPerformanceConfig();
  
  return {
    passive: config.usePassiveListeners,
    capture: false
  };
};

// Safari-specific intersection observer options
export const getSafariObserverOptions = () => {
  const config = getSafariPerformanceConfig();
  
  return {
    rootMargin: config.optimizeScrollPerformance ? '-50px' : '0px',
    threshold: config.optimizeScrollPerformance ? 0.1 : 0.2
  };
};

// Safari-specific scroll optimization
export const optimizeSafariScroll = (element: HTMLElement) => {
  const config = getSafariPerformanceConfig();
  
  if (config.enableWebkitTransforms) {
    element.style.webkitTransform = 'translateZ(0)';
    element.style.webkitBackfaceVisibility = 'hidden';
  }
  
  if (config.enableWebkitOverflowScrolling) {
    // Use type assertion for webkit-specific properties
    (element.style as WebkitCSSStyleDeclaration).webkitOverflowScrolling = 'touch';
  }
};

// Safari-specific animation cleanup
export const cleanupSafariAnimations = (element: HTMLElement) => {
  // Remove webkit-specific properties
  element.style.webkitTransform = '';
  element.style.webkitBackfaceVisibility = '';
  element.style.webkitPerspective = '';
  element.style.willChange = 'auto';
};

// Safari-specific performance monitoring
export const monitorSafariPerformance = () => {
  if (typeof window === 'undefined') return;
  
  const config = getSafariPerformanceConfig();
  
  // Monitor frame rate on Safari
  let frameCount = 0;
  let lastTime = performance.now();
  
  const measureFrameRate = () => {
    frameCount++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime >= 1000) {
      const fps = frameCount;
      frameCount = 0;
      lastTime = currentTime;
      
      // Adjust performance based on FPS
      if (fps < 30 && config.enableGPUAcceleration) {
        console.warn('Safari performance: Low FPS detected, consider reducing animations');
      }
    }
    
    requestAnimationFrame(measureFrameRate);
  };
  
  if (config.isModernSafari) {
    requestAnimationFrame(measureFrameRate);
  }
};

// Export Safari detection utilities
export const safariUtils = {
  getSafariVersion,
  isSafari,
  isSafariMobile,
  isSafariDesktop,
  safariSupports,
  getSafariPerformanceConfig,
  getSafariOptimizedClasses,
  getSafariAnimationConfig,
  getSafariEventOptions,
  getSafariObserverOptions,
  optimizeSafariScroll,
  cleanupSafariAnimations,
  monitorSafariPerformance
};
