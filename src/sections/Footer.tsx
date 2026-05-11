import { motion } from 'framer-motion';
import { Phone, ExternalLink, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('80000085');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = '80000085';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer id="contacts" className="relative bg-club-dark py-16">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-club-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Logo & tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center md:text-left"
          >
            <h3 className="font-oswald font-extrabold text-3xl text-club-gold uppercase tracking-wider text-glow-gold">
              CLUB ШОУ
            </h3>
            <p className="mt-2 text-club-gray font-inter text-sm">
              Стриптиз-клуб №1 в штате WEST
            </p>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center"
          >
            <p className="text-club-gray font-inter text-sm mb-3">
              По всем вопросам:
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleCopy}
                className="group flex items-center gap-2 px-5 py-2.5 border border-club-gold/50 rounded-lg text-club-gold font-oswald text-lg hover:bg-club-gold hover:text-club-dark transition-all duration-200 cursor-pointer"
              >
                <Phone size={16} />
                <span>{copied ? 'СКОПИРОВАНО!' : '80000085'}</span>
              </button>
            </div>
            <p className="mt-3 text-club-gray font-inter text-xs">
              Максим Шоу • звонки и сообщения
            </p>
          </motion.div>

          {/* Server link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-club-gray font-inter text-sm mb-3">
              <span className="inline-flex items-center gap-1">
                <MapPin size={14} className="text-club-pink" />
                RPM Roleplay WEST
              </span>
            </p>
            <a
              href="https://rpmserver.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-club-pink/40 rounded-lg text-club-pink font-oswald text-sm hover:bg-club-pink hover:text-white transition-all duration-200"
            >
              rpmserver.com
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-club-gold/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-club-gray/60 font-inter text-xs">
              &copy; 2026 Club Шоу. Все права защищены.
            </p>
            <p className="text-club-gray/40 font-inter text-xs">
              Minecraft RPM Roleplay WEST
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
