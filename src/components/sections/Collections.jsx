import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Star, Sparkle } from '@phosphor-icons/react';

export default function Collections() {
  const collections = [
    { name: 'AFISAC — Sacs macramé', href: '/catalogue/afisac', color: '#008753', count: 12 },
    { name: 'AFI PAGNE', href: '/catalogue/afi-pagne', color: '#FCD116', count: 8 },
    { name: 'AFI CHAUSSURE', href: '/catalogue/afi-chaussure', color: '#E8112D', count: 6 },
    { name: 'AFI VÊTEMENT', href: '/catalogue/afi-vetement', color: '#008753', count: 10 },
    { name: 'AFI TISSU', href: '/catalogue/afi-tissu', color: '#FCD116', count: 15 },
    { name: 'AFI MODE', href: '/catalogue/afi-mode', color: '#E8112D', count: 20 },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gradient-to-br dark:from-[#1A1A1A] dark:to-[#0a2e1a] text-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-40 right-20 w-96 h-96 rounded-full bg-[#FCD116] blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-[#008753] blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCD116]/10 border border-[#FCD116]/30 mb-6"
          >
            <Sparkle size={14} weight="fill" className="text-[#FCD116]" />
            <span className="text-[#FCD116] text-xs font-bold tracking-widest uppercase">Nos créations</span>
            <Sparkle size={14} weight="fill" className="text-[#FCD116]" />
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black">
            Collections
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#008753] via-[#FCD116] to-[#E8112D] mx-auto mt-8 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                to={item.href}
                className="group flex items-center justify-between p-6 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/15 hover:border-[#FCD116]/40 hover:bg-white/12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 duration-300"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <ShoppingBag size={22} weight="duotone" style={{ color: item.color }} />
                  </div>
                  <div>
                    <span className="text-white/90 group-hover:text-white transition-colors font-medium">
                      {item.name}
                    </span>
                    <p className="text-xs text-white/40 mt-1">{item.count} produits</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowRight size={16} className="text-white/30 group-hover:text-[#FCD116] group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border-2 border-white/25 text-white font-semibold text-base hover:border-[#FCD116] hover:text-[#FCD116] hover:bg-[#FCD116]/10 transition-all duration-300 hover:-translate-y-1"
          >
            Voir tout le catalogue
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
