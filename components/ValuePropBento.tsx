"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useViewMode } from "@/lib/context/ViewModeContext";
import { Card } from "@/components/ui/card";
import {
  Code2,
  MessageCircle,
  Zap,
  Users,
  Shield,
  Clock,
  Award,
  Wallet,
} from "lucide-react";

const engineerCards = [
  {
    icon: Code2,
    title: "Zero LeetCode",
    description:
      "We don't invert binary trees. We test if you can debug a hallucinating RAG pipeline or optimize tool-use latency.",
  },
  {
    icon: MessageCircle,
    title: "Instant Feedback Loop",
    description:
      "No ghosting. Even if you don't pass, our AI provides a detailed technical breakdown of your performance so you improve.",
  },
  {
    icon: Zap,
    title: "High-Leverage Roles",
    description:
      "Work on Green energy optimization, LegalTech automation, and Fintech agents. No boring CRUD apps.",
  },
  {
    icon: Users,
    title: "Vetted Community",
    description: "Join a private Discord of top 1% Systems Thinkers.",
  },
];

const companyCards = [
  {
    icon: Shield,
    title: "Vetted Talent Pool",
    description:
      "Pre-screened FDEs who passed AI simulations testing real-world problem-solving, not algorithm puzzles.",
  },
  {
    icon: Clock,
    title: "Speed to Hire",
    description:
      "Skip 5 rounds of interviews. Get direct access to final candidates ready to start immediately.",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description:
      "30-day replacement if engineer doesn't perform. We stand behind our vetting process.",
  },
  {
    icon: Wallet,
    title: "No Recruitment Fees",
    description:
      "Flat monthly subscription, unlimited hires. No 20-30% placement fees ever.",
  },
];

export function ValuePropBento() {
  const { viewMode } = useViewMode();
  const cards = viewMode === "engineer" ? engineerCards : companyCards;

  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The Operating System for{" "}
            <span className="text-primary">AI Talent</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {cards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                    <div
                      className={`inline-flex p-3 rounded-lg mb-4 ${
                        viewMode === "engineer"
                          ? "bg-primary/10"
                          : "bg-secondary/10"
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          viewMode === "engineer"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                    <p className="text-muted-foreground">{card.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
