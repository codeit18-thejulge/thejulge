import Footer from "@/components/Footer";
import LandingHeader from "@/components/Landing/LandingHeader";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import HowWorks from "@/components/Landing/HowWorks";
import ReasonToUse from "@/components/Landing/ReasonToUse";
import FAQ from "@/components/Landing/FAQ";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <HowWorks />
      <ReasonToUse />
      <FeaturesSection />
      <FAQ />
      <Footer />
    </>
  );
}
