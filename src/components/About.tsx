"use client";

import Image from "next/image";
import { motion, useScrollAnimation, getMotionConfig, getAnimationVariants, shouldDisableMobileAnimations, type Variants } from "@/lib/animations";

export default function About() {
  const { ref, isInView } = useScrollAnimation();
  
  // Check if mobile animations should be disabled
  const disableMobileAnimations = shouldDisableMobileAnimations();
  
  // Get appropriate animation variants
  const animationVariants = getAnimationVariants();

  // Enhanced text animation variants
  const textVariants: Variants = disableMobileAnimations ? animationVariants.slideUp : {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section
      id="about"
      className="flex items-center justify-center pb-20 sm:pb-32 lg:pb-40 px-4 sm:px-6 lg:px-8 xl:px-50 bg-white"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8 sm:gap-10 lg:gap-12 items-center"
          variants={animationVariants.container}
          {...getMotionConfig()}
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square rounded-3xl lg:rounded-4xl overflow-hidden relative mx-auto"
            variants={animationVariants.slideLeft}
            whileHover={disableMobileAnimations ? {} : {
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src="/images/ui/birdOrigami.webp"
              alt="About MindBit Solutions"
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div variants={animationVariants.slideRight}>
            <motion.p
              className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed"
              variants={textVariants}
            >
              Since launching in 2025, our Team has helped businesses navigate
              the digital super-highway by carving their own path and making it
              a better one.
            </motion.p>
            <motion.p
              className="text-base sm:text-lg text-gray-700 leading-relaxed"
              variants={textVariants}
            >
              From AI Agents to custom apps, we build super software with no
              compromises. Mindbit delivers original solutions made exactly as
              imagined—no templates, no baggage.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
