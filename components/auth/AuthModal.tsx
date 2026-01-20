"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultView?: "login" | "signup";
}

export function AuthModal({ open, onOpenChange, defaultView = "login" }: AuthModalProps) {
  const [view, setView] = useState<"login" | "signup">(defaultView);

  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {view === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {view === "login"
              ? "Log in to access your account"
              : "Sign up to get started"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {view === "login" ? (
            <LoginForm
              onSuccess={handleSuccess}
              onSwitchToSignup={() => setView("signup")}
            />
          ) : (
            <SignupForm
              onSuccess={handleSuccess}
              onSwitchToLogin={() => setView("login")}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
