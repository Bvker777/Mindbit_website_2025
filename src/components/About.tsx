"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  useScrollAnimation,
  STANDARD_VARIANTS,
  getMotionConfig,
} from "@/lib/use-scroll-animation";

export default function About() {
  const { ref, isInView } = useScrollAnimation();

  // Enhanced text animation variants
  const textVariants: Variants = {
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
          variants={STANDARD_VARIANTS.container}
          {...getMotionConfig()}
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-square rounded-3xl lg:rounded-4xl overflow-hidden relative mx-auto"
            variants={STANDARD_VARIANTS.slideLeft}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
          >
            <Image
              src="/images/ui/birdOrigami.png"
              alt="About MindBit Solutions"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            variants={STANDARD_VARIANTS.slideRight}
          >
            <motion.p
              className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed"
              variants={textVariants}
            >
              Since launching in 2025, MindBit Solutions has helped businesses
              discover standout software—crafting memorable websites and digital
              products that fit perfectly.
            </motion.p>
            <motion.p
              className="text-base sm:text-lg text-gray-700 leading-relaxed"
              variants={textVariants}
            >
              Every project is built without shortcuts or compromises. Backed by
              years of diverse experience, our team delivers original solutions
              made exactly as imagined—no templates, no simplifications.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
