"use client";

import { DottedSurface } from "@/components/ui/dotted-surface";
import { Magnetic } from "@/components/ui/magnetic";
import Link from "next/link";
import { motion, useScrollAnimation, STANDARD_VARIANTS, getMotionConfig } from "@/lib/animations";
import { getSafariOptimizedClasses, isSafari } from "@/lib/safari-utils";

export default function CTA() {
  const { ref, isInView } = useScrollAnimation();
  
  // Get Safari-specific optimized classes
  const safariClasses = isSafari() ? getSafariOptimizedClasses().join(' ') : '';

  return (
    <section
      id="contact"
      className={`h-screen relative flex justify-center items-center py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-50 bg-black overflow-hidden ${safariClasses}`}
      ref={ref}
    >
      <DottedSurface />
      <motion.div
        className="relative z-10 text-center"
        variants={STANDARD_VARIANTS.container}
        {...getMotionConfig()}
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h3
          className="mt-4 sm:mt-6 pb-1 text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight font-medium"
          variants={STANDARD_VARIANTS.slideUp}
        >
          Have an idea?
        </motion.h3>
        <motion.p
          className="mb-4 sm:mb-6 text-white text-sm sm:text-base"
          variants={STANDARD_VARIANTS.slideUp}
        >
          Feel free to reach out to us!
        </motion.p>
        <motion.div variants={STANDARD_VARIANTS.scaleIn}>
          <Magnetic
            strength={0.6}
            range={150}
            springOptions={{
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
            onlyOnHover={true}
            disableOnTouch={true}
          >
            <Link href="mailto:info@mindbitsolution.com" target="_blank">
              <button className={`cursor-pointer border-1 bg-teal-400 text-slate-800 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium transition-all text-2xl sm:text-md btn-basic ${isSafari() ? 'btn-safari-optimized' : ''}`}>
                Let&apos;s Talk
              </button>
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
