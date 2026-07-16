import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

export function SectionReveal({
  children,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  const getInitial = () => {
    if (prefersReducedMotion) {
      return { opacity: 0 };
    }
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30, scale: 0.98 };
      case "down":
        return { opacity: 0, y: -30, scale: 0.98 };
      case "left":
        return { opacity: 0, x: 30, scale: 0.98 };
      case "right":
        return { opacity: 0, x: -30, scale: 0.98 };
    }
  };

  const getWhileInView = () => {
    if (prefersReducedMotion) {
      return { opacity: 1 };
    }
    return { opacity: 1, y: 0, x: 0, scale: 1 };
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getWhileInView()}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
