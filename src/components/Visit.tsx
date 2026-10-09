import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Ticket, MapPin } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';
import { MAPS_URL } from '../constants';

const EASE = [0.22, 1, 0.36, 1] as const;

function VisitCard({
  index,
  icon: Icon,
  kicker,
  title,
  body,
  action,
}: {
  index: number;
  icon: typeof Users;
  kicker: string;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="bg-[#101010] rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/5 flex flex-col"
      initial={{ scale: 0.97, opacity: 0, y: 20 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.7, ease: EASE }}
    >
      <span className="inline-flex w-11 h-11 rounded-xl bg-primary items-center justify-center mb-6">
        <Icon className="w-5 h-5 text-black" strokeWidth={2.2} />
      </span>
      <p className="text-primary text-[10px] sm:text-xs tracking-wide uppercase">{kicker}</p>
      <h3 className="text-xl sm:text-2xl font-medium mt-2" style={{ color: '#E1E0CC' }}>
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-3 leading-relaxed">{body}</p>
      {action && <div className="mt-6 pt-5 border-t border-white/10">{action}</div>}
    </motion.div>
  );
}

export default function Visit() {
  return (
    <section id="visit" className="bg-black px-4 md:px-6 py-12 md:py-20 scroll-mt-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14 px-2">
          <p className="text-primary text-[10px] sm:text-xs tracking-wide mb-4">
            Plan your visit • 12 Oct 2026
          </p>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Everything a first-time visitor needs.',
                  className: 'font-normal',
                  style: { color: '#E1E0CC' },
                },
                {
                  text: 'Entry, timing, and how to reach.',
                  className: 'font-normal text-gray-500',
                },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-2 md:gap-1">
          <VisitCard
            index={0}
            icon={Users}
            kicker="Who can attend"
            title="Open to all students."
            body="No team or prior startup experience needed. Come for an hour between classes or stay 10 AM – 5 PM. Idea Box needs no prep; Rapid-Fire teams can form on the spot."
          />
          <VisitCard
            index={1}
            icon={Ticket}
            kicker="Entry & check-in"
            title="Walk in. Check in."
            body="Gates open 10:00 AM at Meena Bhujbal College Hall. Check in, grab the floor map, and head to the stalls. Keep your student ID handy for check-in."
            action={
              <a
                href="#agenda"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary/80 hover:text-primary transition-colors"
              >
                See full agenda
                <span aria-hidden="true">→</span>
              </a>
            }
          />
          <VisitCard
            index={2}
            icon={MapPin}
            kicker="Venue"
            title="Meena Bhujbal College Hall."
            body="E-Cell, MET Institute of Technology. The full floor — 13 stalls, Idea Box Booth and Rapid-Fire arena — is inside one hall, so you can't miss anything."
            action={
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary/80 hover:text-primary transition-colors"
              >
                Open in Google Maps
                <span aria-hidden="true">↗</span>
              </a>
            }
          />
        </div>
      </div>
    </section>
  );
}
