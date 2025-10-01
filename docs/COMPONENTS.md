# Component Documentation

This document provides detailed documentation for all components in the MindBit Solutions website.

## 📁 Component Overview

### Main Components
- [Header](#header-component)
- [Hero](#hero-component)
- [About](#about-component)
- [FeaturedProjects](#featuredprojects-component)
- [Services](#services-component)
- [WhyChooseUs](#whychooseus-component)
- [TeamSection](#teamsection-component)
- [CTA](#cta-component)
- [Footer](#footer-component)

### UI Components
- [AnimatedLogo](#animatedlogo-component)
- [DottedSurface](#dottedsurface-component)
- [WavePath](#wavepath-component)
- [Highlighter](#highlighter-component)

---

## Header Component

**File**: `src/components/Header.tsx`

### Description
Responsive navigation header with sticky behavior, mobile menu, and smooth animations.

### Features
- **Sticky Navigation**: Auto-hides on scroll down, shows on scroll up
- **Mobile Menu**: Collapsible hamburger menu for mobile devices
- **Accessibility**: Full ARIA support and keyboard navigation
- **Animations**: Smooth transitions with Framer Motion

### Props
```tsx
// No props - self-contained component
```

### State Management
```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [isVisible, setIsVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);
```

### Navigation Items
```tsx
const navItems = [
  { href: "#home", label: "Home", ariaLabel: "Navigate to home section" },
  { href: "#about", label: "About Us", ariaLabel: "Navigate to about us section" },
  { href: "#services", label: "Services", ariaLabel: "Navigate to services section" },
  { href: "#portfolio", label: "Portfolio", ariaLabel: "Navigate to portfolio section" },
  { href: "#team", label: "Team", ariaLabel: "Navigate to team section" },
  { href: "#contact", label: "Contact Us", ariaLabel: "Navigate to contact section" }
];
```

### Usage
```tsx
import Header from '@/components/Header';

export default function Layout() {
  return (
    <div>
      <Header />
      {/* Rest of your content */}
    </div>
  );
}
```

---

## Hero Component

**File**: `src/components/Hero.tsx`

### Description
Main hero section with animated logo, parallax effects, and tag system.

### Features
- **Animated Logo**: SVG logo with path drawing animations
- **Parallax Effects**: Scroll-based logo movement
- **Tag System**: Interactive technology tags
- **Performance**: Optimized for reduced motion preferences

### Animation Variants
```tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};
```

### Parallax Configuration
```tsx
const yTransform = useTransform(scrollY, [0, 500], [0, -100]);
const opacityTransform = useTransform(scrollY, [0, 300], [1, 0.3]);
const logoYTransform = useTransform(scrollY, [0, 500], [0, prefersReduced ? 0 : 20]);
```

### Tags Configuration
```tsx
const tags = [
  "AI Agents",
  "Web Apps", 
  "Mobile Apps",
  "Interactive Media"
];
```

### Usage
```tsx
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* Other sections */}
    </main>
  );
}
```

---

## About Component

**File**: `src/components/About.tsx`

### Description
About section with image and text content, featuring scroll animations.

### Features
- **Image Display**: Responsive image with hover effects
- **Text Animation**: Staggered text reveal animations
- **Responsive Layout**: Grid layout that adapts to screen size
- **Performance**: Optimized with intersection observer

### Animation Configuration
```tsx
const textVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};
```

### Layout Structure
```tsx
// Grid layout: 1.5fr image, 2fr text on large screens
<div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2fr] gap-8 sm:gap-10 lg:gap-12">
```

### Usage
```tsx
import About from '@/components/About';

export default function HomePage() {
  return (
    <main>
      <About />
      {/* Other sections */}
    </main>
  );
}
```

---

## FeaturedProjects Component

**File**: `src/components/FeaturedProjects.tsx`

### Description
Interactive project showcase with image carousels and parallax effects.

### Features
- **Image Carousels**: Automatic image rotation on hover/mobile
- **Parallax Effects**: Different scroll velocities for each card
- **Mobile Optimization**: Touch-friendly interactions
- **Performance**: Lazy loading and intersection observer
- **Optimized Animations**: Uses performance-aware animation system

### Project Interface
```tsx
interface Project {
  title: string;
  description: string;
  images: string[];
}
```

### Parallax Configuration
```tsx
// Different velocities for visual variety
const velocities = [-0.1, 0.15, -0.08, 0.12];
const velocity = velocities[index] || 0.1;
const parallaxY = useParallaxScroll(velocity, cardRef);
```

### Mobile Detection
```tsx
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
```

### Animation Variants
```tsx
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
      delay: 0.1,
    },
  },
};
```

### Image Carousel Logic
```tsx
// On mobile: loop when in view, on desktop: loop when hovered
const shouldLoop = isMobile ? isInView : isHovered;

if (shouldLoop && project.images.length > 1) {
  interval = setInterval(() => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % project.images.length
    );
  }, 800); // Change image every 800ms
}
```

### Usage
```tsx
import FeaturedProjects from '@/components/FeaturedProjects';

export default function HomePage() {
  return (
    <main>
      <FeaturedProjects />
      {/* Other sections */}
    </main>
  );
}
```

---

## Services Component

**File**: `src/components/Services.tsx`

### Description
Services grid with hover effects and individual scroll animations.

### Features
- **Service Cards**: Individual animation triggers
- **Hover Effects**: 3D transforms and scaling
- **Image Optimization**: Lazy loading with proper alt text
- **Responsive Grid**: Adapts to different screen sizes
- **Performance**: Optimized intersection observer for each card

### Service Interface
```tsx
interface Service {
  title: string;
  description: string;
  image: string;
}
```

### Animation Variants
```tsx
const serviceCardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    scale: 0.9,
    rotateX: 15
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.1
    }
  }
};
```

### Hover Effects
```tsx
whileHover={{ 
  scale: 1.005,
  transition: { 
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94] 
  }
}}
```

### Image Hover Effects
```tsx
<motion.div 
  className="aspect-square rounded-2xl sm:rounded-3xl lg:rounded-4xl mb-4 overflow-hidden"
  whileHover={{ 
    scale: .95,
    rotateY: 5,
    transition: { duration: 0.3 }
  }}
>
```

### Usage
```tsx
import Services from '@/components/Services';

export default function HomePage() {
  return (
    <main>
      <Services />
      {/* Other sections */}
    </main>
  );
}
```

---

## WhyChooseUs Component

**File**: `src/components/WhyChooseUs.tsx`

### Description
Features section with animated wave paths and staggered content.

### Features
- **Wave Paths**: Interactive SVG wave animations
- **Staggered Animation**: Individual feature animations
- **Content Structure**: Title and description pairs
- **Performance**: Optimized intersection observer

### Feature Interface
```tsx
interface Feature {
  title: string;
  description: string;
}
```

### Wave Path Integration
```tsx
<WavePath 
  className="text-white w-full" 
  animateOnScroll={true}
  animationDuration={1500}
  animationDelay={200}
/>
```

### Usage
```tsx
import WhyChooseUs from '@/components/WhyChooseUs';

export default function HomePage() {
  return (
    <main>
      <WhyChooseUs />
      {/* Other sections */}
    </main>
  );
}
```

---

## TeamSection Component

**File**: `src/components/TeamSection.tsx`

### Description
Team member showcase with individual scroll animations and hover effects.

### Features
- **Team Cards**: Individual member cards with photos
- **Individual Animations**: Each card has its own intersection observer
- **Hover Animations**: Scale and lift effects
- **Responsive Grid**: Mobile-first design
- **Performance**: Optimized intersection observer for each card

### Team Member Interface
```tsx
interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}
```

### Animation Variants
```tsx
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
      delay: 0.1
    }
  }
};
```

### Hover Effects
```tsx
whileHover={{ 
  transition: { duration: 0.3 }
}}
```

### Image Hover Effects
```tsx
<motion.div 
  className="w-full max-w-xs mx-auto mb-4 overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl"
  whileHover={{ scale: .95 }}
  transition={{ duration: 0.3 }}
>
```

### Individual Card Animation
```tsx
// Each card has its own intersection observer
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setIsCardInView(entry.isIntersecting);
    },
    { 
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px"
    }
  );
  // ... observer setup
}, []);
```

### Usage
```tsx
import TeamSection from '@/components/TeamSection';

export default function HomePage() {
  return (
    <main>
      <TeamSection />
      {/* Other sections */}
    </main>
  );
}
```

---

## CTA Component

**File**: `src/components/CTA.tsx`

### Description
Call-to-action section with 3D background effects and animated button.

### Features
- **3D Background**: DottedSurface particle system
- **Animated Button**: Multiple hover animation classes
- **Contact Integration**: Direct email link
- **Performance**: Optimized particle system

### Button Animations
```tsx
// Multiple animation classes for rich interactions
className="btn-3d-lift btn-liquid btn-magnetic"
```

### Background Integration
```tsx
<DottedSurface />
```

### Usage
```tsx
import CTA from '@/components/CTA';

export default function HomePage() {
  return (
    <main>
      <CTA />
      {/* Other sections */}
    </main>
  );
}
```

---

## Footer Component

**File**: `src/components/Footer.tsx`

### Description
Comprehensive footer with social links and company information.

### Features
- **Social Links**: Icon-based social media links
- **Company Info**: Brand and contact information
- **Responsive Grid**: Mobile-optimized layout
- **Accessibility**: Proper link structure

### Footer Structure
```tsx
const footerLinks: FooterSection[] = [
  {
    label: "Services",
    links: [/* service links */]
  },
  {
    label: "Company", 
    links: [/* company links */]
  },
  {
    label: "Resources",
    links: [/* resource links */]
  },
  {
    label: "Connect",
    links: [/* social links with icons */]
  }
];
```

### Usage
```tsx
import { Footer } from '@/components/Footer';

export default function Layout() {
  return (
    <div>
      {/* Main content */}
      <Footer />
    </div>
  );
}
```

---

## UI Components

### AnimatedLogo Component

**File**: `src/components/ui/animated-logo.tsx`

#### Description
SVG logo with path drawing animations and reduced motion support.

#### Features
- **Path Animation**: SVG path drawing effect
- **Reduced Motion**: Respects accessibility preferences
- **Performance**: Optimized animations
- **Customizable**: Size and styling props

#### Props
```tsx
type AnimatedLogoProps = {
  className?: string;
};
```

#### Usage
```tsx
import AnimatedLogo from '@/components/ui/animated-logo';

<AnimatedLogo className="h-[60vh] w-auto" />
```

### DottedSurface Component

**File**: `src/components/ui/dotted-surface.tsx`

#### Description
Three.js particle system for 3D background effects with optimized performance.

#### Features
- **3D Particles**: Animated particle system with sine wave motion
- **Performance**: Optimized rendering with reduced particle count
- **Responsive**: Adapts to container size with proper cleanup
- **Memory Management**: Proper disposal of Three.js objects
- **Dark Theme**: White particles optimized for dark backgrounds

#### Props
```tsx
type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;
```

#### Configuration
```tsx
const SEPARATION = 100; // Reduced for better visibility
const AMOUNTX = 25; // Reduced particle count for performance
const AMOUNTY = 35;

// Particle animation with sine waves
positions[index + 1] =
  Math.sin((ix + count) * 0.3) * 50 +
  Math.sin((iy + count) * 0.5) * 50;
```

#### Performance Optimizations
- **Reduced Particle Count**: 25x35 grid for better performance
- **Optimized Camera**: Closer positioning for better visibility
- **Proper Cleanup**: Automatic disposal of Three.js objects
- **Resize Handling**: Efficient window resize management

#### Usage
```tsx
import { DottedSurface } from '@/components/ui/dotted-surface';

<DottedSurface />
```

### WavePath Component

**File**: `src/components/ui/wave-path.tsx`

#### Description
Interactive SVG wave path with mouse interactions and scroll animations.

#### Features
- **Mouse Interaction**: Wave responds to mouse movement with smooth transitions
- **Scroll Animation**: Optional scroll-triggered animation with stroke drawing
- **Customizable**: Duration and delay props
- **Performance**: Optimized rendering with proper cleanup
- **Intersection Observer**: Only animates when in view

#### Props
```tsx
type WavePathProps = React.ComponentProps<'div'> & {
  animateOnScroll?: boolean;
  animationDuration?: number;
  animationDelay?: number;
};
```

#### Animation Features
```tsx
// Scroll-triggered stroke animation
if (animateOnScroll && isInView && path.current && pathLength > 0) {
  path.current.style.strokeDasharray = `${pathLength}`;
  path.current.style.strokeDashoffset = `${pathLength}`;
  path.current.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out`;
  path.current.style.strokeDashoffset = '0';
}
```

#### Mouse Interaction
```tsx
const manageMouseMove = (e: React.MouseEvent) => {
  const { movementY, clientX } = e;
  if (path.current) {
    const pathBound = path.current.getBoundingClientRect();
    x = (clientX - pathBound.left) / pathBound.width;
    progress += movementY;
    setPath(progress);
  }
};
```

#### Usage
```tsx
import { WavePath } from '@/components/ui/wave-path';

<WavePath 
  animateOnScroll={true}
  animationDuration={1500}
  animationDelay={200}
/>
```

### Highlighter Component

**File**: `src/components/ui/highlighter.tsx`

#### Description
Mouse-following highlight effects and particle systems with advanced performance optimizations.

#### Features
- **Mouse Tracking**: Follows cursor movement with smooth interpolation
- **Particle System**: Canvas-based particles with mouse magnetism
- **Performance**: Throttled animations and optimized rendering
- **Customizable**: Color, quantity, and behavior props
- **Memory Management**: Proper cleanup and resize handling

#### Components
- `HighlightGroup`: Container for highlight effects
- `HighlighterItem`: Individual highlightable items
- `Particles`: Canvas particle system
- `useMousePosition`: Custom hook for mouse tracking

#### Particle System Features
```tsx
// Mouse magnetism effect
circle.translateX +=
  (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
  ease;
circle.translateY +=
  (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
  ease;
```

#### Performance Optimizations
- **RequestAnimationFrame**: Smooth 60fps animations
- **Edge Detection**: Particles fade near edges
- **Dynamic Alpha**: Particles adjust opacity based on position
- **Efficient Cleanup**: Proper canvas and event cleanup

#### Usage
```tsx
import { HighlightGroup, HighlighterItem, Particles } from '@/components/ui/highlighter';

<HighlightGroup>
  <HighlighterItem>
    <div>Highlightable content</div>
  </HighlighterItem>
</HighlightGroup>

<Particles 
  quantity={30} 
  color="#ffffff"
  staticity={50}
  ease={50}
/>
```

---

## 🚀 Performance Utilities

### Performance Utils (`performance-utils.ts`)

#### Device Performance Detection
```tsx
export const getDevicePerformance = () => {
  // Detects low-end devices based on:
  // - CPU cores (<= 2)
  // - RAM (<= 4GB if available)
  // - Mobile devices
  // - Android tablets
  return isLowEnd ? 'low' : 'high';
};
```

#### Reduced Motion Detection
```tsx
export const shouldReduceAnimations = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check device performance
  const devicePerformance = getDevicePerformance();
  
  return prefersReducedMotion || devicePerformance === 'low';
};
```

#### Optimized Animation Configuration
```tsx
export const getOptimizedAnimationConfig = () => {
  const shouldReduce = shouldReduceAnimations();
  
  if (shouldReduce) {
    return {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.05,
      delayChildren: 0.02
    };
  }
  
  return {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
    staggerChildren: 0.15,
    delayChildren: 0.1
  };
};
```

#### Optimized Intersection Observer
```tsx
export const createOptimizedObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '-50px',
    threshold: 0.1,
    ...options
  };
  
  return new IntersectionObserver(callback, defaultOptions);
};
```

#### Throttle and Debounce Functions
```tsx
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): T => {
  let inThrottle: boolean;
  return ((...args: unknown[]) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  }) as T;
};

export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): T => {
  let timeoutId: NodeJS.Timeout;
  return ((...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  }) as T;
};
```

### Optimized Animation Hooks (`use-optimized-animation.ts`)

#### Optimized Scroll Animation
```tsx
export const useOptimizedScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Uses createOptimizedObserver for better performance
  // Only animates once for better performance
  // Respects reduced motion preferences
};
```

#### Optimized Parallax Hook
```tsx
export const useOptimizedParallax = (velocity = 0.5, elementRef) => {
  // Throttled scroll events (16ms = ~60fps)
  // Only calculates when element is in viewport
  // Uses requestAnimationFrame for smooth animations
  // Automatic cleanup and memory management
};
```

#### Optimized Animation Variants
```tsx
export const getOptimizedVariants = () => {
  const config = getOptimizedAnimationConfig();
  const shouldReduce = shouldReduceAnimations();
  
  if (shouldReduce) {
    return {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
      }
    };
  }
  
  return {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: config.duration,
        ease: config.ease,
        staggerChildren: config.staggerChildren,
        delayChildren: config.delayChildren
      }
    }
  };
};
```

---

## 🎨 Animation System

### Standard Variants
All components use standardized animation variants from `use-scroll-animation.ts`:

```tsx
export const STANDARD_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.6,
        ease: "easeOut",
      }
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  slideLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  slideRight: {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1],
      }
    }
  },
  title: {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  }
};
```

### Performance Optimization
- **Device Detection**: Automatic performance scaling via `performance-utils.ts`
- **Reduced Motion**: Accessibility support with `useReducedMotion`
- **Throttling**: Scroll event optimization with `throttle` function
- **Intersection Observer**: Efficient viewport detection with `createOptimizedObserver`
- **Optimized Animations**: Performance-aware animation variants

### Usage Pattern
```tsx
const { ref, isInView } = useScrollAnimation();

