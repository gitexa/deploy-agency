"use client";

import { motion } from "framer-motion";
import { Upload, Mic, Award, MessageSquare } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Apply",
    description: "Upload Github/LinkedIn. 2-minute application.",
  },
  {
    number: "02",
    icon: Mic,
    title: "The Sim",
    description: "Take the 30-minute AI voice interview (available 24/7).",
  },
  {
    number: "03",
    icon: Award,
    title: "The Scorecard",
    description:
      'Receive your "Verified Capability Score" (VCS) with detailed feedback.',
  },
  {
    number: "04",
    icon: MessageSquare,
    title: "The Match",
    description:
      "Get dropped directly into Slack channels with hiring founders.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            From application to deployment in 48 hours
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border/40 md:left-12" />

          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex gap-6 md:gap-8"
                >
                  {/* Icon circle */}
                  <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background md:h-20 md:w-20">
                    <Icon className="h-6 w-6 text-primary md:h-8 md:w-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-12">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-mono text-sm text-muted-foreground">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-lg">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
