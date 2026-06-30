import { motion } from "motion/react";
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
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 50, filter: "blur(10px)", scale: 0.95 };
      case "down":
        return { opacity: 0, y: -50, filter: "blur(10px)", scale: 0.95 };
      case "left":
        return { opacity: 0, x: 50, filter: "blur(10px)", scale: 0.95 };
      case "right":
        return { opacity: 0, x: -50, filter: "blur(10px)", scale: 0.95 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)", scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
