import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Images pour chaque slide
const sacImage = '/sac.png';
const sac1Image = '/sac1.jpeg';
const sac5Image = '/sac5.jpeg';
const sac6Image = '/sac6.jpeg';
const sac7Image = '/sac7.jpeg';

const slides = [
  {
    id: 1,
    title: 'Sacs Macramé',
    titleAccent: 'Artisanaux',
    subtitle: 'Fait main au Bénin',
    description: 'Chaque sac est tissé à la main par nos artisanes.',
    cta: { label: 'Voir la collection', href: '/catalogue/afisac' },
    ctaSecondary: { label: 'En savoir plus', href: '/formations/macrame' },
    backgroundImage: sacImage,
    objectPosition: 'center',
  },
  {
    id: 2,
    title: 'Teinture de',
    titleAccent: 'Pagne',
    subtitle: 'Couleurs naturelles',
    description: 'Découvrez l\'art de la teinture traditionnelle.',
    cta: { label: 'Voir les pagnes', href: '/catalogue/afi-page' },
    ctaSecondary: { label: 'Suivre une formation', href: '/formations/pagne' },
    backgroundImage: sac1Image,
    objectPosition: 'center',
  },
  {
    id: 3,
    title: 'Produits au',
    titleAccent: 'Sésame & Soja',
    subtitle: 'Du champ à l\'assiette',
    description: 'Sauces, bouillies, chips et épices élaborées au Bénin.',
    cta: { label: 'Découvrir les produits', href: '/produits' },
    ctaSecondary: { label: 'Nos formations', href: '/formations' },
    backgroundImage: sac5Image,
    objectPosition: 'center',
  },
  {
    id: 4,
    title: 'Nouvelle',
    titleAccent: 'Collection',
    subtitle: 'Exclusivité AFI',
    description: 'Découvrez les dernières créations de nos artisanes.',
    cta: { label: 'Voir la collection', href: '/catalogue' },
    ctaSecondary: { label: 'Contactez-nous', href: '/contact' },
    backgroundImage: sac6Image,
    objectPosition: 'top',
  },
  {
    id: 5,
    title: 'Collection',
    titleAccent: 'Élégance',
    subtitle: 'Sacs raffinés',
    description: 'Des créations uniques pour toutes les occasions.',
    cta: { label: 'Voir la collection', href: '/catalogue/afisac' },
    ctaSecondary: { label: 'En savoir plus', href: '/formations/macrame' },
    backgroundImage: sac7Image,
    objectPosition: 'center',
  },
];

const textVariants = {
  enter: { opacity: 0, x: -50 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 }
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, paused]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-[86px]">
      
      {/* Image de fond qui change selon le slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={slide.backgroundImage}
            alt="AFI Collection background"
            className="w-full h-full object-cover"
            style={{ objectPosition: slide.objectPosition }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Contenu à gauche */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <div className="flex flex-col items-start">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              {/* Titre */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-[1.1]">
                {slide.title}
                <br />
                <span className="text-[#FCD116]">
                  {slide.titleAccent}
                </span>
              </h1>

              {/* Sous-titre */}
              <p className="text-sm font-semibold tracking-[0.15em] uppercase text-[#FCD116] mb-4">
                {slide.subtitle}
              </p>

              {/* Description */}
              <p className="text-base text-white/80 leading-relaxed mb-8 max-w-lg">
                {slide.description}
              </p>

              {/* Boutons CTA */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to={slide.cta.href}
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-full bg-[#FCD116] text-gray-900 text-sm font-semibold transition-all duration-300 hover:scale-105"
                >
                  {slide.cta.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to={slide.ctaSecondary.href}
                  className="inline-flex items-center gap-2 px-6 md:px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white text-sm font-semibold transition-all duration-300 hover:bg-white/20"
                >
                  {slide.ctaSecondary.label}
                </Link>
              </div>

              {/* Navigation - sans l'indicateur texte */}
              <div className="flex items-center gap-6 mt-12">
                <div className="flex gap-3">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="flex gap-2">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className="transition-all duration-300 rounded-full h-1.5"
                      style={{
                        width: idx === current ? 28 : 8,
                        background: idx === current ? '#FCD116' : 'rgba(255,255,255,0.4)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
