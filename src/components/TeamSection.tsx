"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { shouldDisableMobileAnimations } from "@/lib/performance-utils";
import { Linkedin } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}

function TeamMemberCard({ member, index }: { member: TeamMember & { linkedin: string }; index: number }) {
  const [isCardInView, setIsCardInView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const disableMobileAnimations = shouldDisableMobileAnimations();

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

  const memberCardVariants: Variants = disableMobileAnimations ? {
    hidden: { opacity: 1, y: 0, scale: 1 },
    visible: { opacity: 1, y: 0, scale: 1 }
  } : {
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
    <Link 
      href={member.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`LinkedIn profile of ${member.name}`}
      className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
    >
      <motion.div 
        ref={cardRef}
        key={index} 
        className="text-center border border-gray-200 rounded-2xl p-2 sm:p-5 cursor-pointer"
        variants={memberCardVariants}
        initial={disableMobileAnimations ? "visible" : "hidden"}
        animate={isCardInView ? "visible" : "hidden"}
        whileHover={disableMobileAnimations ? {} : { 
          transition: { duration: 0.3 }
        }}
      >
        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
        <motion.div 
          className="shrink-0 overflow-hidden rounded-full border border-gray-200"
          initial={disableMobileAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          animate={isCardInView ? { opacity: 1, scale: 1 } : (disableMobileAnimations ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 })}
          transition={disableMobileAnimations ? { duration: 0 } : { delay: 0.15, duration: 0.5 }}
        >
          <Image
            src={member.image}
            alt={`${member.name}, ${member.role} at MindBit Solutions`}
            width={56}
            height={56}
            className="h-14 w-14 object-cover"
            loading="lazy"
          />
        </motion.div>
        <div className="text-left">
          <motion.h3 
            className="text-base sm:text-[1rem] font-medium text-gray-900 mb-1"
            initial={disableMobileAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={isCardInView ? { opacity: 1, y: 0 } : (disableMobileAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 })}
            transition={disableMobileAnimations ? { duration: 0 } : { delay: 0.2, duration: 0.6 }}
          >
            {member.name}
          </motion.h3>
          <motion.div 
            className="flex items-center gap-2"
            initial={disableMobileAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={isCardInView ? { opacity: 1, y: 0 } : (disableMobileAnimations ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 })}
            transition={disableMobileAnimations ? { duration: 0 } : { delay: 0.25, duration: 0.6 }}
          >
            <span className="inline-block text-gray-700 border border-gray-300 px-2 py-0.5 text-xs font-medium rounded-md">
              Co founder
            </span>
            <span className="inline-flex items-center justify-center text-slate-400 group-hover:text-teal-500 transition-colors">
              <Linkedin className="w-4 h-4" />
            </span>
          </motion.div>
        </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function Team() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const teamMembers = [
    {
      name: "Lambert Shadap",
      role: "Co-Founder",
      description: "25+ years in IT consultancy across banking, gaming, and consumer tech.",
      image: "/images/team/Lambert.png",
      linkedin: "https://www.linkedin.com/in/lambertshadap/"
    },
    {
      name: "Ynaiborlang Nongkynrih",
      role: "Co-Founder",
      description: "7+ years building web and mobile solutions; AI Engineer; Interactive Media Expert ",
      image: "/images/team/Aibor.png",
      linkedin: "https://www.linkedin.com/in/aibor-nongkynrih-733802385/"
    },
    {
      name: "Bakerlang L Nonglait",
      role: "Co-Founder",
      description: "5+ years as a creative web developer and design engineer, specializing in user-centered UI/UX and emotional design experiences",
      image: "/images/team/Baker.png",
      linkedin: "https://www.linkedin.com/in/bakerlang-l-nonglait-88a693196/"
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
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-8 sm:mb-8 md:mb-12 lg:mb-16 text-center font-medium"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Meet the Team
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left column: intro paragraph */}
          <motion.div 
            className="order-1 lg:order-1"
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <p className="mx-auto lg:mx-0 mb-2 max-w-3xl text-base sm:text-lg md:text-xl text-gray-700 font-normal text-center lg:text-left">
              The Mindbit Team comprises a group of tech enthusiasts whose experience spans Product Development, Strategic Management, Agile Methodologies, Business Development, and Risk Management. Every member brings a genuine excitement for new technologies and creative ideas, in addition to their individual areas of expertise.
            </p>
          </motion.div>

          {/* Right column: team grid */}
          <motion.div 
            className="order-2 lg:order-2 grid gap-6 sm:gap-8 lg:gap-5 w-full h-full"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member as TeamMember & { linkedin: string }} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
