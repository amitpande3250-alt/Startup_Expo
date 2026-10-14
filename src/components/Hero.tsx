import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, MapPin, Store } from 'lucide-react';
import WordsPullUp from './WordsPullUp';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Stalls', href: '#stalls' },
  { label: 'Activities', href: '#activities' },
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
  return (
    <section id="top" className="h-screen bg-black p-4 md:p-6">
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        {/* Background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Noise overlay */}
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        {/* Navbar */}
        <nav aria-label="Primary" className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 md:py-3 flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 whitespace-nowrap">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] sm:text-xs md:text-sm transition-colors"
                style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#E1E0CC')}
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = 'rgba(225, 224, 204, 0.8)')
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-8 md:p-10 lg:p-12">
          {/* Event meta pills */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4 md:mb-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
          >
            <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur rounded-full px-3 py-1.5 text-[10px] sm:text-xs text-primary border border-white/10">
              Founder Expo 2026 • NEC 2026
            </span>
            <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur rounded-full px-3 py-1.5 text-[10px] sm:text-xs text-primary border border-white/10">
              E-Cell, MET Institute of Technology
            </span>
          </motion.div>

          <div className="grid grid-cols-12 gap-4 items-end">
            {/* Heading — left 8 cols */}
            <div className="col-span-12 lg:col-span-8">
              <h1 className="font-medium leading-[0.85] tracking-[-0.07em] text-[14vw] sm:text-[13vw] md:text-[12vw] lg:text-[10.5vw] xl:text-[10vw] 2xl:text-[10vw]">
                <WordsPullUp text="Founder Expo" showAsterisk style={{ color: '#E1E0CC' }} />
              </h1>
              {/* Meta row */}
              <motion.div
                className="flex flex-wrap gap-x-5 gap-y-2 mt-4 md:mt-5"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
              >
                {META.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs md:text-sm text-primary/80"
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={2} />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Text + button — right 4 cols */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 md:gap-6 pb-2 md:pb-6">
              <motion.p
                className="text-primary/70 text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
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
                  className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 bg-primary rounded-full pl-5 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 text-black font-medium text-sm sm:text-base"
                >
                  Explore stalls
                  <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary" strokeWidth={2} />
                  </span>
                </a>
                <a
                  href="#agenda"
                  className="inline-flex items-center rounded-full px-5 py-2.5 text-sm sm:text-base font-medium text-primary border border-primary/30 hover:border-primary transition-colors"
                >
                  Agenda
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
