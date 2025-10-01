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
  // Implementation with resize listener
  return isMobile;
};
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
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};
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
Team member showcase with parallax effects and hover animations.

### Features
- **Team Cards**: Individual member cards with photos
- **Parallax Effects**: Different scroll velocities
- **Hover Animations**: Scale and lift effects
- **Responsive Grid**: Mobile-first design

### Team Member Interface
```tsx
interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
}
```

### Parallax Configuration
```tsx
const velocities = [0.12, -0.08, 0.15];
const velocity = velocities[index] || 0.1;
const parallaxY = useTransform(scrollY, [0, 1000], [0, prefersReduced ? 0 : velocity * 80]);
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
Three.js particle system for 3D background effects.

#### Features
- **3D Particles**: Animated particle system
- **Performance**: Optimized rendering
- **Responsive**: Adapts to container size
- **Cleanup**: Proper memory management

#### Props
```tsx
type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;
```

#### Usage
```tsx
import { DottedSurface } from '@/components/ui/dotted-surface';

<DottedSurface />
```

### WavePath Component

**File**: `src/components/ui/wave-path.tsx`

#### Description
Interactive SVG wave path with mouse interactions.

#### Features
- **Mouse Interaction**: Wave responds to mouse movement
- **Scroll Animation**: Optional scroll-triggered animation
- **Customizable**: Duration and delay props
- **Performance**: Optimized rendering

#### Props
```tsx
type WavePathProps = React.ComponentProps<'div'> & {
  animateOnScroll?: boolean;
  animationDuration?: number;
  animationDelay?: number;
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
Mouse-following highlight effects and particle systems.

#### Features
- **Mouse Tracking**: Follows cursor movement
- **Particle System**: Canvas-based particles
- **Performance**: Throttled animations
- **Customizable**: Color and behavior props

#### Components
- `HighlightGroup`: Container for highlight effects
- `HighlighterItem`: Individual highlightable items
- `Particles`: Canvas particle system

#### Usage
```tsx
import { HighlightGroup, HighlighterItem, Particles } from '@/components/ui/highlighter';

<HighlightGroup>
  <HighlighterItem>
    <div>Highlightable content</div>
  </HighlighterItem>
</HighlightGroup>

<Particles quantity={30} color="#ffffff" />
```

---

## 🎨 Animation System

### Standard Variants
All components use standardized animation variants from `use-scroll-animation.ts`:

```tsx
export const STANDARD_VARIANTS = {
  container: { /* container animations */ },
  slideUp: { /* slide up animations */ },
  slideLeft: { /* slide left animations */ },
  slideRight: { /* slide right animations */ },
  fadeIn: { /* fade in animations */ },
  scaleIn: { /* scale in animations */ },
  title: { /* title animations */ }
};
```

### Performance Optimization
- **Device Detection**: Automatic performance scaling
- **Reduced Motion**: Accessibility support
- **Throttling**: Scroll event optimization
- **Intersection Observer**: Efficient viewport detection

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
