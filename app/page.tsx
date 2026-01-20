"use client";

import { useState, useEffect } from "react";
import { Hero } from "@/components/Hero";
import { ValuePropBento } from "@/components/ValuePropBento";
import { SimulationDemo } from "@/components/SimulationDemo";
import { ActiveRoles } from "@/components/ActiveRoles";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";
import { WaitlistModal } from "@/components/WaitlistModal";
import { QualificationModal } from "@/components/QualificationModal";
import { useWaitlist } from "@/lib/context/WaitlistContext";
import { track } from "@vercel/analytics";

export default function Home() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [pollOpen, setPollOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { registerCallback } = useWaitlist();

  useEffect(() => {
    // Register the callback for opening the waitlist modal
    registerCallback(() => {
      setWaitlistOpen(true);
      track("waitlist_modal_opened", { trigger: "manual" });
    });
  }, [registerCallback]);

  useEffect(() => {
    // Check if user already submitted
    const hasSubmitted = localStorage.getItem("waitlist_submitted") === "true";

    if (!hasSubmitted) {
      // Auto-open waitlist modal after 8 seconds
      const timer = setTimeout(() => {
        setWaitlistOpen(true);
        track("waitlist_modal_opened", { trigger: "auto" });
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleWaitlistSuccess = (email: string) => {
    setUserEmail(email);
    setPollOpen(true);
    track("waitlist_signup_success", { email });
  };

  const handlePollClose = (open: boolean) => {
    setPollOpen(open);
    if (!open) {
      track("poll_completed");
    }
  };

  return (
    <div className="min-h-screen">
      <Hero />
      <ValuePropBento />
      <SimulationDemo />
      <ActiveRoles />
      <HowItWorks />
      <Footer />

      <WaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        onSuccess={handleWaitlistSuccess}
      />

      <QualificationModal
        open={pollOpen}
        onOpenChange={handlePollClose}
        email={userEmail}
      />
    </div>
  );
}
