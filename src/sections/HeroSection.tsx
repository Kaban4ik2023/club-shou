import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GlitchText from '../components/GlitchText';
import CopyPhoneButton from '../components/CopyPhoneButton';
import { loadSlim } from '@tsparticles/slim';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import type { ISourceOptions, Engine } from '@tsparticles/engine';

export default function HeroSection() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: false,
      background: {
        color: {
          value: 'transparent',
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: 'repulse',
          },
        },
        modes: {
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ['#D4A853', '#FF2D7B', '#D4A853'],
        },
        links: {
          enable: true,
          color: '#D4A853',
          opacity: 0.1,
          distance: 150,
        },
        move: {
          enable: true,
          speed: { min: 0.5, max: 1.5 },
          direction: 'none',
          random: true,
          straight: false,
          outModes: {
            default: 'bounce',
          },
        },
        number: {
          value: 60,
          density: {
            enable: true,
            area: 800,
          },
        },
        opacity: {
          value: { min: 0.3, max: 0.8 },
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 1, max: 3 },
        },
        glow: {
          enable: true,
          color: '#D4A853',
          radius: 10,
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./assets/club-hero.jpg"
          alt="Club interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-club-bg/70 via-club-bg/50 to-club-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-club-bg/60 via-transparent to-club-bg/60" />
      </div>

      {/* Particles */}
      {init && (
        <Particles
          id="hero-particles"
          options={options}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="font-oswald text-sm tracking-[0.3em] text-club-gray uppercase">
            RPM ROLEPLAY WEST • ШТАТ
          </span>
        </motion.div>

        <div className="mb-6">
          <GlitchText
            text="CLUB ШОУ"
            className="font-oswald font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-club-gold uppercase tracking-[0.1em] neon-text-gold"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-inter text-lg sm:text-xl text-club-gray max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Стриптиз-клуб №1 в штате. VIP-зоны, приватные комнаты, элитный отдых.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <CopyPhoneButton variant="gold" size="lg" />
          <a
            href="#prices"
            className="px-8 py-4 border-2 border-club-pink/60 rounded-lg text-club-pink font-oswald text-lg tracking-wider uppercase hover:bg-club-pink hover:text-white transition-all duration-300 shadow-neon-pink hover:shadow-neon-pink"
          >
            УСЛУГИ КЛУБА
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator — positioned at bottom of section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <a href="#prices" className="flex flex-col items-center gap-1 group cursor-pointer">
          <span className="font-oswald text-xs text-club-gray/60 uppercase tracking-widest group-hover:text-club-gold/80 transition-colors">
            Листай
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={32} className="text-club-gold/60 group-hover:text-club-gold transition-colors" />
          </motion.div>
        </a>
      </motion.div>

      {/* Neon line decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-club-gold/50 to-transparent z-20" />
    </section>
  );
}
