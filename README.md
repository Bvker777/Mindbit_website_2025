# MindBit Solutions Website

A modern, performance-optimized website for MindBit Solutions - a software development company specializing in custom websites, mobile apps, AI integration, and UI/UX design.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Performance Optimized**: Turbopack, lazy loading, device-based optimizations
- **Accessibility**: WCAG compliant with reduced motion support
- **SEO Ready**: Comprehensive meta tags, structured data, sitemap
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Advanced Animations**: Framer Motion with performance throttling
- **3D Graphics**: Three.js particle systems and interactive elements
- **Static Export**: Optimized for static hosting

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15.5.4
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.22
- **3D Graphics**: Three.js 0.180.0

### Development Tools
- **Build Tool**: Turbopack
- **Linting**: ESLint with Next.js config
- **Package Manager**: npm
- **Version Control**: Git

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles and animations
│   ├── sitemap.ts         # Dynamic sitemap generation
│   └── robots.ts          # Robots.txt configuration
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── animated-logo.tsx
│   │   ├── dotted-surface.tsx
│   │   ├── highlighter.tsx
│   │   └── wave-path.tsx
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── About.tsx         # About section
│   ├── FeaturedProjects.tsx
│   ├── Services.tsx      # Services section
│   ├── WhyChooseUs.tsx   # Features section
│   ├── TeamSection.tsx   # Team members
│   ├── CTA.tsx          # Call-to-action
│   ├── Footer.tsx        # Footer
│   └── index.ts          # Component exports
└── lib/                  # Utility libraries
    ├── utils.ts          # Utility functions
    ├── use-scroll-animation.ts
    ├── use-optimized-animation.ts
    └── performance-utils.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mindbitsolution/website.git
   cd mindbit-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Static Export

The project is configured for static export:

```bash
# Build static files
npm run build

# Files will be generated in /out directory
```

## 🎨 Design System

### Color Palette
- **Primary**: Teal (#2dd4bf)
- **Secondary**: Blue (#3b82f6) 
- **Accent**: Purple (#8b5cf6)
- **Background**: White (#ffffff) / Dark (#0a0a0a)
- **Text**: Gray (#171717) / Light (#ededed)

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800, 900
- **Responsive**: Fluid typography with clamp()

### Animation System
- **Library**: Framer Motion
- **Performance**: Device-based optimization
- **Accessibility**: Reduced motion support
- **Types**: Scroll animations, hover effects, parallax

## ⚡ Performance Optimizations

### Core Web Vitals
- **LCP**: Optimized with lazy loading and image optimization
- **FID**: Minimal JavaScript execution
- **CLS**: Stable layouts with proper sizing

### Device Optimization
- **High-end devices**: Full animations and effects
- **Low-end devices**: Reduced animations
- **Mobile**: Touch-optimized interactions

### Loading Strategies
- **Images**: Lazy loading with proper alt text
- **Components**: Code splitting and dynamic imports
- **Fonts**: Preconnect to Google Fonts
- **Animations**: Intersection Observer triggers

## 🔍 SEO Implementation

### Meta Tags
- **Title**: Dynamic titles with template
- **Description**: Optimized descriptions
- **Keywords**: Comprehensive keyword strategy
- **Open Graph**: Social media optimization
- **Twitter Cards**: Twitter-specific meta tags

### Structured Data
- **Organization**: Company information
- **Services**: Service offerings
- **Team**: Team member profiles
- **Contact**: Contact information

### Technical SEO
- **Sitemap**: Dynamic sitemap generation
- **Robots.txt**: Search engine directives
- **Canonical URLs**: Duplicate content prevention
- **Schema Markup**: Rich snippets support

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

### Mobile Optimizations
- **Touch targets**: Minimum 44px
- **Navigation**: Collapsible mobile menu
- **Performance**: Reduced animations
- **Images**: Responsive sizing

## 🧩 Component Documentation

### Header Component
```tsx
// Features
- Sticky navigation with scroll behavior
- Mobile-responsive hamburger menu
- Accessibility attributes
- Smooth animations

// Props
interface HeaderProps {
  // No props - self-contained component
}
```

### Hero Component
```tsx
// Features
- Animated logo with parallax effects
- Tag system with hover animations
- Responsive typography
- Performance optimizations

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, staggerChildren: 0.3 }
}
```

### Featured Projects
```tsx
// Features
- Interactive image carousels
- Parallax scrolling effects
- Mobile-optimized interactions
- Lazy loading images

// Props
interface Project {
  title: string;
  description: string;
  images: string[];
}
```

## 🚀 Deployment

### Static Hosting (Recommended)
The project is optimized for static hosting platforms:

#### Vercel
```bash
# Deploy to Vercel
npx vercel

# Or connect GitHub repository
# Automatic deployments on push
```

#### Netlify
```bash
# Build command
npm run build

# Publish directory
out/
```

#### GitHub Pages
```bash
# Build and deploy
npm run build

# Upload /out directory to GitHub Pages
```

### Environment Variables
```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Contact form
CONTACT_EMAIL=info@mindbitsolution.com
```

## 🧪 Development Guidelines

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting (if configured)
- **Components**: Functional components with hooks

### Performance Best Practices
- **Images**: Use Next.js Image component
- **Animations**: Respect reduced motion preferences
- **Loading**: Implement lazy loading
- **Bundle**: Monitor bundle size

### Accessibility
- **Semantic HTML**: Proper heading structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Tab order and focus
- **Color Contrast**: WCAG AA compliance

## 📊 Analytics & Monitoring

### Recommended Tools
- **Google Analytics**: User behavior tracking
- **Google Search Console**: SEO monitoring
- **Core Web Vitals**: Performance monitoring
- **Lighthouse**: Performance auditing

### Implementation
```tsx
// Add to layout.tsx
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}');
    `,
  }}
/>
```

## 🔧 Customization

### Branding
1. **Logo**: Replace `/public/minbit_logo.svg`
2. **Colors**: Update CSS variables in `globals.css`
3. **Fonts**: Modify font imports in `layout.tsx`
4. **Content**: Update component text and images

### Adding New Sections
1. Create component in `/src/components/`
2. Add to main page in `page.tsx`
3. Update navigation in `Header.tsx`
4. Add to sitemap in `sitemap.ts`

### Performance Tuning
1. **Images**: Optimize and compress images
2. **Animations**: Adjust based on target devices
3. **Bundle**: Monitor and optimize imports
4. **Caching**: Configure appropriate headers

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

### Code Standards
- **TypeScript**: Use strict typing
- **Components**: Functional components preferred
- **Performance**: Consider performance impact
- **Accessibility**: Test with screen readers
- **Mobile**: Test on various devices

## 📄 License

This project is proprietary to MindBit Solutions. All rights reserved.

## 📞 Support

For technical support or questions:
- **Email**: info@mindbitsolution.com
- **Website**: [mindbitsolution.com](https://mindbitsolution.com)

## 🎯 Roadmap

### Planned Features
- [ ] Blog section with MDX support
- [ ] Contact form with email integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework

### Performance Improvements
- [ ] Image optimization pipeline
- [ ] Advanced caching strategies
- [ ] CDN integration
- [ ] Progressive Web App features

---

**Built with ❤️ by MindBit Solutions**