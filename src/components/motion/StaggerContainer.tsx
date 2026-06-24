"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { staggerContainer, reducedMotionVariants } from "@/lib/motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export default function StaggerContainer({
  children,
  className,
  stagger,
}: StaggerContainerProps) {
  const reduced = useReducedMotion();

  const variants = reduced
    ? reducedMotionVariants
    : {
        ...staggerContainer,
        visible: {
          transition: {
            staggerChildren: stagger ?? staggerContainer.visible.transition.staggerChildren,
            delayChildren: staggerContainer.visible.transition.delayChildren,
          },
        },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
