import Footer from "@/components/Footer";
import LandingHeader from "@/components/Landing/LandingHeader";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import HowWorks from "@/components/Landing/HowWorks";

export default function Home() {
  return (
    <>
      <LandingHeader />
      <HeroSection />
      <HowWorks />
      <FeaturesSection />
      <Footer />
    </>
  );
}
