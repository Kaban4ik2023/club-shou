import { motion } from 'framer-motion';
import { User, Crown, MapPin, Music } from 'lucide-react';
import PriceCard from '../components/PriceCard';

const prices = [
  {
    title: 'Общая комната и вход',
    price: '10К',
    icon: MapPin,
  },
  {
    title: 'VIP зона',
    price: '10К',
    icon: Crown,
  },
  {
    title: 'Балкон на втором этаже',
    price: '5К',
    icon: MapPin,
  },
  {
    title: 'Заказать песню у DJ',
    price: '10К',
    description: 'Обращаться к диджею',
    icon: Music,
  },
  {
    title: 'Забрать стриптизершу в VIP зал',
    price: '50К',
    icon: User,
  },
  {
    title: 'Уединиться в VIP комнату',
    price: '100К',
    icon: Crown,
  },
  {
    title: 'Забрать стриптизершу навсегда',
    price: '500К',
    icon: User,
  },
];

export default function PricesSection() {
  return (
    <section id="prices" className="relative py-20 sm:py-28 bg-club-bg">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-club-gold/30 to-transparent" />
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-club-gold/20 via-transparent to-transparent hidden lg:block" />
      <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-club-gold/20 via-transparent to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-oswald font-extrabold text-4xl sm:text-5xl text-club-gold uppercase tracking-wide text-glow-gold">
            УСЛУГИ КЛУБА
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-club-gray font-inter mb-14 max-w-xl mx-auto"
        >
          Все расценки и оплату уточняйте у <span className="text-club-gold font-semibold">Максима Шоу</span> или <span className="text-club-gold font-semibold">Харуки</span>.
        </motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices.map((item, index) => (
            <PriceCard
              key={item.title}
              title={item.title}
              price={item.price}
              description={item.description}
              icon={item.icon}
              variant="gold"
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-club-gold/20 to-transparent" />
    </section>
  );
}
