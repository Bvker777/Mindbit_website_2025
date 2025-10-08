"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "@/lib/animations";
import { getSafariOptimizedClasses, isSafari } from "@/lib/safari-utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when at top of page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Hide when scrolling down, show when scrolling up
      else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlHeader);
    
    return () => {
      window.removeEventListener('scroll', controlHeader);
    };
  }, [lastScrollY]);

  const navItems = [
    { href: "#home", label: "Home", ariaLabel: "Navigate to home section" },
    { href: "#about", label: "About Us", ariaLabel: "Navigate to about us section" },
    { href: "#portfolio", label: "Portfolio", ariaLabel: "Navigate to portfolio section" },
    { href: "#services", label: "Services", ariaLabel: "Navigate to services section" },
    // { href: "#team", label: "Team", ariaLabel: "Navigate to team section" },
    { href: "#contact", label: "Contact Us", ariaLabel: "Navigate to contact section" }
  ];

  // Animation variants
  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const logoVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };


  const handleNavClick = () => {
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  // Get Safari-specific optimized classes
  const safariClasses = isSafari() ? getSafariOptimizedClasses().join(' ') : '';

  return (
    <motion.header 
      className={`sticky top-0 w-full z-[9999] bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-transform duration-300 ease-in-out ${safariClasses} ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div className="flex items-center" variants={logoVariants}>
            <Link href="/" className="flex items-center -mt-2">
              <Image
                src="/logos/minbit_logo.svg"
                alt="MindBit Logo"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
                sizes="(max-width: 768px) 120px, 120px"
              />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                onClick={handleNavClick}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
                aria-label={item.ariaLabel}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span className="sr-only">{isMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
