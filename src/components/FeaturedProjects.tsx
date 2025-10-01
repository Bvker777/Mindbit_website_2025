"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import {
  useScrollAnimation,
  useParallaxScroll,
  STANDARD_VARIANTS,
  getMotionConfig,
} from "@/lib/use-scroll-animation";

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

interface Project {
  title: string;
  description: string;
  images: string[];
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isCardInView, setIsCardInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Define different velocities for each card to create varied parallax effects
  const velocities = [-0.1, 0.15, -0.08, 0.12]; // Alternating positive/negative for variety
  const velocity = velocities[index] || 0.1;
  const parallaxY = useParallaxScroll(velocity, cardRef);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        setIsCardInView(entry.isIntersecting);
      },
      { 
        threshold: 0.2, // Trigger when 20% of the card is visible
        rootMargin: "0px 0px -50px 0px" // Start animation slightly before card is fully in view
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

  useEffect(() => {
    let interval: NodeJS.Timeout;

    // On mobile: loop when in view, on desktop: loop when hovered
    const shouldLoop = isMobile ? isInView : isHovered;

    if (shouldLoop && project.images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % project.images.length
        );
      }, 800); // Change image every 800ms
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, isInView, isMobile, project.images.length]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Only reset to first image on desktop when not hovering
    if (!isMobile) {
      setCurrentImageIndex(0);
    }
  };

  const cardVariants: Variants = {
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
      className={`rounded-lg ${
        index === 1 ? "lg:mt-[50%]" : index === 2 ? "lg:-mt-[50%]" : ""
      }`}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      variants={cardVariants}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      style={{ transform: `translateY(${parallaxY}px)` }}
      whileHover={{
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="aspect-square rounded-2xl sm:rounded-3xl lg:rounded-4xl mb-4 overflow-hidden relative">
        <Image
          src={project.images[currentImageIndex]}
          alt={`${project.title} project screenshot ${currentImageIndex + 1} of ${project.images.length}`}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
        {project.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {project.images.map((_, imgIndex) => (
              <div
                key={imgIndex}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  imgIndex === currentImageIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <h3 className="text-[1.5em] sm:text-[1.7em] font-normal text-white mb-2">
        {project.title}
      </h3>
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
        {project.description}
      </p>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  // Relaxed viewport detection so section reliably becomes visible on mobile
  const { ref, isInView } = useScrollAnimation({ margin: "0px 0px -10% 0px", amount: 0.1 });

  const projects = [
    {
      title: "Baibyl Khasi Bible App",
      description:
        "Mobile application for bike rental service with integrated payment system and real-time tracking capabilities.",
      images: [
        "/khasiBible.png",
        "/KhasiBibleAppDarkMode.png",
        "/KhasiBibleAppDarkMode2.png",
        "/khasiBibleHighlights.png",
      ], // Multiple images
    },
    {
      title: "Shi Kyntien Educational Game",
      description:
        "An immersive mobile game teaching the Khasi language through fun challenges and interactive quizzes. Designed to boost cultural pride and language skills among kids with colorful graphics and reward-based progression.",
      images: ["/birdOrigami.png"], // Multiple images
    },
    {
      title: "7 Sisters Cookbook App & Website",
      description:
        "A recipe app celebrating Northeast India's culinary heritage. Includes step-by-step cooking guides, instructional videos, and regional ingredient glossaries—perfect for food lovers and home chefs.",
      images: ["/7sistersKitchenWhite.png", "/7sistersKitchenLaptop.png"], // Multiple images
    },
    {
      title: "Admission Portal ",
      description:
        "A streamlined web portal for Union Christian College admissions. Simplifies application submissions, status tracking, and document uploads, reducing wait times and administrative overhead.",
      images: ["/uccAdmin.png", "/uccHome.png"], // Multiple images
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-50 bg-black"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 sm:mb-12 font-medium"
          variants={STANDARD_VARIANTS.title}
          {...getMotionConfig()}
          animate={isInView ? "visible" : "hidden"}
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
