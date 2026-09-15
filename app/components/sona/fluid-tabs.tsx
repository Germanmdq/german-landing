"use client";

import { Tabs } from "@base-ui/react/tabs";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/sona-utils";

export interface FluidTabItem {
  /** Stable value used to identify the tab. */
  value: string;
  /** Content displayed inside the tab trigger. */
  title: ReactNode;
  /** Whether the tab is unavailable. @default false */
  disabled?: boolean;
  /** ID of the external tab panel controlled by this tab. */
  ariaControls?: string;
}

export interface FluidTabsProps {
  /** Tabs displayed in the horizontal tab list. */
  tabs: FluidTabItem[];
  /** Controlled active tab value. */
  value?: string;
  /** Initially active tab for uncontrolled usage. */
  defaultValue?: string;
  /** Called when the active tab changes. */
  onValueChange?: (value: string) => void;
  /** Visual treatment for the active surface. @default "capsule" */
  variant?: "capsule" | "underline";
  /** Size of the tab triggers. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Accessible label for the tab list. @default "Tabs" */
  ariaLabel?: string;
  /**
   * Styling hook for the active surface.
   * @default Capsule uses the active surface token; underline uses foreground.
   */
  activeIndicatorClassName?: string;
  /** Optional styling hook for the supporting hover cue. @default "bg-[var(--fluid-tabs-hover)]" */
  hoverClassName?: string;
  /** Additional classes for the root container. */
  className?: string;
  /** Additional classes for the tab list. */
  listClassName?: string;
}

const tokenStyle = {
  "--fluid-tabs-surface": "#ececf0",
  "--fluid-tabs-surface-active": "#fff",
  "--fluid-tabs-label": "#6e6e73",
  "--fluid-tabs-label-active": "#1d1d1f",
} as CSSProperties;

export default function FluidTabs({
  tabs,
  value,
  defaultValue,
  onValueChange,
  variant = "capsule",
  size = "md",
  ariaLabel = "Tabs",
  activeIndicatorClassName,
  hoverClassName = "bg-[var(--fluid-tabs-hover)]",
  className,
  listClassName,
}: FluidTabsProps) {
  const layoutId = useId();
  const keyboardSelectionRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const fallbackValue = tabs.find((tab) => !tab.disabled)?.value;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? fallbackValue,
  );
  const activeValue = value ?? internalValue;

  useEffect(() => {
    keyboardSelectionRef.current = false;
  });

  return (
    <Tabs.Root
      value={value}
      defaultValue={defaultValue ?? fallbackValue}
      orientation="horizontal"
      onValueChange={(nextValue) => {
        if (typeof nextValue !== "string") return;
        if (value === undefined) setInternalValue(nextValue);
        onValueChange?.(nextValue);
      }}
      className={cn("sona-fluid-tabs", className)}
      data-size={size}
      data-variant={variant}
      style={tokenStyle}
    >
      <LayoutGroup id={layoutId}>
        <Tabs.List
          aria-label={ariaLabel}
          className={cn("sona-fluid-tabs-list", listClassName)}
        >
          {tabs.map((tab) => (
            <Tabs.Tab
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              aria-controls={tab.ariaControls}
              onKeyDown={() => {
                keyboardSelectionRef.current = true;
              }}
              onPointerDown={() => {
                keyboardSelectionRef.current = false;
              }}
              className={(state) => cn("sona-fluid-tab", state.active && "is-active")}
            >
              <span
                aria-hidden="true"
                className={cn("sona-fluid-hover", hoverClassName)}
              />
              {activeValue === tab.value && (
                <motion.span
                  aria-hidden="true"
                  layoutId={`${layoutId}-active`}
                  className={cn("sona-fluid-indicator", activeIndicatorClassName)}
                  transition={
                    shouldReduceMotion || keyboardSelectionRef.current
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 320,
                          damping: 40,
                          mass: 0.9,
                        }
                  }
                />
              )}
              <span className="sona-fluid-label">{tab.title}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </LayoutGroup>
    </Tabs.Root>
  );
}
