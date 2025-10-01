"use client";

import Image from 'next/image';
import { motion, useInView, Variants, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

function TeamMemberCard({ member, index }: { member: TeamMember; index: number }) {
  const [isCardInView, setIsCardInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();
  
  // Different parallax velocities for each team member
  const velocities = [0.12, -0.08, 0.15];
  const velocity = velocities[index] || 0.1;
  const parallaxY = useTransform(scrollY, [0, 1000], [0, prefersReduced ? 0 : velocity * 80]);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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

  const memberCardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.1, // Small delay for smooth entrance
      }
    }
  };

  return (
    <motion.div 
      ref={cardRef}
      key={index} 
      className="text-center"
      variants={memberCardVariants}
      initial="hidden"
      animate={isCardInView ? "visible" : "hidden"}
      style={{ y: parallaxY }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <motion.div 
        className="w-full max-w-xs mx-auto mb-4 overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role} at MindBit Solutions`}
          width={300}
          height={300}
          className="w-full h-full object-cover aspect-square"
          loading="lazy"
        />
      </motion.div>
      <motion.h3 
        className="text-[1.4em] font-normal text-gray-900 mb-1"
        initial={{ opacity: 0, y: 20 }}
        animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {member.name}
      </motion.h3>
      <motion.p 
        className="text-gray-600 text-xl mb-2 font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        {member.role}
      </motion.p>
      <motion.p 
        className="text-gray-600 text-sm sm:text-base leading-relaxed px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {member.description}
      </motion.p>
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();
  
  // Subtle parallax for the title
  const titleYTransform = useTransform(scrollY, [0, 1000], [0, prefersReduced ? 0 : -20]);

  const teamMembers = [
    {
      name: "Lambert Shadap",
      role: "Co-Founder",
      description: "25+ years in IT consultancy across banking, gaming, and consumer tech.",
      image: "/Lambert.png" // Replace with actual team member photo
    },
    {
      name: "Ynaiborlang Nongkynrih",
      role: "Co-Founder",
      description: "7+ years building web and mobile solutions; AI Engineer; Interactive Media Expert ",
      image: "/Aibor.png" // Replace with actual team member photo
    },
    {
      name: "Bakerlang L Nonglait",
      role: "Co-Founder",
      description: "5+ years as a creative web developer and design engineer, specializing in user-centered UI/UX and emotional design experiences",
      image: "/Baker.png" // Replace with actual team member photo
    }
  ];

  const titleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Grid container - no staggered animation since cards animate individually
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      }
    }
  };

  return (
    <section id="team" className="min-h-screen py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-50 bg-white flex items-center justify-center" ref={ref}>
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-12 sm:mb-15 md:mb-15 lg:mb-20 text-center font-medium"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ y: titleYTransform }}
        >
          Meet the Team
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 w-full"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
