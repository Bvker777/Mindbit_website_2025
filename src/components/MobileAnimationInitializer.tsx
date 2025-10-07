"use client";

import { useEffect } from 'react';
import { initializeMobileAnimationSettings } from '@/lib/mobile-animation-utils';

export default function MobileAnimationInitializer() {
  useEffect(() => {
    // Initialize mobile animation settings
    const cleanup = initializeMobileAnimationSettings();
    
    // Cleanup on unmount
    return cleanup;
  }, []);

  // This component doesn't render anything
  return null;
}
