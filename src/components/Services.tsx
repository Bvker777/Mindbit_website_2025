"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  useScrollAnimation,
  getMotionConfig,
  getAnimationVariants,
} from "@/lib/use-scroll-animation";
import { shouldDisableMobileAnimations } from "@/lib/performance-utils";

interface Service {
  title: string;
  description: string;
  image: string;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isCardInView, setIsCardInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Check if mobile animations should be disabled
  const disableMobileAnimations = shouldDisableMobileAnimations();

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCardInView(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% of the card is visible
        rootMargin: "0px 0px -50px 0px", // Start animation slightly before card is fully in view
      }
    );

    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }

    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
    };
  }, []);

  // Get appropriate animation variants
  const animationVariants = getAnimationVariants();
  const serviceCardVariants: Variants = disableMobileAnimations ? animationVariants.slideUp : {
    hidden: {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1, // Small delay for smooth entrance
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      key={index}
      variants={serviceCardVariants}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      whileHover={disableMobileAnimations ? {} : {
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      }}
      className="cursor-pointer"
    >
      <motion.div
        className="aspect-square rounded-2xl sm:rounded-3xl lg:rounded-4xl mb-4 overflow-hidden"
        whileHover={disableMobileAnimations ? {} : {
          scale: 0.95,
          rotateY: 5,
          transition: { duration: 0.3 },
        }}
      >
        <Image
          src={service.image}
          alt={`${service.title} service illustration`}
          width={400}
          height={400}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <motion.h3
        className="text-[1.5em] sm:text-[1.7em] font-normal text-black mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {service.title}
      </motion.h3>
      <motion.p
        className="text-gray-600 text-sm sm:text-base leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {service.description}
      </motion.p>
    </motion.div>
  );
}

export default function Services() {
  // Relaxed viewport detection so section reliably becomes visible on mobile
  const { ref, isInView } = useScrollAnimation({
    margin: "0px 0px -10% 0px",
    amount: 0.1,
  });

  const services = [
    {
      title: "Custom Websites & Apps + AI Integration",
      description:
        "Clean, responsive websites and mobile apps that bring users closer to your brand. A happy user is a loyal one.",
      image: "/images/projects/webAppService.png", // Replace with your actual service image
    },
    {
      title: "Interactive Gamified Experiences",
      description:
        "Learning made simple, simply makes learning fun. From quizzes to full-blown mini-games, we keep users hooked (for all the right reasons).",
      image: "/images/ui/birdOrigami.png", // Replace with your actual service image
    },
    {
      title: "UI/UX Design",
      description:
        "Emotional Design principles for interfaces that look stunning and feel intuitive. If it looks good and works well, it feels good and was probably built by us.",
      image: "/images/services/uiux1.png", // Replace with your actual service image
    },
  ];

  // Grid container - no staggered animation since cards animate individually
  const gridVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section
      id="services"
      className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-50 bg-white"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8 sm:mb-12 font-medium"
          variants={getAnimationVariants().title}
          {...getMotionConfig()}
          animate={isInView ? "visible" : "hidden"}
        >
          Our Services
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"
          variants={gridVariants}
          {...getMotionConfig()}
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
