"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Loader2, CheckCircle2, Building2, User, ChevronLeft } from "lucide-react";
import { QuestionCard } from "@/components/qualification/QuestionCard";
import { RadioOption } from "@/components/qualification/RadioOption";

interface QualificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

type Step = "role" | "q1" | "q2" | "q3" | "q4" | "success";

interface QualificationData {
  role: "company" | "engineer" | null;
  // Engineer fields
  current_status?: string;
  fde_persona?: string;
  assessment_preference?: string;
  seniority_rate?: string;
  // Company fields
  technical_pain?: string;
  hiring_urgency?: string;
  engagement_model?: string;
  hiring_bottleneck?: string;
}

export function QualificationModal({ open, onOpenChange, email }: QualificationModalProps) {
  const [step, setStep] = useState<Step>("role");
  const [data, setData] = useState<QualificationData>({ role: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const engineerQuestions = [
    {
      key: "current_status",
      title: "What's your current status?",
      description: "Help us understand your availability",
      options: [
        { id: "active", label: "Active", desc: "Ready to interview and start within 2-4 weeks" },
        { id: "passive", label: "Passive", desc: "Employed, but open to the right \"Special Ops\" role" },
        { id: "student_junior", label: "Student/Junior", desc: "Looking for internships or entry-level roles" },
      ],
    },
    {
      key: "fde_persona",
      title: "Which best describes you?",
      description: "Understanding your work style",
      options: [
        { id: "pure_backend", label: "Pure Backend", desc: "I prefer deep coding in isolation; keep me away from clients" },
        { id: "forward_deployed", label: "Forward Deployed", desc: "I thrive on messy integrations, client calls, and shipping to production" },
        { id: "product_management", label: "Product/Management", desc: "I prefer managing roadmaps over writing code" },
      ],
    },
    {
      key: "assessment_preference",
      title: "How would you prefer to be assessed?",
      description: "Your ideal interview style",
      options: [
        { id: "standard_leetcode", label: "Standard", desc: "I prefer LeetCode/Algorithmic puzzles" },
        { id: "practical_simulation", label: "Practical", desc: "I prefer debugging a broken AI agent or fixing a real repo" },
        { id: "portfolio_only", label: "Portfolio", desc: "Judge me solely on my GitHub/Previous work" },
      ],
    },
    {
      key: "seniority_rate",
      title: "What's your experience level?",
      description: "This helps us match you with appropriate opportunities",
      options: [
        { id: "junior", label: "Junior", desc: "< $80k/year (I need mentorship)" },
        { id: "senior", label: "Senior", desc: "$120k-$200k (I ship independently)" },
        { id: "elite_staff", label: "Elite/Staff", desc: "$250k+ (I architect systems and lead teams)" },
      ],
    },
  ];

  const companyQuestions = [
    {
      key: "technical_pain",
      title: "What's your primary technical need?",
      description: "Understanding your challenge",
      options: [
        { id: "research", label: "Research", desc: "We need to train/fine-tune custom models (Need PhDs)" },
        { id: "implementation", label: "Implementation", desc: "We have APIs/Models but can't integrate them into our legacy stack" },
        { id: "maintenance", label: "Maintenance", desc: "We need someone to fix bugs in existing software" },
      ],
    },
    {
      key: "hiring_urgency",
      title: "What's your hiring timeline?",
      description: "Understanding your urgency",
      options: [
        { id: "critical", label: "Critical", desc: "We needed this person yesterday (High willingness to pay)" },
        { id: "planned", label: "Planned", desc: "Hiring for next quarter" },
        { id: "browsing", label: "Browsing", desc: "Just curious about AI hiring" },
      ],
    },
    {
      key: "engagement_model",
      title: "What type of engagement are you looking for?",
      description: "Understanding your hiring model",
      options: [
        { id: "contract_project", label: "Contract/Project", desc: "Short-term \"SWAT team\" deployment (3-6 months)" },
        { id: "contract_to_hire", label: "Contract-to-Hire", desc: "Trial period before full-time" },
        { id: "full_time", label: "Full-Time", desc: "Permanent role only" },
      ],
    },
    {
      key: "hiring_bottleneck",
      title: "What's your biggest hiring challenge?",
      description: "Understanding where we can help most",
      options: [
        { id: "sourcing", label: "Sourcing", desc: "We can't find engineers who understand AI and legacy systems" },
        { id: "vetting", label: "Vetting", desc: "We find them, but assessing their skills takes too much engineering time" },
        { id: "closing", label: "Closing", desc: "We can't compete on salary with big tech" },
      ],
    },
  ];

  const questions = data.role === "engineer" ? engineerQuestions : companyQuestions;

  const handleRoleSelection = (selectedRole: "company" | "engineer") => {
    setData({ ...data, role: selectedRole });
    setStep("q1");
  };

  const getQuestionIndex = (step: Step): number => {
    const stepMap: Record<string, number> = { q1: 0, q2: 1, q3: 2, q4: 3 };
    return stepMap[step] || 0;
  };

  const handleNext = () => {
    const stepOrder: Step[] = ["role", "q1", "q2", "q3", "q4", "success"];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    const stepOrder: Step[] = ["role", "q1", "q2", "q3", "q4"];
    const currentIndex = stepOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          ...data,
        }),
      });

      if (response.ok) {
        setStep("success");
      } else {
        console.error("Failed to submit qualification");
      }
    } catch (err) {
      console.error("Failed to submit qualification:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isQuestionStep = step.startsWith("q");
  const currentQuestion = isQuestionStep ? questions[getQuestionIndex(step)] : null;
  const currentValue = currentQuestion ? (data as any)[currentQuestion.key] : undefined;
  const canProceed = isQuestionStep ? !!currentValue : true;

  const totalSteps = 5; // role + 4 questions
  const currentStepNumber = step === "role" ? 1 : getQuestionIndex(step) + 2;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <AnimatePresence mode="wait">
          {step === "role" && (
            <motion.div
              key="role"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Welcome aboard! 🎉
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <p className="text-muted-foreground">
                  Quick question: What brings you to FDE Agency?
                </p>

                <div className="grid gap-4">
                  <button
                    onClick={() => handleRoleSelection("company")}
                    className="group relative flex items-center gap-4 p-6 rounded-lg border-2 border-border hover:border-primary transition-all bg-card hover:bg-card/80"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Hiring Talent</h3>
                      <p className="text-sm text-muted-foreground">
                        I'm looking to hire FDEs for my company
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleSelection("engineer")}
                    className="group relative flex items-center gap-4 p-6 rounded-lg border-2 border-border hover:border-secondary transition-all bg-card hover:bg-card/80"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-all">
                      <User className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Looking for Work</h3>
                      <p className="text-sm text-muted-foreground">
                        I'm an engineer seeking opportunities
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {isQuestionStep && currentQuestion && (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <div className="flex items-center justify-between mb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBack}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {currentStepNumber} of {totalSteps}
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold">
                  {currentQuestion.title}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-6">
                <RadioGroup
                  value={currentValue}
                  onValueChange={(value) => {
                    setData({ ...data, [currentQuestion.key]: value });
                  }}
                >
                  <QuestionCard
                    title=""
                    description={currentQuestion.description}
                  >
                    {currentQuestion.options.map((option) => (
                      <RadioOption
                        key={option.id}
                        value={option.id}
                        label={option.label}
                        description={option.desc}
                      />
                    ))}
                  </QuestionCard>
                </RadioGroup>

                <div className="mt-6 flex justify-end">
                  {step === "q4" ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={!canProceed || isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Complete"
                      )}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="w-full"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              <div className="text-center space-y-6">
                <div className="inline-flex p-6 rounded-full bg-primary/10">
                  <CheckCircle2 className="h-16 w-16 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">You're all set!</h3>
                  <p className="text-muted-foreground">
                    We'll notify you when FDE Agency launches.
                    <br />
                    Check your inbox for confirmation.
                  </p>
                </div>
                <Button onClick={() => onOpenChange(false)} className="mt-4">
                  Got it!
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
