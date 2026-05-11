import { useState, useCallback } from 'react';
import { Phone, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface CopyPhoneButtonProps {
  variant?: 'gold' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

export default function CopyPhoneButton({
  variant = 'gold',
  size = 'md',
  className = '',
  showIcon = true,
}: CopyPhoneButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText('80000085');
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = '80000085';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const isGold = variant === 'gold';

  const sizeClasses = {
    sm: 'px-4 py-1.5 text-sm gap-1.5',
    md: 'px-6 py-2 text-lg gap-2',
    lg: 'px-8 py-4 text-lg gap-3 tracking-wider uppercase',
  };

  const borderColor = isGold ? 'border-club-gold/60' : 'border-club-pink/60';
  const hoverBg = isGold ? 'hover:bg-club-gold' : 'hover:bg-club-pink';
  const hoverText = isGold ? 'hover:text-club-bg' : 'hover:text-white';
  const textColor = isGold ? 'text-club-gold' : 'text-club-pink';
  const shadow = isGold ? 'shadow-neon-gold' : 'shadow-neon-pink';

  return (
    <motion.button
      onClick={handleCopy}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        inline-flex items-center justify-center
        border-2 ${borderColor} rounded-lg
        font-oswald ${sizeClasses[size]}
        ${textColor} ${hoverBg} ${hoverText}
        transition-all duration-300 cursor-pointer
        ${shadow} hover:${shadow}
        ${className}
      `}
    >
      {showIcon &&
        (copied ? <Check size={size === 'lg' ? 20 : 16} /> : <Phone size={size === 'lg' ? 20 : 16} />)}
      <span>{copied ? 'СКОПИРОВАНО!' : '80000085'}</span>
    </motion.button>
  );
}
