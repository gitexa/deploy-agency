"use client";

import React, { createContext, useContext, useRef, useCallback } from "react";

interface WaitlistContextType {
  triggerWaitlist: () => void;
  registerCallback: (callback: () => void) => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(
  undefined
);

export function WaitlistProvider({ children }: { children: React.ReactNode }) {
  const callbackRef = useRef<(() => void) | null>(null);

  const triggerWaitlist = useCallback(() => {
    if (callbackRef.current) {
      callbackRef.current();
    }
  }, []);

  const registerCallback = useCallback((cb: () => void) => {
    callbackRef.current = cb;
  }, []);

  return (
    <WaitlistContext.Provider value={{ triggerWaitlist, registerCallback }}>
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
