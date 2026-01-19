"use client";

import { Card } from "@/components/ui/card";
import { GitCommit, Building2, Briefcase, DollarSign } from "lucide-react";

const roles = [
  {
    role: "Lead FDE (Contract)",
    client: "Logistics SMB",
    task: "Build autonomous supply chain routing agent",
    comp: "$180/hr",
  },
  {
    role: "AI Architect",
    client: "Legal Firm",
    task: "Fine-tune Llama-3 on case law documents",
    comp: "$22k Fixed",
  },
  {
    role: "Systems Engineer",
    client: "HealthTech",
    task: "HIPAA-compliant voice agent for patient intake",
    comp: "$150k/yr + Equity",
  },
  {
    role: "ML Engineer",
    client: "FinTech Startup",
    task: "Real-time fraud detection with LLM reasoning",
    comp: "$165/hr",
  },
  {
    role: "Forward Deployed Eng",
    client: "Energy Co",
    task: "Predictive maintenance agent for solar farms",
    comp: "$28k Fixed",
  },
  {
    role: "AI Integration Lead",
    client: "E-commerce",
    task: "Personalized shopping assistant with RAG",
    comp: "$140k/yr",
  },
];

// Duplicate roles for seamless infinite scroll
const duplicatedRoles = [...roles, ...roles];

export function ActiveRoles() {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl mb-12">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Active Deployments
          </h2>
          <p className="text-muted-foreground text-lg">
            Live roles our FDEs are filling right now
          </p>
        </div>
      </div>

      <div className="relative">
        {/* Gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 gradient-fade-left z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 gradient-fade-right z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div className="flex gap-6 animate-marquee">
          {duplicatedRoles.map((role, index) => (
            <Card
              key={index}
              className="min-w-[400px] p-6 border-border/40 bg-card/50 backdrop-blur-sm flex-shrink-0"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <GitCommit className="h-5 w-5 text-primary" />
                    <span className="font-mono text-sm text-muted-foreground">
                      #LIVE
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-primary font-mono text-sm font-medium">
                    <DollarSign className="h-4 w-4" />
                    {role.comp}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="font-bold text-foreground">
                      {role.role}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {role.client}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-foreground pt-2 border-t border-border/40">
                  {role.task}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
