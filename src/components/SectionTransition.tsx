import React from 'react';
import { motion } from 'motion/react';

interface SectionTransitionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  id,
  children,
  className = ''
}) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.section>
  );
};
