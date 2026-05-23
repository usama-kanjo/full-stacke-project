"use client";

import { useCallback, useState } from "react";

export type AuthStep
  = | "login"
    | "register"
    | "verify"
    | "forgot-password"
    | "reset-password";

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<AuthStep>("login");
  const [slideDirection, setSlideDirection] = useState<"left" | "right">(
    "right",
  );
  const [sharedEmail, setSharedEmail] = useState("");

  const open = useCallback((initialStep: AuthStep = "login") => {
    setStep(initialStep);
    setSlideDirection("right");
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setStep("login");
    setSharedEmail("");
  }, []);

  const goTo = useCallback(
    (nextStep: AuthStep, direction: "left" | "right" = "right") => {
      setSlideDirection(direction);
      const timer = setTimeout(() => {
        setStep(nextStep);
        setSlideDirection("right");
      }, 150);
      return () => clearTimeout(timer);
    },
    [],
  );

  const navigate = useCallback(
    (nextStep: AuthStep) => {
      const isForward
        = (step === "login" && nextStep === "register")
          || (step === "register" && nextStep === "verify")
          || (step === "login" && nextStep === "forgot-password");

      setSlideDirection(isForward ? "left" : "right");
      setTimeout(() => {
        setStep(nextStep);
      }, 200);
    },
    [step],
  );

  return {
    isOpen,
    step,
    slideDirection,
    sharedEmail,
    setSharedEmail,
    open,
    close,
    goTo,
    navigate,
  };
}
