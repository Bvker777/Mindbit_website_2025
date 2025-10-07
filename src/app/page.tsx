import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutSection from "@/components/About";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesSection from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <main className="pt-16">
        <Hero />
        <AboutSection />
        <FeaturedProjects />
        <ServicesSection />
        <WhyChooseUs />
        {/* <TeamSection /> */}
        <CTASection />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
