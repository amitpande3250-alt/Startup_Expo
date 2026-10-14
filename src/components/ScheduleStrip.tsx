import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Calendar, Clock, MapPin, Store } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;

const ITEMS = [
  { icon: Calendar, title: 'Date', value: '12 October 2026' },
  { icon: Clock, title: 'Time', value: '10 AM – 5 PM' },
  { icon: MapPin, title: 'Venue', value: 'Meena Bhujbal College Hall' },
  { icon: Store, title: 'Stalls', value: '13 Startups' },
];

export default function ScheduleStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-black px-4 md:px-6 pb-10 md:pb-16">
      <div ref={ref} className="max-w-6xl mx-auto">
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {ITEMS.map(({ icon: Icon, title, value }, i) => (
            <motion.div
              key={title}
              className="bg-[#101010] rounded-2xl p-5 sm:p-6 border border-white/5"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
            >
              <Icon className="w-5 h-5 text-primary mb-3" strokeWidth={2} />
              <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">{title}</p>
              <p className="text-sm sm:text-base font-medium mt-1" style={{ color: '#E1E0CC' }}>
                {value}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <p className="text-center text-gray-500 text-[11px] sm:text-xs mt-5">
          Organized by E-Cell, MET Institute of Technology • Part of the National
          Entrepreneurship Challenge (NEC) 2026
        </p>
      </div>
    </section>
  );
}
