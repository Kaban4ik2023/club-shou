import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'div';
}

export default function GlitchText({ text, className = '', as: Tag = 'h1' }: GlitchTextProps) {
  return (
    <Tag className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-club-gold z-20 animate-glitch-1 opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0, 1, 0] }}
        transition={{ duration: 0.8, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] }}
        style={{ clipPath: 'inset(0 0 85% 0)' }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-club-pink z-20 animate-glitch-2 opacity-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0, 1, 0] }}
        transition={{ duration: 0.8, delay: 0.05, times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1] }}
        style={{ clipPath: 'inset(85% 0 0 0)' }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </Tag>
  );
}
