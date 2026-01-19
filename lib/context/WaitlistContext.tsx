"use client";

import React, { createContext, useContext, useState } from "react";

interface WaitlistContextType {
  triggerWaitlist: () => void;
  onTrigger: (callback: () => void) => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(
  undefined
);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const [callback, setCallback] = useState<(() => void) | null>(null);

  const triggerWaitlist = () => {
    if (callback) {
      callback();
    }
  };

  const onTrigger = (cb: () => void) => {
    setCallback(() => cb);
  };

  return (
    <WaitlistContext.Provider value={{ triggerWaitlist, onTrigger }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error("useWaitlist must be used within a WaitlistProvider");
  }
  return context;
}
