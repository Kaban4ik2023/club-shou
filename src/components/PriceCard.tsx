import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface PriceCardProps {
  title: string;
  price: string;
  description?: string;
  icon?: LucideIcon;
  variant?: 'gold' | 'pink';
  index?: number;
  image?: string;
}

export default function PriceCard({ title, price, description, icon: Icon, variant = 'gold', index = 0, image }: PriceCardProps) {
  const isGold = variant === 'gold';
  const borderColor = isGold ? 'border-club-gold/30' : 'border-club-pink/30';
  const hoverBorder = isGold ? 'hover:border-club-gold/80' : 'hover:border-club-pink/80';
  const hoverShadow = isGold ? 'hover:shadow-card-hover-gold' : 'hover:shadow-card-hover-pink';
  const textColor = isGold ? 'text-club-gold' : 'text-club-pink';
  const glowClass = isGold ? 'text-glow-gold' : 'text-glow-pink';
  const iconBg = isGold ? 'bg-club-gold/10' : 'bg-club-pink/10';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`relative bg-club-card border ${borderColor} ${hoverBorder} rounded-lg p-6 ${hoverShadow} transition-all duration-300 cursor-default overflow-hidden`}
    >
      {/* Shimmer overlay on hover */}
      <div className="absolute inset-0 shimmer-bg opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {image && (
        <div className="relative -mx-6 -mt-6 mb-4 h-40 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-club-card to-transparent" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-oswald font-semibold text-lg text-white uppercase tracking-wide">
            {title}
          </h3>
          {Icon && (
            <div className={`p-2 rounded-lg ${iconBg}`}>
              <Icon size={20} className={textColor} />
            </div>
          )}
        </div>

        <div className={`font-oswald font-extrabold text-3xl ${textColor} ${glowClass}`}>
          {price}
        </div>

        {description && (
          <p className="mt-2 text-club-gray text-sm font-inter">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
