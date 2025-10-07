"use client";

import { motion, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { useScrollAnimation, STANDARD_VARIANTS } from "@/lib/use-scroll-animation";
import AnimatedLogo from "@/components/ui/animated-logo";
import { isSafariMobile } from "@/lib/safari-utils";
import { shouldDisableHeroMobileAnimations } from "@/lib/performance-utils";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { ref: scrollRef } = useScrollAnimation({ margin: "0px" });
  const prefersReduced = useReducedMotion();
  
  // Check if Hero mobile animations should be disabled (allows Hero animations on mobile)
  const disableHeroMobileAnimations = shouldDisableHeroMobileAnimations();
  
  // Parallax effects (disabled only for very low-end mobile devices)
  const yTransform = useTransform(scrollY, [0, 500], [0, disableHeroMobileAnimations ? 0 : -100]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, disableHeroMobileAnimations ? 1 : 0.3]);
  const logoYTransform = useTransform(scrollY, [0, 500], [0, (prefersReduced || disableHeroMobileAnimations) ? 0 : 20]);

  const tags = [
    "AI Agents",
    "Web Apps",
    "Mobile Apps",
    "Interactive Media"
  ];

  // Get appropriate animation variants for Hero (allows animations on mobile)
  const getHeroAnimationVariants = () => {
    if (typeof window !== 'undefined' && shouldDisableHeroMobileAnimations()) {
      return {
        container: { hidden: { opacity: 1 }, visible: { opacity: 1 } },
        slideUp: { hidden: { opacity: 1, y: 0, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } },
        slideLeft: { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } },
        slideRight: { hidden: { opacity: 1, x: 0 }, visible: { opacity: 1, x: 0 } },
        fadeIn: { hidden: { opacity: 1 }, visible: { opacity: 1 } },
        scaleIn: { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } },
        title: { hidden: { opacity: 1, y: 0, scale: 1 }, visible: { opacity: 1, y: 0, scale: 1 } }
      };
    }
    return STANDARD_VARIANTS;
  };
  
  const animationVariants = getHeroAnimationVariants();
  const containerVariants: Variants = animationVariants.container;
  
  // Custom motion config for Hero (allows animations on mobile)
  const getHeroMotionConfig = () => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check if Hero mobile animations should be disabled (only for very low-end devices)
    const disableHeroMobileAnimations = typeof window !== 'undefined' && shouldDisableHeroMobileAnimations();
    
    if (prefersReducedMotion || disableHeroMobileAnimations) {
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

  // Get Safari-specific classes for mobile fixes
  const isSafariMobileDevice = isSafariMobile();
  const safariClasses = isSafariMobileDevice ? 'safari-mobile-hero-fix safari-mobile-viewport' : '';
  const safariTextClasses = isSafariMobileDevice ? 'safari-mobile-text-fix' : '';

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className={`h-[calc(100vh-200px)] sm:h-[calc(100vh-130px)] bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative overflow-hidden ${safariClasses}`}
    >
      <motion.div 
        className="absolute inset-0 -top-10 flex items-center justify-center pointer-events-none"
        style={{ y: logoYTransform }}
        aria-hidden="true"
      >
        <AnimatedLogo className="h-[60vh] w-auto" />
      </motion.div>
      
      <div ref={scrollRef} className="absolute inset-0" />
      
      <motion.div 
        className="w-full max-w-5xl mx-auto text-left sm:text-center relative z-10"
        variants={containerVariants}
        {...getHeroMotionConfig()}
        style={{ 
          y: disableHeroMobileAnimations ? 0 : yTransform, 
          opacity: disableHeroMobileAnimations ? 1 : opacityTransform 
        }}
      >
        <motion.h1 
          className={`text-5xl xs:text-4xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl font-medium text-gray-900 mb-4 sm:mb-6 leading-tight px-2 relative overflow-hidden ${safariTextClasses}`}
          variants={STANDARD_VARIANTS.title}
        >
          <span className="relative inline-block font-medium">
            Software solutions for people{" "}
            <span className="block sm:inline">who hate complicated stuff</span>
            {/* <RollingText 
              text="Software solutions for people "
              className="inline"
              transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
            /> */}
            {/* <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></span> */}
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto px-4 sm:px-2 text-left sm:text-center"
          variants={STANDARD_VARIANTS.slideUp}
        >
          No buzzwords, no fluff.  Just digital perfection, <br />  
          or as close to it as we can get.
        </motion.p>
        
        <motion.div 
          className="mb-6 sm:mb-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-start sm:justify-center items-center px-4"
          variants={STANDARD_VARIANTS.container}
        >
          {tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="inline-block border border-black text-black px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-normal"
              variants={STANDARD_VARIANTS.scaleIn}
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
