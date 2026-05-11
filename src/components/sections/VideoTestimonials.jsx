import { motion } from 'framer-motion';
import { Star, Play, Quotes } from '@phosphor-icons/react';

const testimonials = [
  { name: 'Marie Kouassi', role: 'Artisane formée', text: 'La formation macramé a changé ma vie. Aujourd hui je vis de ma passion.', color: '#008753' },
  { name: 'Jean-Baptiste Adjanohoun', role: 'Client fidèle', text: 'Des produits d une qualité exceptionnelle, je ne commande que chez AFI.', color: '#FCD116' },
  { name: 'Fatima Zakari', role: 'Diplômée 2024', text: 'L accompagnement de Mme TOSSA est incroyable. Je recommande à 100%.', color: '#E8112D' },
];

export default function VideoTestimonials() {
  return (
    <section className="py-20 bg-white dark:bg-gradient-to-br dark:from-[#1A1A1A] dark:to-[#0a2e1a] text-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#E8112D] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star size={12} weight="fill" className="text-[#FCD116]" />
            <span className="text-[#FCD116] text-xs font-bold tracking-widest uppercase">
              Ils nous font confiance
            </span>
            <Star size={12} weight="fill" className="text-[#FCD116]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black">
            Témoignages
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#FCD116] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FCD116]/30 transition-all duration-300"
            >
              <Quotes size={24} weight="duotone" style={{ color: testimonial.color }} className="mb-4 opacity-50" />
              <p className="text-white/80 text-sm italic mb-4">"{testimonial.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Play size={10} weight="fill" style={{ color: testimonial.color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-white/40">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
