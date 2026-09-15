"use client";

import { Dialog } from "@base-ui/react/dialog";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext, useState } from "react";
import { motionTransition } from "../../lib/sona-motion";
import { cn } from "../../lib/sona-utils";

// ─── Context ─────────────────────────────────────────────────────────────────

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error(
      "AnimatedDialog subcomponents must be used within <AnimatedDialog>",
    );
  }
  return ctx;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AnimatedDialogProps {
  children: ReactNode;
  open?: boolean;
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Whether the dialog traps interaction inside the modal. @default true */
  modal?: boolean;
}

export interface AnimatedDialogContentProps {
  children: ReactNode;
  /**
   * Direction the dialog slides in from.
   * @default "bottom"
   */
  from?: "top" | "bottom" | "left" | "right" | "center";
  /**
   * Direction the dialog slides out to. Defaults to reversing the entrance.
   */
  exitTo?: "top" | "bottom" | "left" | "right" | "center";
  className?: string;
  /**
   * Class name for the backdrop overlay.
   */
  backdropClassName?: string;
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export function AnimatedDialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  modal = true,
}: AnimatedDialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <Dialog.Root
        open={open}
        defaultOpen={defaultOpen}
        modal={modal}
        onOpenChange={setOpen}
      >
        {children}
      </Dialog.Root>
    </DialogContext.Provider>
  );
}

// ─── Trigger ──────────────────────────────────────────────────────────────────

export function AnimatedDialogTrigger({
  children,
  className,
  ...props
}: Dialog.Trigger.Props) {
  return (
    <Dialog.Trigger
      className={typeof className === 'function' ? (state) => cn('sona-dialog-trigger', className(state)) : cn('sona-dialog-trigger', className)}
      {...props}
    >
      {children}
    </Dialog.Trigger>
  );
}

// ─── Content ──────────────────────────────────────────────────────────────────

const motionVariants = {
  initial: (from: string) => {
    switch (from) {
      case "top":
        return { y: -24, opacity: 0, scale: 0.97 };
      case "bottom":
        return { y: 24, opacity: 0, scale: 0.97 };
      case "left":
        return { x: -24, opacity: 0, scale: 0.97 };
      case "right":
        return { x: 24, opacity: 0, scale: 0.97 };
      default:
        return { scale: 0.95, opacity: 0 };
    }
  },
  animate: {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  },
  exit: (exitTo: string) => {
    switch (exitTo) {
      case "top":
        return { y: -20, opacity: 0, scale: 0.97 };
      case "bottom":
        return { y: 20, opacity: 0, scale: 0.97 };
      case "left":
        return { x: -20, opacity: 0, scale: 0.97 };
      case "right":
        return { x: 20, opacity: 0, scale: 0.97 };
      default:
        return { scale: 0.95, opacity: 0 };
    }
  },
};

export function AnimatedDialogContent({
  children,
  from = "bottom",
  exitTo,
  className,
  backdropClassName,
}: AnimatedDialogContentProps) {
  const { open } = useDialogContext();
  const shouldReduceMotion = useReducedMotion();
  const resolvedExitTo = exitTo ?? from;

  return (
    <Dialog.Portal>
      <AnimatePresence custom={resolvedExitTo}>
        {open && (
          <>
            {/* Backdrop Overlay */}
            <Dialog.Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    shouldReduceMotion
                      ? motionTransition.reduced
                      : motionTransition.enter
                  }
                  className={cn("sona-dialog-backdrop", backdropClassName)}
                />
              }
            />

            {/* Positioner centering the popup */}
            <div className="sona-dialog-positioner">
              <Dialog.Popup
                className="sona-dialog-popup"
                render={
                  <motion.div
                    custom={from}
                    variants={shouldReduceMotion ? {} : motionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={
                      shouldReduceMotion
                        ? motionTransition.reduced
                        : motionTransition.enter
                    }
                    className={cn("sona-dialog-content", className)}
                  >
                    {children}
                  </motion.div>
                }
              />
            </div>
          </>
        )}
      </AnimatePresence>
    </Dialog.Portal>
  );
}

// ─── Title ────────────────────────────────────────────────────────────────────

export function AnimatedDialogTitle({
  className,
  ...props
}: Dialog.Title.Props) {
  return (
    <Dialog.Title
      className={typeof className === 'function' ? (state) => cn('sona-dialog-title', className(state)) : cn('sona-dialog-title', className)}
      {...props}
    />
  );
}

// ─── Description ──────────────────────────────────────────────────────────────

export function AnimatedDialogDescription({
  className,
  ...props
}: Dialog.Description.Props) {
  return (
    <Dialog.Description
      className={typeof className === 'function' ? (state) => cn('sona-dialog-description', className(state)) : cn('sona-dialog-description', className)}
      {...props}
    />
  );
}

// ─── Close ────────────────────────────────────────────────────────────────────

export function AnimatedDialogClose({
  className,
  ...props
}: Dialog.Close.Props) {
  return (
    <Dialog.Close
      className={typeof className === 'function' ? (state) => cn('sona-dialog-close', className(state)) : cn('sona-dialog-close', className)}
      {...props}
    />
  );
}
