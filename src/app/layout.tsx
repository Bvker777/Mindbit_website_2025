import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "MindBit Solutions - Software Development Agency",
    template: "%s | MindBit Solutions"
  },
  description: "Professional software development agency specializing in custom websites, mobile apps, AI integration, and UI/UX design. We build digital solutions that actually make sense for your business.",
  keywords: [
    "software development",
    "web development", 
    "mobile app development",
    "AI integration",
    "custom software",
    "UI/UX design",
    "digital solutions",
    "web applications",
    "mobile applications",
    "AI agents",
    "custom apps",
    "software consulting",
    "digital transformation",
    "business software",
    "enterprise solutions"
  ],
  authors: [{ name: "MindBit Solutions Team" }],
  creator: "MindBit Solutions",
  publisher: "MindBit Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://mindbitsolution.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindbitsolution.com',
    siteName: 'MindBit Solutions',
    title: 'MindBit Solutions - Software Development Company',
    description: 'Professional software development company specializing in custom websites, mobile apps, AI integration, and UI/UX design.',
    images: [
      {
        url: '/mindbit-og-image.png',
        width: 1200,
        height: 630,
        alt: 'MindBit Solutions - Software Development Company',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindBit Solutions - Software Development Company',
    description: 'Professional software development company specializing in custom websites, mobile apps, AI integration, and UI/UX design.',
    images: ['/mindbit-twitter-image.png'],
    creator: '@mindbitsolution',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#ffffff' },
      { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
    ],
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "MindBit Solutions",
              "url": "https://mindbitsolution.com",
              "logo": "https://mindbitsolution.com/logos/minbit_logo.svg",
              "description": "Professional software development company specializing in custom websites, mobile apps, AI integration, and UI/UX design.",
              "foundingDate": "2025",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Lambert Shadap",
                  "jobTitle": "Co-Founder"
                },
                {
                  "@type": "Person", 
                  "name": "Ynaiborlang Nongkynrih",
                  "jobTitle": "Co-Founder"
                },
                {
                  "@type": "Person",
                  "name": "Bakerlang L Nonglait", 
                  "jobTitle": "Co-Founder"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@mindbitsolution.com",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/mindbitsolution",
                "https://www.instagram.com/mindbitsolution", 
                "https://www.linkedin.com/company/mindbitsolution",
                "https://www.youtube.com/mindbitsolution"
              ],
              "service": [
                {
                  "@type": "Service",
                  "name": "Custom Website Development",
                  "description": "Professional web development services for businesses"
                },
                {
                  "@type": "Service", 
                  "name": "Mobile App Development",
                  "description": "Native and cross-platform mobile application development"
                },
                {
                  "@type": "Service",
                  "name": "AI Integration Services", 
                  "description": "Artificial intelligence integration for business applications"
                },
                {
                  "@type": "Service",
                  "name": "UI/UX Design",
                  "description": "User interface and user experience design services"
                }
              ]
            })
          }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="language" content="en" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Favicon */}
        <link rel="icon" href="/icons/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icons/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
