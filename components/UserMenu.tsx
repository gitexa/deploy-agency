"use client";

import { useState } from "react";
import { useAuth } from "@/lib/context/AuthContext";
import { Button } from "@/components/ui/button";
import { User, LogOut, ChevronDown } from "lucide-react";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const userEmail = user.email || "";
  const displayName = user.user_metadata?.full_name || userEmail.split("@")[0];

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{displayName}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg z-50">
            <div className="p-4 border-b border-border">
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-xs text-muted-foreground truncate">
                {userEmail}
              </p>
            </div>
            
            <div className="p-2">
              <button
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-left"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
