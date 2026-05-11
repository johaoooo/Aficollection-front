import { motion } from 'framer-motion';
import { Star, Heart, Handshake, Trophy, Diamond, Shield } from '@phosphor-icons/react';

const features = [
  { icon: Heart, title: 'Artisanat authentique', desc: 'Pièces uniques faites main au Bénin', color: '#E8112D' },
  { icon: Trophy, title: 'Qualité premium', desc: 'Matériaux soigneusement sélectionnés', color: '#FCD116' },
  { icon: Handshake, title: 'Commerce équitable', desc: 'Partenaires locaux rémunérés justement', color: '#008753' },
  { icon: Diamond, title: 'Savoir-faire ancestral', desc: 'Techniques transmises depuis 2015', color: '#FCD116' },
  { icon: Shield, title: 'Satisfaction garantie', desc: 'Service client réactif et à l\'écoute', color: '#008753' },
  { icon: Star, title: 'Certification', desc: 'Formations reconnues et diplômantes', color: '#E8112D' },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-white dark:bg-gradient-to-br dark:from-[#1A1A1A] dark:to-[#0a2e1a] text-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-[#008753] blur-3xl" />
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
              Pourquoi nous choisir
            </span>
            <Star size={12} weight="fill" className="text-[#FCD116]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-black">
            Notre engagement
          </h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#FCD116] to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FCD116]/30 hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}20` }}
              >
                <feature.icon size={22} weight="duotone" style={{ color: feature.color }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/50 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
