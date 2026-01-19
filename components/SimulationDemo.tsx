"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Brain, Sparkles, Zap } from "lucide-react";

const conversation = [
  {
    role: "ai",
    text: "Scenario: You're deploying a Customer Support Agent. The client reports the bot is being rude to angry users. How do you diagnose and fix this?",
    badge: "Systems Thinking",
    icon: Brain,
  },
  {
    role: "candidate",
    text: "First, I'd check the system prompt for tone constraints. Then, I'd implement a sentiment analysis guardrail layer that detects user frustration and triggers a more empathetic response template. I'd also add conversation logging to identify specific failure patterns.",
    badge: "Empathy & UX",
    icon: Sparkles,
  },
  {
    role: "ai",
    text: "Good. The client now wants the bot to escalate to human support. How would you implement that without breaking the conversation flow?",
    badge: "Tool Use & Handoff",
    icon: Zap,
  },
  {
    role: "candidate",
    text: "I'd add a tool-use function that the agent can call when it detects high frustration or complexity beyond its scope. The handoff would include full conversation context passed to the human agent, so the user doesn't repeat themselves. I'd also implement a graceful transition message.",
    badge: "Tool Use & Handoff",
    icon: Zap,
  },
];

export function SimulationDemo() {
  const [currentTurn, setCurrentTurn] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentTurn >= conversation.length) return;

    const currentMessage = conversation[currentTurn];
    setIsTyping(true);
    setDisplayedText("");

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < currentMessage.text.length) {
        setDisplayedText((prev) => prev + currentMessage.text[charIndex]);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);

        // Move to next turn after a pause
        setTimeout(() => {
          if (currentTurn < conversation.length - 1) {
            setCurrentTurn((prev) => prev + 1);
          } else {
            // Reset to beginning after all turns complete
            setTimeout(() => {
              setCurrentTurn(0);
            }, 3000);
          }
        }, 2000);
      }
    }, 30); // 30ms per character for realistic typing speed

    return () => clearInterval(typingInterval);
  }, [currentTurn]);

  const currentMessage = conversation[currentTurn];
  const CurrentIcon = currentMessage?.icon;

  return (
    <section className="py-24 px-4 bg-card/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The Simulation
          </h2>
          <p className="text-muted-foreground text-lg">
            Watch how we assess real AI engineering skills
          </p>
        </div>

        <Card className="border-border/40 bg-background/95 backdrop-blur-sm overflow-hidden">
          <div className="grid md:grid-cols-2 divide-x divide-border/40">
            {/* Left Side - Prompt */}
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <span className="text-primary">system</span>
                <span>@interview</span>
              </div>
              <div className="space-y-4 min-h-[300px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTurn}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div
                      className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                        currentMessage?.role === "ai"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary/10 text-secondary"
                      }`}
                    >
                      {currentMessage?.role === "ai" ? "AI Interviewer" : "Candidate"}
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {displayedText}
                      {isTyping && (
                        <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse" />
                      )}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side - Assessment Badge */}
            <div className="p-8 flex flex-col justify-center items-center text-center bg-card/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage?.badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {CurrentIcon && (
                    <div className="inline-flex p-6 rounded-2xl bg-primary/10 border border-primary/20">
                      <CurrentIcon className="h-12 w-12 text-primary" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Assessing
                    </p>
                    <h3 className="text-2xl font-bold">{currentMessage?.badge}</h3>
                  </div>
                  <div className="flex gap-2 justify-center">
                    {conversation.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 rounded-full transition-all ${
                          index <= currentTurn
                            ? "w-8 bg-primary"
                            : "w-2 bg-border"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
