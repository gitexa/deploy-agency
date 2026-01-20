"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, Check } from "lucide-react";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (email: string) => void;
}

export function WaitlistModal({
  open,
  onOpenChange,
  onSuccess,
}: WaitlistModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsSubmitting(true);
    setError(null);

    // Store email temporarily in localStorage for the poll
    localStorage.setItem("waitlist_email", data.email);
    localStorage.setItem("waitlist_submitted", "true");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          setError("This email is already on the waitlist!");
        } else {
          setError(errorData.error || "Something went wrong. Please try again.");
        }
        setIsSubmitting(false);
        return;
      }

      // Success!
      reset();
      onOpenChange(false);
      onSuccess(data.email);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Join the Waitlist
          </DialogTitle>
          <DialogDescription>
            Be the first to know when FDE Agency launches. Get exclusive early
            access and priority onboarding.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-10"
                {...register("email")}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Join Waitlist
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            We respect your privacy. No spam, ever.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
