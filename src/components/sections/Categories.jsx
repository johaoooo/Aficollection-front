import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Needle, Swatches, Plant, Leaf, ArrowRight, Plus, Sparkle } from '@phosphor-icons/react';

const categories = [
  {
    id: 'macrame',
    name: 'Macramé & Tricotage',
    icon: Needle,
    color: '#008753',
    href: '/formations/macrame',
    description: 'Sacs, vêtements, ameublement et formation certifiante',
    subItems: [
      { name: 'Sacs Macramé', href: '/catalogue/afisac' },
      { name: 'Vêtements Macramé', href: '/catalogue/afi-vetement' },
      { name: 'Ameublement & Décoration', href: '/catalogue/ameublement' },
      { name: 'Formation Macramé', href: '/formations/macrame' },
    ],
  },
  {
    id: 'pagne',
    name: 'Teinture de Pagne',
    icon: Swatches,
    color: '#FCD116',
    href: '/catalogue/afi-page',
    description: 'Pagnes, tenues, revêtements et décoration artisanale',
    subItems: [
      { name: 'Pagnes bruts', href: '/catalogue/afi-page' },
      { name: 'Tenues traditionnelles', href: '/catalogue/afi-vetement' },
      { name: 'Revêtements & Couvertures', href: '/catalogue/revetements' },
      { name: 'Rideaux & Décoration', href: '/catalogue/deco' },
    ],
  },
  {
    id: 'sesame',
    name: 'Filière Sésame',
    icon: Plant,
    color: '#E8112D',
    href: '/formations/sesame',
    description: 'Produits dérivés du sésame, alimentation et cosmétique',
    subItems: [
      { name: 'Sauce sésame', href: '/produits/sauce-sesame' },
      { name: 'Bouillie sésame', href: '/produits/bouillie-sesame' },
      { name: 'Chips sésame', href: '/produits/chips-sesame' },
      { name: 'Épices sésame', href: '/produits/epices-sesame' },
    ],
  },
  {
    id: 'soja',
    name: 'Filière Soja',
    icon: Leaf,
    color: '#008753',
    href: '/formations/soja',
    description: 'Produits dérivés du soja, alimentation santé',
    subItems: [
      { name: 'Bouillie soja', href: '/produits/bouillie-soja' },
      { name: 'Chips soja', href: '/produits/chips-soja' },
      { name: 'Sauce soja', href: '/produits/sauce-soja' },
      { name: 'Épices soja', href: '/produits/epices-soja' },
    ],
  },
];

export default function Categories() {
  const [expandedId, setExpandedId] = useState(null);

  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* En-tête */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#008753]/10 dark:bg-[#008753]/20 mb-6">
            <Sparkle size={14} className="text-[#008753]" />
            <span className="text-[#008753] dark:text-[#4ade80] text-xs font-semibold uppercase tracking-wider">
              Notre savoir-faire
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            Nos domaines
            <span className="text-[#008753] dark:text-[#4ade80]"> d'excellence</span>
          </h2>
          
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Des formations certifiantes pour acquérir un savoir-faire unique et valorisant
          </p>
        </div>

        {/* Grille des catégories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, index) => {
            const isOpen = expandedId === cat.id;
            const Icon = cat.icon;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div 
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700"
                  onClick={() => toggle(cat.id)}
                >
                  <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                          style={{ backgroundColor: `${cat.color}15` }}
                        >
                          <Icon size={28} weight="duotone" style={{ color: cat.color }} />
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggle(cat.id); }}
                        className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                        style={{ backgroundColor: isOpen ? cat.color : 'transparent', borderColor: isOpen ? cat.color : undefined }}
                      >
                        <Plus size={16} weight="bold" className={isOpen ? 'text-white' : ''} />
                      </button>
                    </div>

                    {/* Titre et description */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{cat.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{cat.description}</p>

                    {/* Sous-items */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex flex-wrap gap-3">
                              {cat.subItems.map((item, idx) => (
                                <Link
                                  key={idx}
                                  to={item.href}
                                  onClick={(e) => e.stopPropagation()}
                                  className="px-4 py-2 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-200"
                                  style={{ backgroundColor: isOpen ? cat.color : undefined }}
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                            <Link
                              to={cat.href}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold transition-all duration-300 hover:gap-3"
                              style={{ color: cat.color }}
                            >
                              Voir tout
                              <ArrowRight size={14} weight="bold" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Barre colorée */}
                  <div 
                    className="h-1 transition-all duration-500"
                    style={{ 
                      backgroundColor: cat.color,
                      width: isOpen ? '100%' : '0%'
                    }} 
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            to="/formations"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#008753] text-white font-semibold hover:bg-[#006b42] transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explorer toutes nos formations
            <ArrowRight size={18} weight="bold" />
          </Link>
        </div>

      </div>
    </section>
  );
}
