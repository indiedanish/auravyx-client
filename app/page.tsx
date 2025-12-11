import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import WhatAuravyxDoes from "@/components/WhatAuravyxDoes";
import WhyThisMatters from "@/components/WhyThisMatters";
import Benefits from "@/components/Benefits";
import HowItWorks from "@/components/HowItWorks";
import RoutineMatrixQuiz from "@/components/RoutineMatrixQuiz";
import RetailersSection from "@/components/RetailersSection";
import WaitlistSection from "@/components/WaitlistSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProofStrip />
      <WhatAuravyxDoes />
      <WhyThisMatters />
      <Benefits />
      <HowItWorks />
      <RoutineMatrixQuiz />
      <RetailersSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}

