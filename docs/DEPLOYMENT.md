# Deployment Guide

This guide covers various deployment options for the MindBit Solutions website, optimized for static hosting.

## 🚀 Quick Deploy Options

### Vercel (Recommended)
Vercel is the easiest option for Next.js applications with automatic deployments.

#### Setup
1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy from project directory
   vercel
   ```

2. **GitHub Integration**
   - Connect your GitHub repository to Vercel
   - Automatic deployments on push to main branch
   - Preview deployments for pull requests

#### Configuration
```json
// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "framework": "nextjs",
  "functions": {
    "src/app/api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  }
}
```

#### Environment Variables
```bash
# Add in Vercel dashboard or CLI
NEXT_PUBLIC_GA_ID=your-google-analytics-id
CONTACT_EMAIL=info@mindbitsolution.com
```

---

### Netlify
Netlify provides excellent static site hosting with form handling.

#### Setup
1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: out
   ```

2. **Deploy via CLI**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Deploy
   netlify deploy --prod --dir=out
   ```

3. **Git Integration**
   - Connect GitHub repository
   - Automatic deployments on push
   - Branch previews for pull requests

#### Configuration
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

### GitHub Pages
Free hosting for public repositories with custom domains.

#### Setup
1. **Build and Deploy**
   ```bash
   # Build the project
   npm run build
   
   # Copy out directory to gh-pages branch
   git subtree push --prefix out origin gh-pages
   ```

2. **GitHub Actions (Automated)**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
         
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

3. **Repository Settings**
   - Go to Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

---

## 🌐 Custom Domain Setup

### DNS Configuration

#### For Vercel
1. **Add Domain in Vercel Dashboard**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Records**
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

#### For Netlify
1. **Add Domain in Netlify Dashboard**
   - Go to Site Settings > Domain Management
   - Add custom domain
   - Configure DNS settings

2. **DNS Records**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

#### For GitHub Pages
1. **Repository Settings**
   - Go to Settings > Pages
   - Add custom domain
   - Create CNAME file in repository root

2. **CNAME File**
   ```
   # CNAME file content
   yourdomain.com
   ```

3. **DNS Records**
   ```
   Type: CNAME
   Name: www
   Value: your-username.github.io
   
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   ```

---

## 🔧 Advanced Configuration

### CDN Setup

#### Cloudflare
1. **Add Site to Cloudflare**
   - Sign up for Cloudflare
   - Add your domain
   - Update nameservers

2. **Performance Settings**
   ```
   Auto Minify: HTML, CSS, JS
   Brotli Compression: On
   Rocket Loader: On
   Mirage: On
   ```

3. **Caching Rules**
   ```
   Cache Level: Standard
   Browser Cache TTL: 1 month
   Edge Cache TTL: 1 month
   ```

#### AWS CloudFront
1. **Create Distribution**
   - Origin: Your hosting provider
   - Default Root Object: index.html
   - Error Pages: 404 → /index.html

2. **Cache Behaviors**
   ```
   Path Pattern: /static/*
   TTL: 1 year
   Compress: Yes
   ```

### Performance Optimization

#### Image Optimization
```tsx
// Next.js Image component with optimization
<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority={true} // For above-the-fold images
  loading="lazy" // For below-the-fold images
  placeholder="blur" // With blur data URL
  blurDataURL="data:image/jpeg;base64,..."
/>
```

#### Bundle Optimization
```javascript
// next.config.ts
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};
```

#### Caching Headers
```javascript
// For static hosting providers
const headers = {
  'Cache-Control': 'public, max-age=31536000, immutable',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
};
```

---

## 📊 Monitoring & Analytics

### Google Analytics Setup
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
      gtag('config', '${GA_ID}', {
        page_title: document.title,
        page_location: window.location.href,
      });
    `,
  }}
/>
```

### Performance Monitoring
```javascript
// Add to layout.tsx
useEffect(() => {
  // Core Web Vitals monitoring
  if ('web-vital' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
}, []);
```

### Error Tracking
```javascript
// Sentry integration
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

---

## 🔒 Security Configuration

### Security Headers
```javascript
// next.config.ts
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### Content Security Policy
```javascript
// Add to layout.tsx
<meta
  httpEquiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;"
/>
```

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_GA_ID: ${{ secrets.GA_ID }}
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: out/
  
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: out/
      
      - name: Deploy to hosting provider
        run: |
          # Add your deployment commands here
          echo "Deploying to production..."
```

### Environment Variables
```bash
# .env.local (for development)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
CONTACT_EMAIL=info@mindbitsolution.com

# .env.production (for production)
NEXT_PUBLIC_GA_ID=your-production-ga-id
CONTACT_EMAIL=info@mindbitsolution.com
```

---

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Static Export Issues
```javascript
// Ensure next.config.ts has correct settings
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

#### Performance Issues
```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

#### SEO Issues
```bash
# Test SEO with tools
npx lighthouse http://localhost:3000 --only-categories=seo
```

### Debugging Tools
```bash
# Performance analysis
npm run build
npm run start
# Open Chrome DevTools > Lighthouse

# Bundle analysis
npm install --save-dev @next/bundle-analyzer
# Add to package.json scripts:
# "analyze": "ANALYZE=true npm run build"
```

---

## 📈 Performance Optimization

### Core Web Vitals Targets
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Optimization Checklist
- [ ] Image optimization and lazy loading
- [ ] Code splitting and tree shaking
- [ ] CDN configuration
- [ ] Caching headers
- [ ] Compression (Gzip/Brotli)
- [ ] Critical CSS inlining
- [ ] Font optimization
- [ ] JavaScript minification

### Monitoring Setup
```javascript
// Add to layout.tsx
useEffect(() => {
  // Performance monitoring
  if (typeof window !== 'undefined') {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
}, []);
```

---

## 🎯 Deployment Checklist

### Pre-Deployment
- [ ] Test build locally (`npm run build`)
- [ ] Verify static export works
- [ ] Check all images load correctly
- [ ] Test responsive design
- [ ] Validate accessibility
- [ ] Run performance audit
- [ ] Test SEO meta tags

### Post-Deployment
- [ ] Verify custom domain works
- [ ] Check SSL certificate
- [ ] Test all functionality
- [ ] Monitor Core Web Vitals
- [ ] Set up analytics
- [ ] Configure monitoring
- [ ] Test on multiple devices

### Maintenance
- [ ] Regular security updates
- [ ] Performance monitoring
- [ ] Analytics review
- [ ] Content updates
- [ ] Backup verification

---

This deployment guide provides comprehensive instructions for deploying the MindBit Solutions website to various hosting platforms. Choose the option that best fits your needs and technical requirements.
