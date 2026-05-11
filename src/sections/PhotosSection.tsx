import { motion } from 'framer-motion';
import { Camera, Star } from 'lucide-react';
import PriceCard from '../components/PriceCard';
import CopyPhoneButton from '../components/CopyPhoneButton';

const photoServices = [
  {
    title: 'Фотография с витрины на балконе',
    price: '30К',
    icon: Camera,
    image: './assets/club-dj.jpg',
  },
  {
    title: 'Фото на заказ любой стриптизерши',
    price: '50К',
    icon: Star,
    image: './assets/club-stage2.jpg',
  },
  {
    title: 'Фото на заказ вместе со стриптизершой',
    price: '70К',
    icon: Camera,
    image: './assets/club-vip.jpg',
  },
];

export default function PhotosSection() {
  return (
    <section id="photos" className="relative py-20 sm:py-28 bg-club-bg">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-club-gold/30 to-transparent" />
      <div className="absolute -top-20 left-1/4 w-64 h-64 bg-club-gold/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-oswald font-extrabold text-4xl sm:text-5xl text-club-gold uppercase tracking-wide text-glow-gold">
            ФОТОГРАФИИ И ФОТОСЕССИИ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-14 max-w-xl mx-auto"
        >
          <p className="text-club-gray font-inter">
            За дополнительной информацией обращаться{' '}
            <span className="text-club-pink font-semibold">ТОЛЬКО</span>
            {' '}к <span className="text-club-gold font-semibold">Максим Шоу</span>.
          </p>
          <div className="mt-3">
            <CopyPhoneButton variant="gold" size="md" />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photoServices.map((item, index) => (
            <PriceCard
              key={item.title}
              title={item.title}
              price={item.price}
              icon={item.icon}
              variant="gold"
              index={index}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-club-gold/20 to-transparent" />
    </section>
  );
}
