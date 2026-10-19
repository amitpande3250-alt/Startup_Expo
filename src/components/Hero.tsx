import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin, Store, Menu, X } from 'lucide-react';
import WordsPullUp from './WordsPullUp';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Stalls', href: '#stalls' },
  { label: 'Activities', href: '#activities' },
  { label: 'Visit', href: '#visit' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'Contact', href: '#contact' },
];

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const EASE = [0.16, 1, 0.3, 1] as const;

const META = [
  { icon: Calendar, label: '12 Oct 2026' },
  { icon: Clock, label: '10 AM – 5 PM' },
  { icon: MapPin, label: 'Meena Bhujbal College Hall' },
  { icon: Store, label: '13 Startup Stalls' },
];

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      id="top" 
      className="relative min-h-[100dvh] w-full bg-black p-3 md:p-6 flex flex-col justify-between overflow-x-hidden"
    >
      {/* Background Layer with correct z-index and video fallback */}
      <div className="absolute inset-3 md:inset-6 rounded-2xl md:rounded-[2rem] overflow-hidden bg-zinc-950 z-0 pointer-events-none">
        {!shouldReduceMotion ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={HERO_VIDEO}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-zinc-900" />
        )}
        <div className="noise-overlay absolute inset-0 opacity-[0.5] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/95 pointer-events-none" />
      </div>

      {/* Header & Navbar */}
      <header className="w-full pt-2 px-2 md:px-4 z-30 relative">
        <nav aria-label="Primary" className="hidden md:flex justify-center">
          <div className="bg-black/85 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-white"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="flex items-center justify-between md:hidden bg-black/90 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl shadow-xl">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#E1E0CC]">
            Founder Expo 2026
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="text-[#E1E0CC] p-1.5 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-20 left-4 right-4 z-40 bg-black/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-5 md:hidden shadow-2xl"
            >
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-[#E1E0CC]/90 hover:text-white transition-colors border-b border-white/5 pb-2.5"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Content */}
      <div className="w-full flex-grow flex flex-col justify-end p-4 sm:p-8 md:p-10 lg:p-12 z-10 relative">
        <motion.div
          className="flex flex-wrap gap-2 mb-4 md:mb-5"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
        >
          <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs text-[#E1E0CC] border border-white/15 shadow-sm">
            Founder Expo 2026 • NEC 2026
          </span>
          <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md rounded-full px-3.5 py-1.5 text-[11px] sm:text-xs text-[#E1E0CC]/90 border border-white/15 shadow-sm">
            E-Cell, MET Institute of Technology
          </span>
        </motion.div>

        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="font-medium leading-[0.85] tracking-[-0.07em] text-[13vw] sm:text-[12vw] md:text-[11vw] lg:text-[10vw]">
              <WordsPullUp text="Founder Expo" showAsterisk style={{ color: '#E1E0CC' }} />
            </h1>
            <motion.div
              className="flex flex-wrap gap-x-5 gap-y-2.5 mt-4 md:mt-5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            >
              {META.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs md:text-sm text-[#E1E0CC]/85 font-medium"
                >
                  <Icon className="w-4 h-4 text-[#E1E0CC]" strokeWidth={2} />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 md:gap-6 pb-2">
            <motion.p
              className="text-[#E1E0CC]/80 text-xs sm:text-sm md:text-base leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            >
              13 startups. One hall. Founder Expo 2026 — part of the National
              Entrepreneurship Challenge — where products, ideas and founders
              meet future builders.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            >
              <a
                href="#stalls"
                className="group inline-flex items-center gap-2 transition-all duration-300 bg-[#E1E0CC] hover:bg-white rounded-full pl-6 pr-2 py-2.5 text-black font-semibold text-sm sm:text-base shadow-xl"
              >
                Explore stalls
                <span className="bg-black text-[#E1E0CC] rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </span>
              </a>
              <a
                href="#agenda"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm sm:text-base font-semibold text-[#E1E0CC] border border-[#E1E0CC]/30 hover:border-[#E1E0CC] hover:bg-[#E1E0CC]/10 transition-all duration-300"
              >
                Agenda
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
