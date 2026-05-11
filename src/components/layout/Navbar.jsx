import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  List, X, House, GridFour, GraduationCap,
  Images, Info, ChatCircleDots, ShoppingCart, CalendarBlank
} from '@phosphor-icons/react'

const links = [
  { label: 'Accueil',    href: '/',           icon: House },
  { label: 'Catalogues', href: '/catalogue',  icon: GridFour },
  { label: 'Formations', href: '/formations', icon: GraduationCap },
  { label: 'Événements', href: '/evenements', icon: CalendarBlank },
  { label: 'Galerie',    href: '/galerie',    icon: Images },
  { label: 'À propos',   href: '/a-propos',   icon: Info },
  { label: 'Contact',    href: '/contact',    icon: ChatCircleDots },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const lastY = useRef(0)
  const location = useLocation()
  const cartCount = 0
  
  // DARK MODE STATE
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved !== null ? saved === 'true' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  // Couleurs dynamiques avec icônes plus visibles
  const getBgColor = () => {
    if (darkMode) {
      return scrolled ? 'rgba(187, 247, 208, 0.95)' : 'rgba(187, 247, 208, 0.85)'
    }
    return scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.9)'
  }

  const getBorderColor = () => {
    if (darkMode) {
      return 'rgba(0, 135, 83, 0.4)'
    }
    return 'rgba(0, 0, 0, 0.08)'
  }

  const getTextColor = () => {
    return darkMode ? '#1a5c3a' : '#374151'
  }

  // Couleur des icônes plus contrastée
  const getIconColor = (active = false) => {
    if (active) return '#E8112D'
    return darkMode ? '#0a3b28' : '#1f2937' // Plus foncé que le texte pour mieux voir
  }

  const getActiveTextColor = () => '#E8112D'
  const getHoverBg = () => darkMode ? 'rgba(0, 135, 83, 0.15)' : 'rgba(0, 0, 0, 0.05)'

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > lastY.current && y > 100)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100, damping: 20 }}
        className={`
          fixed inset-x-0 top-0 z-[100] flex justify-center
          transition-all duration-500 ease-[cubic-bezier(.25,.8,.25,1)]
          ${hidden ? '-translate-y-[120%]' : 'translate-y-0'}
        `}
      >
        <div className="mx-3 sm:mx-6 mt-0">
          <div
            className={`
              rounded-b-2xl overflow-hidden w-fit transition-all duration-500
              backdrop-blur-xl
            `}
            style={{
              background: getBgColor(),
              border: `1px solid ${getBorderColor()}`,
              boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <div className="w-fit mx-auto px-4 sm:px-6 flex items-center justify-between h-[70px]">

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="shrink-0 mr-6">
                <Link to="/" className="block">
                  <img src="/logo.png" alt="AFI Collection" className="h-14 w-auto object-contain" />
                </Link>
              </motion.div>

              <nav className="hidden lg:flex items-center gap-1">
                {links.map(({ label, href, icon: Icon }) => {
                  const active = isActive(href)
                  const isHovered = hoveredLink === href
                  const showText = active || isHovered
                  return (
                    <Link
                      key={href}
                      to={href}
                      onMouseEnter={() => setHoveredLink(href)}
                      onMouseLeave={() => setHoveredLink(null)}
                      className={`relative flex items-center gap-[10px] px-4 py-2 rounded-xl text-[14px] font-[500] transition-all duration-200 outline-none`}
                      style={{
                        color: active ? getActiveTextColor() : getTextColor()
                      }}
                    >
                      {active && (
                        <motion.span
                          layoutId="activeBg"
                          className="absolute inset-0 rounded-xl"
                          transition={{ type: 'spring', duration: 0.4 }}
                          style={{
                            background: darkMode ? 'rgba(0, 135, 83, 0.25)' : 'rgba(0, 135, 83, 0.1)',
                            border: `1px solid ${darkMode ? 'rgba(0, 135, 83, 0.4)' : 'rgba(0, 135, 83, 0.2)'}`
                          }}
                        />
                      )}
                      {isHovered && !active && (
                        <motion.span
                          layoutId="hoverBg"
                          className="absolute inset-0 rounded-xl"
                          transition={{ type: 'spring', duration: 0.3 }}
                          style={{ background: getHoverBg() }}
                        />
                      )}
                      {/* Icone PLUS GRANDE et PLUS VISIBLE */}
                      <Icon
                        weight={active ? 'fill' : 'bold'}
                        size={22}
                        className={`relative z-10 shrink-0 transition-all duration-200`}
                        style={{ 
                          color: getIconColor(active),
                          filter: active ? 'drop-shadow(0 1px 2px rgba(0,135,83,0.2))' : 'none'
                        }}
                      />
                      <AnimatePresence mode="wait">
                        {showText && (
                          <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: 'auto' }}
                            exit={{ opacity: 0, width: 0 }}
                            className="relative z-10 overflow-hidden whitespace-nowrap font-medium"
                          >
                            {label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Link>
                  )
                })}
              </nav>

              <div className="hidden lg:flex items-center gap-3 ml-4">
                {/* DarkModeToggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    background: darkMode ? 'rgba(0, 135, 83, 0.15)' : 'none',
                    border: `1px solid ${getBorderColor()}`,
                    color: getIconColor(),
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = getHoverBg()}
                  onMouseLeave={e => e.currentTarget.style.background = darkMode ? 'rgba(0, 135, 83, 0.15)' : 'none'}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Panier */}
                <Link to="/panier" className="relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
                  style={{ color: getIconColor(), background: 'transparent' }}
                  onMouseEnter={e => e.currentTarget.style.background = getHoverBg()}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <ShoppingCart size={22} weight="bold" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E8112D] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <div className="w-px h-5" style={{ background: getBorderColor() }} />

                {/* Connexion */}
                <Link
                  to="/connexion"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-[14px] font-[500] transition-all duration-200"
                  style={{ color: getTextColor(), textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = getHoverBg()}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  Connexion
                </Link>

                {/* Inscription */}
                <Link
                  to="/inscription"
                  className="px-5 py-2 rounded-xl text-[14px] font-semibold text-white transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #008753 0%, #006b42 100%)',
                    boxShadow: '0 4px 12px rgba(0, 135, 83, 0.3)'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 135, 83, 0.4)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 135, 83, 0.3)'
                  }}
                >
                  S'inscrire
                </Link>
              </div>

              {/* Version mobile */}
              <div className="flex items-center gap-2 lg:hidden">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  style={{
                    background: darkMode ? 'rgba(0, 135, 83, 0.15)' : 'none',
                    border: `1px solid ${getBorderColor()}`,
                    color: getIconColor(),
                    borderRadius: '50%',
                    width: 38,
                    height: 38,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <Link to="/panier" className="relative w-10 h-10 rounded-xl flex items-center justify-center transition"
                  style={{ color: getIconColor() }}
                >
                  <ShoppingCart size={20} weight="bold" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#E8112D] text-white text-[9px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button onClick={() => setOpen(!open)} className="w-10 h-10 rounded-xl flex items-center justify-center transition"
                  style={{ color: getIconColor() }}
                >
                  {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
                </button>
              </div>
            </div>
          </div>

          {/* Menu mobile */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-2"
              >
                <div className="rounded-2xl backdrop-blur-xl px-3 py-3"
                  style={{
                    background: getBgColor(),
                    border: `1px solid ${getBorderColor()}`,
                    boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  {links.map(({ label, href, icon: Icon }) => {
                    const active = isActive(href)
                    return (
                      <Link
                        key={href}
                        to={href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200`}
                        style={{
                          color: active ? getActiveTextColor() : getTextColor(),
                          background: active ? (darkMode ? 'rgba(0, 135, 83, 0.2)' : 'rgba(0, 135, 83, 0.1)') : 'transparent'
                        }}
                      >
                        <Icon
                          size={22}
                          weight={active ? 'fill' : 'bold'}
                          style={{ color: getIconColor(active) }}
                        />
                        {label}
                      </Link>
                    )
                  })}
                  <div className="h-px my-2" style={{ background: getBorderColor() }} />
                  <Link
                    to="/connexion"
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] transition"
                    style={{
                      color: getTextColor(),
                      border: `1px solid ${getBorderColor()}`,
                      textDecoration: 'none'
                    }}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/inscription"
                    className="flex items-center justify-center gap-2 py-3 mt-2 rounded-xl text-[14px] font-semibold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #008753 0%, #006b42 100%)',
                      boxShadow: '0 4px 12px rgba(0, 135, 83, 0.25)'
                    }}
                  >
                    S'inscrire
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="h-[86px]" />
    </>
  )
}

// Composants Sun/Moon
const Sun = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
)

const Moon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)
