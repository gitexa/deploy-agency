"use client";

import { Terminal } from "lucide-react";
import { useViewMode } from "@/lib/context/ViewModeContext";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const { viewMode, toggleViewMode } = useViewMode();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Terminal className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">TalentLoop</span>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-2 rounded-full border border-border/40 bg-card/50 p-1">
          <button
            onClick={() => viewMode !== "company" && toggleViewMode()}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "company"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Hiring Talent
          </button>
          <button
            onClick={() => viewMode !== "engineer" && toggleViewMode()}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "engineer"
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Joining as FDE
          </button>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" className="text-sm">
            Login
          </Button>
          <Button variant="outline" className="text-sm">
            Book Demo
          </Button>
          <Button className="text-sm">Apply to Pool</Button>
        </div>
      </div>
    </nav>
  );
}
