"use client";

import { WavePath } from '@/components/ui/wave-path';
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

// Individual feature item component with its own viewport detection
function FeatureItem({ feature, index }: { feature: { title: string; description: string }; index: number }) {
  const featureRef = useRef(null);
  const isFeatureInView = useInView(featureRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={featureRef}
      className={`${index < 4 ? 'pb-6 sm:pb-8' : ''}`}
      initial={{ opacity: 0, y: 60, x: -30 }}
      animate={isFeatureInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 60, x: -30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Interactive Wave Path for visual appeal */}
      <motion.div 
        className=" sm:mb-2 lg:mb-2 w-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isFeatureInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.6 }}
      >
        <WavePath 
          className="text-white w-full" 
          animateOnScroll={true}
          animationDuration={1500}
          animationDelay={200}
        />
      </motion.div>
      
      <motion.div 
        className='grid grid-cols-1 lg:grid-cols-[1fr_2fr]'
        initial={{ opacity: 0 }}
        animate={isFeatureInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <motion.h4 
          className="text-[1.5em] sm:text-[1.7em] font-normal text-white mb-1 sm:mb-3 lg:mb-0 text-left"
          initial={{ opacity: 0, x: -20 }}
          animate={isFeatureInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {feature.title}
        </motion.h4>
        <motion.p 
          className="text-slate-300 text-sm sm:text-base leading-relaxed text-left"
          initial={{ opacity: 0, x: 20 }}
          animate={isFeatureInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {feature.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      title: "Value-Driven Pricing",
      description: "Premium-quality software without the premium price tag. We optimize every project for maximum ROI, so you get top-tier solutions that fit your budget."
    },
    {
      title: "Rapid Delivery",
      description: "From kickoff to launch faster than you’d expect. We leverage agile processes and decades of collective experience to accelerate your time to market."
    },
    {
      title: "End-to-End Support",
      description: "Our commitment doesn’t end at launch. We provide ongoing maintenance, upgrades, and training so your software keeps evolving with your business."
    },
    {
      title: "Clear Communication",
      description: "No tech jargon or confusing acronyms—just straightforward updates and honest timelines at every stage of development."
    },
    {
      title: "Talent That Cares",
      description: "Beyond code and design, our team brings genuine passion for your success—combining technical skill with creative problem-solving to deliver software you’ll love."
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

  return (
    <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 xl:px-50 bg-black m-5 rounded-4xl" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-8 sm:mb-12 text-left font-medium"
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Why Choose Us
        </motion.h2>
        
        <div className="space-y-13 sm:space-y-15 lg:space-y-20 mt-12 sm:mt-16 lg:mt-20">
          {features.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
