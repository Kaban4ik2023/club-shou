import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import PriceCard from '../components/PriceCard';
import CopyPhoneButton from '../components/CopyPhoneButton';

const events = [
  {
    title: 'Снять клуб (нерабочее время)',
    price: '100К',
    description: 'Полный доступ ко всем зонам клуба в нерабочее время',
    icon: Calendar,
    image: './assets/club-hall.jpg',
  },
  {
    title: 'Снять клуб (рабочее время)',
    price: '200К',
    description: 'Полный доступ ко всем зонам клуба в рабочее время',
    icon: Clock,
    image: './assets/club-balcony.jpg',
  },
  {
    title: 'Оплата за каждого сотрудника',
    price: '20К',
    description: 'Индивидуальная оплата за персонал на мероприятии',
    icon: Users,
    image: './assets/club-vip-people.jpg',
  },
];

export default function EventsSection() {
  return (
    <section id="events" className="relative py-20 sm:py-28" style={{ background: 'linear-gradient(to bottom, #0A0A0F, #1A1020)' }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-club-pink/30 to-transparent" />
      <div className="absolute -top-20 right-0 w-64 h-64 bg-club-pink/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 left-0 w-64 h-64 bg-club-pink/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="font-oswald font-extrabold text-4xl sm:text-5xl text-club-pink uppercase tracking-wide text-glow-pink">
            ОРГАНИЗАЦИЯ МЕРОПРИЯТИЙ
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
            Заранее договариваться с{' '}
            <span className="text-club-pink font-semibold">Максим Шоу</span>
          </p>
          <div className="mt-3">
            <CopyPhoneButton variant="pink" size="md" />
          </div>
          <p className="text-club-gray text-sm font-inter mt-2">
            (звонки и сообщения)
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((item, index) => (
            <PriceCard
              key={item.title}
              title={item.title}
              price={item.price}
              description={item.description}
              icon={item.icon}
              variant="pink"
              index={index}
              image={item.image}
            />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-club-pink/20 to-transparent" />
    </section>
  );
}
