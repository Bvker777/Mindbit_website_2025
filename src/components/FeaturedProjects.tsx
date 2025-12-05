"use client";

import Image from "next/image";
import { useState, useEffect, useRef, Suspense, memo } from "react";
import { motion, useScrollAnimation, useParallaxScroll, getMotionConfig, getAnimationVariants, shouldDisableMobileAnimations, type Variants } from "@/lib/animations";

// Loading component for FeaturedProjects
const FeaturedProjectsLoading = () => (
  <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-50 bg-black m-5 rounded-4xl">
    <div className="max-w-7xl mx-auto">
      <div className="h-16 bg-gray-800 rounded-lg mb-8 animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-square bg-gray-800 rounded-2xl animate-pulse"></div>
            <div className="h-6 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

interface Project {
  title: string;
  description: string;
  images: string[];
}

const ProjectCard = memo(function ProjectCard({ project, index }: { project: Project; index: number }) {
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
  
  // Check if mobile animations should be disabled
  const disableMobileAnimations = shouldDisableMobileAnimations();

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
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

  // Get appropriate animation variants
  const animationVariants = getAnimationVariants();
  const cardVariants: Variants = disableMobileAnimations ? animationVariants.slideUp : {
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
      initial={disableMobileAnimations ? "visible" : "hidden"}
      animate={isCardInView ? "visible" : "hidden"}
      style={{ transform: disableMobileAnimations ? 'none' : `translateY(${parallaxY}px)` }}
      whileHover={disableMobileAnimations ? {} : {
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        transition: { duration: 0.3 },
      }}
    >
      <motion.div 
        className="aspect-square rounded-2xl sm:rounded-3xl lg:rounded-4xl mb-4 overflow-hidden relative"
        whileHover={disableMobileAnimations ? {} : { scale: 0.95 }}
        transition={disableMobileAnimations ? {} : { duration: 0.3 }}
      >
        <Image
          src={project.images[currentImageIndex]}
          alt={`${project.title} project screenshot ${
            currentImageIndex + 1
          } of ${project.images.length}`}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
      </motion.div>
      <h3 className="text-[1.5em] sm:text-[1.7em] font-normal text-white mb-2">
        {project.title}
      </h3>
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
        {project.description}
      </p>
    </motion.div>
  );
});

function FeaturedProjectsContent() {
  // Relaxed viewport detection so section reliably becomes visible on mobile
  const { ref, isInView } = useScrollAnimation({
    margin: "0px 0px -10% 0px",
    amount: 0.1,
  });

  const projects = [
    {
      title: "Baibyl Khasi Bible App",
      description:
        "A comprehensive mobile Bible application in the Khasi language, providing easy access to scripture with features like verse search, bookmarks, highlights, and reading plans. Designed to support the Khasi-speaking Christian community with an intuitive interface and offline reading capabilities.",
      images: [
        "/images/projects/khasiBible.webp",
        "/images/projects/khasiBibleHighlights.webp",
      ], // Multiple images
    },
    {
      title: "Shi Kyntien Mobile Game",
      description:
        "An immersive mobile game teaching the Khasi language through fun challenges and interactive quizzes. Designed to boost cultural pride and language skills among kids with colorful graphics and reward-based progression.",
      images: ["/images/projects/shikyntien_1.webp", "/images/projects/shikyntien_2.webp", "/images/projects/shikyntien_3.webp"], // Multiple images
    },
    {
      title: "7 Sisters Cookbook App & Website",
      description:
        "A recipe app celebrating Northeast India's culinary heritage. Includes step-by-step cooking guides, instructional videos, and regional ingredient glossaries—perfect for food lovers and home chefs.",
      images: [
        "/images/projects/7sistersKitchenWhite.webp",
        "/images/projects/7sistersKitchenLaptop.webp",
      ], // Multiple images
    },
    {
      title: "Admission Portal ",
      description:
        "A streamlined web portal for Union Christian College admissions. Simplifies application submissions, status tracking, and document uploads, reducing wait times and administrative overhead.",
      images: ["/images/projects/uccAdmin.webp", "/images/projects/uccHome.webp"], // Multiple images
    },
  ];

  return (
    <section
      id="portfolio"
      className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-50 bg-black m-5 rounded-4xl"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 sm:mb-12 font-medium"
          variants={getAnimationVariants().title}
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

export default function FeaturedProjects() {
  return (
    <Suspense fallback={<FeaturedProjectsLoading />}>
      <FeaturedProjectsContent />
    </Suspense>
  );
}
