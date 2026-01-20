"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useViewMode } from "@/lib/context/ViewModeContext";
import { useWaitlist } from "@/lib/context/WaitlistContext";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { track } from "@vercel/analytics";

export function Hero() {
  const { viewMode } = useViewMode();
  const { triggerWaitlist } = useWaitlist();

  const scrollToValueProps = () => {
    const element = document.getElementById('value-props');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-[128px]" />
      </div>

      <div className="container mx-auto max-w-5xl text-center">
        <AnimatePresence mode="wait">
          {viewMode === "company" ? (
            <motion.div
              key="company"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                  Deploy AI Agents.
                  <br />
                  <span className="text-primary">Hire the Builders.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  The implementation gap is real. We source vetted Forward
                  Deployed Engineers (FDEs) who don&apos;t just write
                  code—they ship solved problems.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => {
                    triggerWaitlist();
                    track("hero_cta_clicked", { view: "company" });
                  }}
                >
                  Join Waitlist
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    scrollToValueProps();
                    track("learn_more_clicked", { view: "company" });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="engineer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                  Skip the LeetCode.
                  <br />
                  <span className="text-secondary">Solve Real Problems.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                  Join the elite FDE network. Access lucrative contracts
                  ($150k-$300k/yr equivalent) at top SMBs. Prove your skills
                  once via simulation, not 5 rounds of HR screens.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="default"
                  className="bg-secondary hover:bg-secondary/90"
                  onClick={() => {
                    triggerWaitlist();
                    track("hero_cta_clicked", { view: "engineer" });
                  }}
                >
                  <Play className="mr-2 h-5 w-5" />
                  Join Waitlist
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    scrollToValueProps();
                    track("learn_more_clicked", { view: "engineer" });
                  }}
                >
                  Learn More
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
