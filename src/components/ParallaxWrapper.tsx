import { useRef } from 'react';
import type { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  rotate?: number;
  scale?: number;
}

export default function ParallaxWrapper({
  children,
  speed = 40,
  className = '',
  rotate = 0,
  scale = 0
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  const s = useTransform(scrollYProgress, [0, 1], [1 - scale, 1 + scale]);

  return (
    <motion.div ref={ref} style={{ y, rotate: r, scale: s }} className={className}>
      {children}
    </motion.div>
  );
}
