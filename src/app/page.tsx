import { PageBackdrop, Footer } from "@/common/components/layout";
import {
  LandingNavbar,
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  CtaSection,
} from "@/modules/landing";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <PageBackdrop />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <LandingNavbar />
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CtaSection />
      </div>

      <Footer />
    </main>
  );
}