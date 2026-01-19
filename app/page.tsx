import { Hero } from "@/components/Hero";
import { ValuePropBento } from "@/components/ValuePropBento";
import { SimulationDemo } from "@/components/SimulationDemo";
import { ActiveRoles } from "@/components/ActiveRoles";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <ValuePropBento />
      <SimulationDemo />
      <ActiveRoles />
      <HowItWorks />
      <Footer />
    </div>
  );
}
