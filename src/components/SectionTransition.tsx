import React from 'react';
import { motion } from 'motion/react';

interface SectionTransitionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  amount?: number;
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  id,
  children,
  className = '',
  delay = 0,
  duration = 0.75,
  direction = 'up',
  amount = 0.1
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 40, x: 0 };
      case 'down':
        return { y: -40, x: 0 };
      case 'left':
        return { x: 40, y: 0 };
      case 'right':
        return { x: -40, y: 0 };
      case 'none':
        return { x: 0, y: 0 };
      default:
        return { y: 40, x: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, ...initialPos }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      {children}
    </motion.section>
  );
};

