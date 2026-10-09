import { ArrowUpRight, Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { MAPS_URL, SECTORS } from '../constants';

const EXPLORE_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Startup Stalls', href: '#stalls' },
  { label: 'Idea Box Booth', href: '#idea-box' },
  { label: 'Rapid-Fire Round', href: '#rapid-fire' },
  { label: 'Plan Your Visit', href: '#visit' },
  { label: 'Agenda', href: '#agenda' },
  { label: 'FAQ', href: '#faq' },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-black px-4 md:px-6 pt-10 md:pt-16 pb-4 md:pb-6 scroll-mt-4">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-7xl mx-auto px-5 sm:px-10 md:px-14 py-12 md:py-16 border border-white/5">
        <div className="grid grid-cols-12 gap-8 md:gap-6">
          {/* Brand */}
          <div className="col-span-12 md:col-span-5">
            <p className="text-[26px] sm:text-3xl font-medium tracking-tight" style={{ color: '#E1E0CC' }}>
              Founder Expo<span className="align-super text-sm ml-0.5">*</span>
            </p>
            <p className="text-primary/70 text-xs sm:text-sm mt-3 leading-relaxed max-w-sm">
              A platform for innovation, entrepreneurship and startup interaction —
              organized as part of the National Entrepreneurship Challenge (NEC) 2026.
            </p>
            <div className="flex flex-col gap-2 mt-6 text-xs sm:text-sm text-gray-400">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-primary" /> 12 October 2026
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-primary" /> 10 AM – 5 PM
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Meena Bhujbal College Hall
              </span>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1 text-primary/80 hover:text-primary transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" /> Get directions on Google Maps
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="col-span-6 md:col-span-3">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 mb-4">
              Explore
            </p>
            <ul className="flex flex-col gap-2.5">
              {EXPLORE_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-xs sm:text-sm text-primary/70 hover:text-primary transition-colors"
                  >
                    {l.label}
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sectors + organizer */}
          <div className="col-span-6 md:col-span-4">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider text-gray-500 mb-4">
              Sectors on the floor
            </p>
            <div className="flex flex-wrap gap-1.5">
              {SECTORS.map((s) => (
                <span
                  key={s}
                  className="text-[10px] sm:text-[11px] text-primary/70 border border-white/10 rounded-full px-2.5 py-1"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-6 leading-relaxed">
              Organized by
              <br />
              <span className="text-primary/80 font-medium">
                E-Cell, MET Institute of Technology
              </span>
              <br />
              <span className="text-gray-500">
                Part of NEC 2026 • Help desk at check-in gates
              </span>
            </p>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 mt-4 text-[11px] sm:text-xs text-primary/70 hover:text-primary transition-colors"
            >
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 md:mt-12 pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs text-gray-500">
            © 2026 E-Cell, MET Institute of Technology. All rights reserved.
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500">
            Founder Expo 2026 • NEC 2026 • 13 Startup Stalls
          </p>
        </div>
      </div>
    </footer>
  );
}
