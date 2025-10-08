"use client";
import React, { memo } from "react";
import { motion } from "@/lib/animations";
import {
  useScrollAnimation,
  STANDARD_VARIANTS,
  getMotionConfig,
} from "@/lib/animations";
// Social media icons removed - not currently used

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
  // {
  //   label: "Connect",
  //   links: [
  //     { title: "Facebook", href: "#", icon: FacebookIcon },
  //     { title: "Instagram", href: "#", icon: InstagramIcon },
  //     { title: "Youtube", href: "#", icon: YoutubeIcon },
  //     { title: "LinkedIn", href: "#", icon: LinkedinIcon },
  //   ],
  // },
];

export const Footer = memo(function Footer() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <footer
      id="contact"
      className=" bg-black"
      ref={ref}
    >
      <motion.div
        className="w-full max-w-7xl mx-auto"
        variants={STANDARD_VARIANTS.container}
        {...getMotionConfig()}
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="py-20 sm:py-20 lg:py-20 px-4 sm:px-6 lg:px-8 xl:px-40 grid w-full gap-8 lg:grid-cols-3 lg:gap-12">
          <motion.div
            className="space-y-4"
            variants={STANDARD_VARIANTS.slideLeft}
          >
            <div className="flex items-center">
              <svg
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 184.5 51.91"
                className="h-8 sm:h-10 lg:h-12 w-auto"
              >
                <defs>
                  <style>
                    {`.cls-1 { fill: #fff; }
                     .cls-2 { fill: #51bd9b; }`}
                  </style>
                </defs>
                <polygon
                  className="cls-1"
                  points="37.78 18.32 37.78 51.91 29.65 51.91 29.65 30.81 22.43 51.91 15.4 51.91 8.13 30.76 8.13 51.91 0 51.91 0 18.32 9.93 18.32 19.01 41.55 27.89 18.32 37.78 18.32"
                />
                <rect
                  className="cls-1"
                  x="40.86"
                  y="18.32"
                  width="8.12"
                  height="33.59"
                />
                <polygon
                  className="cls-1"
                  points="81.92 51.91 73.79 51.91 60.2 31.29 60.2 51.91 52.08 51.91 52.08 18.32 60.2 18.32 73.79 39.13 73.79 18.32 81.92 18.32 81.92 51.91"
                />
                <path
                  className="cls-1"
                  d="M113.11,43.81c-1.41,2.55-3.44,4.54-6.08,5.96-2.64,1.42-5.76,2.14-9.34,2.14h-12.69V18.32h12.69c3.61,0,6.73,.7,9.36,2.09,2.63,1.39,4.65,3.36,6.06,5.89,1.41,2.53,2.11,5.45,2.11,8.74s-.71,6.22-2.11,8.77m-8.74-1.69c1.76-1.68,2.64-4.04,2.64-7.08s-.88-5.4-2.64-7.08c-1.76-1.68-4.22-2.52-7.39-2.52h-3.85v19.2h3.85c3.17,0,5.63-.84,7.39-2.52"
                />
                <path
                  className="cls-1"
                  d="M142.66,37.56c1.19,1.49,1.78,3.22,1.78,5.18,0,2.88-.96,5.13-2.87,6.75-1.92,1.62-4.66,2.42-8.24,2.42h-15.63V18.32h15.25c3.42,0,6.07,.74,7.94,2.23,1.87,1.49,2.8,3.61,2.8,6.37,0,2.03-.54,3.71-1.62,5.06-1.08,1.35-2.49,2.23-4.23,2.64,2.03,.47,3.63,1.46,4.82,2.95m-16.84-5.51h5.32c2.82,0,4.23-1.2,4.23-3.61s-1.44-3.61-4.32-3.61h-5.23v7.22Zm10.31,9.55c0-1.2-.4-2.15-1.19-2.83-.79-.68-1.92-1.02-3.37-1.02h-5.75v7.55h5.8c3.01,0,4.51-1.23,4.51-3.71"
                />
                <rect
                  className="cls-1"
                  x="147.2"
                  y="18.32"
                  width="8.12"
                  height="33.59"
                />
                <polygon
                  className="cls-1"
                  points="184.5 18.32 184.5 24.78 175.38 24.78 175.38 51.91 167.2 51.91 167.2 24.78 158.17 24.78 158.17 18.32 184.5 18.32"
                />
                <path
                  className="cls-2"
                  d="M44.86,.77c-4.12,0-7.46,3.34-7.46,7.46s3.34,7.46,7.46,7.46,7.46-3.34,7.46-7.46-3.34-7.46-7.46-7.46m0,10.8c-1.85,0-3.34-1.5-3.34-3.34s1.49-3.34,3.34-3.34,3.34,1.49,3.34,3.34-1.5,3.34-3.34,3.34"
                />
                <path
                  className="cls-2"
                  d="M53.26,.27V3.91c0,.27-.36,.37-.5,.14-.84-1.47-2.06-2.7-3.53-3.55-.24-.14-.13-.5,.14-.5h3.62c.15,0,.27,.12,.27,.27"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Building digital solutions that actually make sense - from AI
              Agents to custom apps that work perfectly for your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:col-span-2 lg:mt-0">
            {footerLinks.map((section) => (
              <motion.div
                key={section.label}
                variants={STANDARD_VARIANTS.slideUp}
                className="mb-6 sm:mb-8 lg:mb-0"
              >
                <h3 className="text-2xl font-semibold text-white mb-4 ">
                  {section.label}
                </h3>
                <ul className="text-gray-400 space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                        <a
                          href={link.href}
                          className="hover:text-white hover:border-white hover:translate-x-1 inline-flex items-center transition-all duration-300"
                        >
                        {link.icon && <link.icon className="me-2 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="  border-t border-gray-600"
          variants={STANDARD_VARIANTS.slideUp}
        >
          <p className="text-gray-300 text-sm text-center py-5">
            © {new Date().getFullYear()} MindBit Solutions LLP. All rights
            reserved.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
});
