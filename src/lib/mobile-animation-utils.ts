// Mobile animation utilities for disabling animations on mobile devices

import { useEffect, useState } from 'react';

// Hook to detect if we're on a mobile device
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      if (typeof window === 'undefined') return false;
      
      // Check for mobile user agents
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(navigator.userAgent);
      
      // Check for touch capability
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // Check screen size (mobile breakpoint)
      const isMobileScreen = window.innerWidth < 768; // md breakpoint
      
      const mobile = isMobileUA || (isTouchDevice && isMobileScreen);
      setIsMobile(mobile);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// Hook to get mobile-optimized animation config
export const useMobileAnimationConfig = () => {
  const isMobile = useIsMobile();
  
  return {
    isMobile,
    shouldDisableAnimations: isMobile,
    animationVariants: isMobile ? {
      container: { hidden: { opacity: 1 }, visible: { opacity: 1 } },
      slideUp: { hidden: { opacity: 1, y: 0, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } },
      slideLeft: { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } },
      slideRight: { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } },
      fadeIn: { hidden: { opacity: 1 }, visible: { opacity: 1 } },
      scaleIn: { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } },
      title: { hidden: { opacity: 1, y: 0, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } }
    } : null,
    motionConfig: isMobile ? {
      initial: "visible",
      animate: "visible",
      transition: { duration: 0 }
    } : {
      initial: "hidden",
      animate: "visible"
    }
  };
};

// Utility to disable animations on mobile
export const disableMobileAnimations = () => {
  if (typeof window === 'undefined') return;
  
  // Add CSS class to disable animations
  document.documentElement.classList.add('mobile-animations-disabled');
  
  // Ensure all content is visible on mobile
  const style = document.createElement('style');
  style.setAttribute('data-mobile-animations', 'true');
  style.textContent = `
    @media (max-width: 767px) {
      /* Ensure all content is visible */
      body, main, section, div, h1, h2, h3, h4, h5, h6, p {
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      *:hover {
        transform: none !important;
        -webkit-transform: none !important;
        scale: 1 !important;
        rotate: 0deg !important;
        box-shadow: none !important;
      }
    }
  `;
  document.head.appendChild(style);
};

// Utility to enable animations (for desktop)
export const enableAnimations = () => {
  if (typeof window === 'undefined') return;
  
  // Remove CSS class
  document.documentElement.classList.remove('mobile-animations-disabled');
  
  // Remove the style tag if it exists
  const existingStyle = document.querySelector('style[data-mobile-animations]');
  if (existingStyle) {
    existingStyle.remove();
  }
};

// Auto-detect and apply mobile animation settings
export const applyMobileAnimationSettings = () => {
  if (typeof window === 'undefined') return;
  
  const isMobile = window.innerWidth < 768 || 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    disableMobileAnimations();
  } else {
    enableAnimations();
  }
};

// Initialize mobile animation settings on page load
export const initializeMobileAnimationSettings = () => {
  if (typeof window === 'undefined') return;
  
  // Apply settings immediately
  applyMobileAnimationSettings();
  
  // Reapply on resize
  window.addEventListener('resize', applyMobileAnimationSettings);
  
  // Cleanup function
  return () => {
    window.removeEventListener('resize', applyMobileAnimationSettings);
  };
};
