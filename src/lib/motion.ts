import tokens from "../../design-tokens.json";

const [m1, m2, m3] = tokens.motion.easing
  .replace("[", "")
  .replace("]", "")
  .split(",")
  .map((v) => parseFloat(v.trim()));

export const easeOutExpo = [m1 ?? 0.22, m2 ?? 1, m3 ?? 0.36, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: tokens.motion.duration.normal,
      ease: easeOutExpo,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: tokens.motion.duration.normal,
      ease: easeOutExpo,
    },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: tokens.motion.stagger,
      delayChildren: 0.1,
    },
  },
};

export const scaleOnHover = {
  scale: 1.02,
  transition: { duration: tokens.motion.duration.fast, ease: easeOutExpo },
};

export const reducedMotionVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};
