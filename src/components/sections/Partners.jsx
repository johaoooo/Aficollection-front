import { motion } from 'framer-motion';
import { Star, Buildings } from '@phosphor-icons/react';

const partners = [
  { name: 'Chambre de Commerce du Bénin' },
  { name: 'Ministère du Tourisme' },
  { name: 'Programme AFIDOG' },
  { name: 'Union Européenne' },
  { name: 'GIZ Bénin' },
  { name: 'ADIN' },
];

export default function Partners() {
  return (
    <section className="py-16 bg-white dark:bg-gradient-to-br dark:from-[#1A1A1A] dark:to-[#0a2e1a] text-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-[#FCD116] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={12} weight="fill" className="text-[#FCD116]" />
            <span className="text-[#FCD116] text-xs font-bold tracking-widest uppercase">
              Nos partenaires
            </span>
            <Star size={12} weight="fill" className="text-[#FCD116]" />
          </div>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#FCD116] to-transparent mx-auto" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#FCD116]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Buildings size={14} className="text-white/30 group-hover:text-[#FCD116] transition-colors" />
                <span className="text-white/50 group-hover:text-white text-sm transition-colors">
                  {partner.name}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
