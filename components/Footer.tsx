"use client";

import { Terminal, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card/20 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Motto */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">
                FDE Agency
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Code is abundant. Judgment is scarce.
            </p>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-muted-foreground/60 cursor-not-allowed">
                  Manifesto <span className="text-xs">(Soon)</span>
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/60 cursor-not-allowed">
                  FDE Salary Data <span className="text-xs">(Soon)</span>
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/60 cursor-not-allowed">
                  Agent API <span className="text-xs">(Soon)</span>
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground/60 cursor-not-allowed">
                  Documentation <span className="text-xs">(Soon)</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">
              Connect
            </h3>
            <div className="flex gap-4">
              <span className="text-muted-foreground/40 cursor-not-allowed" title="Coming Soon">
                <Github className="h-5 w-5" />
              </span>
              <span className="text-muted-foreground/40 cursor-not-allowed" title="Coming Soon">
                <Twitter className="h-5 w-5" />
              </span>
              <span className="text-muted-foreground/40 cursor-not-allowed" title="Coming Soon">
                <Linkedin className="h-5 w-5" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 FDE Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground/60 cursor-not-allowed">
              Privacy Policy <span>(Soon)</span>
            </span>
            <span className="text-xs text-muted-foreground/60 cursor-not-allowed">
              Terms of Service <span>(Soon)</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