<motion.div
  ref={ref}
  variants={STANDARD_VARIANTS.container}
  {...getMotionConfig()}
  animate={isInView ? "visible" : "hidden"}
>
  {/* Content */}
</motion.div>
```

### Performance Utilities
The animation system now includes advanced performance utilities:

#### Device Performance Detection
```tsx
// performance-utils.ts
export const getDevicePerformance = () => {
  // Detects low-end devices based on:
  // - CPU cores (<= 2)
  // - RAM (<= 4GB if available)
  // - Mobile devices
  // - Android tablets
  return isLowEnd ? 'low' : 'high';
};
```

#### Optimized Animation Configuration
```tsx
export const getOptimizedAnimationConfig = () => {
  const shouldReduce = shouldReduceAnimations();
  
  if (shouldReduce) {
    return {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.05,
      delayChildren: 0.02
    };
  }
  
  return {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
    staggerChildren: 0.15,
    delayChildren: 0.1
  };
};
```

#### Optimized Scroll Animation Hook
```tsx
// use-optimized-animation.ts
export const useOptimizedScrollAnimation = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Uses createOptimizedObserver for better performance
  // Only animates once for better performance
  // Respects reduced motion preferences
};
```

#### Optimized Parallax Hook
```tsx
export const useOptimizedParallax = (velocity = 0.5, elementRef) => {
  // Throttled scroll events (16ms = ~60fps)
  // Only calculates when element is in viewport
  // Uses requestAnimationFrame for smooth animations
  // Automatic cleanup and memory management
};
```

---

## 🔧 Customization Guide

### Adding New Components
1. Create component file in `/src/components/`
2. Add TypeScript interfaces for props
3. Implement accessibility attributes
4. Add to component exports in `index.ts`
5. Update documentation

### Modifying Animations
1. Update variants in `use-scroll-animation.ts`
2. Test performance impact
3. Ensure accessibility
4. Update component documentation

### Styling Changes
1. Modify Tailwind classes
2. Update CSS variables in `globals.css`
3. Test responsive behavior
4. Verify accessibility

---

## 🧪 Testing Components

### Manual Testing Checklist
- [ ] Responsive design on all breakpoints
- [ ] Accessibility with screen readers
- [ ] Performance on low-end devices
- [ ] Animation behavior with reduced motion
- [ ] Cross-browser compatibility

### Performance Testing
- [ ] Lighthouse scores
- [ ] Core Web Vitals
- [ ] Bundle size analysis
- [ ] Animation frame rates

---

This documentation provides comprehensive information about all components in the MindBit Solutions website. For additional support or questions, please refer to the main README.md file.
