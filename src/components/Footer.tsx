"use client";
import React from "react";
import { motion } from "framer-motion";
import { useScrollAnimation, STANDARD_VARIANTS, getMotionConfig } from "@/lib/use-scroll-animation";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "lucide-react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Services",
    links: [
      { title: "Custom Websites & Apps", href: "#services" },
      { title: "AI Integration", href: "#services" },
      { title: "UI/UX Design", href: "#services" },
      { title: "Gamified Experiences", href: "#services" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "About Us", href: "#about" },
      { title: "Our Team", href: "#team" },
      { title: "Portfolio", href: "#portfolio" },
      { title: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Get Started", href: "#contact" },
      { title: "Case Studies", href: "#portfolio" },
      { title: "Why Choose Us", href: "#about" },
      { title: "Free Consultation", href: "#contact" },
    ],
  },
  {
    label: "Connect",
    links: [
      { title: "Facebook", href: "#", icon: FacebookIcon },
      { title: "Instagram", href: "#", icon: InstagramIcon },
      { title: "Youtube", href: "#", icon: YoutubeIcon },
      { title: "LinkedIn", href: "#", icon: LinkedinIcon },
    ],
  },
];

export function Footer() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <div>
      <footer className="relative w-full flex flex-col items-center justify-center bg-gray-950 border-t border-gray-800 py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-50" ref={ref}>
        <div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

        <motion.div 
          className="w-full max-w-7xl mx-auto"
          variants={STANDARD_VARIANTS.container}
          {...getMotionConfig()}
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="grid w-full gap-8 lg:grid-cols-3 lg:gap-12">
            <motion.div 
              className="space-y-4"
              variants={STANDARD_VARIANTS.slideLeft}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white tracking-wider">
                Mindbit Solutions
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:col-span-2 lg:mt-0">
              {footerLinks.map((section) => (
                <motion.div 
                  key={section.label}
                  variants={STANDARD_VARIANTS.slideUp}
                  className="mb-6 sm:mb-8 lg:mb-0"
                >
                  <h3 className="text-xs font-semibold text-white mb-4">{section.label}</h3>
                  <ul className="text-gray-400 space-y-2 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          className="hover:text-white inline-flex items-center transition-all duration-300"
                        >
                          {link.icon && <link.icon className="me-1 size-4" />}
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </footer>
      <div className="flex justify-center items-center bg-black text-white py-6">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} MindBit Solutions LLP. All rights reserved.
        </p>
      </div>
    </div>
  );
}

