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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CheckCircle2, Building2, User } from "lucide-react";

interface PollModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

export function PollModal({ open, onOpenChange, email }: PollModalProps) {
  const [step, setStep] = useState<"role" | "challenge" | "success">("role");
  const [role, setRole] = useState<"company" | "engineer" | null>(null);
  const [challenge, setChallenge] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          role,
          challenge: challenge.trim() || null,
        }),
      });

      if (response.ok) {
        setStep("success");
      }
    } catch (err) {
      console.error("Failed to submit poll:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleSelection = (selectedRole: "company" | "engineer") => {
    setRole(selectedRole);
    setStep("challenge");
  };

  const handleSkipChallenge = () => {
    setChallenge("");
    handleSubmit();
  };

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

          {step === "challenge" && (
            <motion.div
              key="challenge"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  One last thing...
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="challenge">
                    What's your biggest challenge right now?{" "}
                    <span className="text-muted-foreground">(Optional)</span>
                  </Label>
                  <Textarea
                    id="challenge"
                    placeholder={
                      role === "company"
                        ? "e.g., Finding engineers who can actually ship, not just code..."
                        : "e.g., Getting past HR screens that don't test real skills..."
                    }
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSkipChallenge}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Skip
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}
                  </Button>
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
