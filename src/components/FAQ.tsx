import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: 'When and where is Founder Expo 2026?',
    a: '12 October 2026, 10 AM – 5 PM in Meena Bhujbal College Hall, MET Institute of Technology. It is part of the National Entrepreneurship Challenge (NEC) 2026, organized by E-Cell.',
  },
  {
    q: 'Do I need to register or pay to attend?',
    a: 'No pre-registration details are listed — walk in during hall hours. Gates open at 10:00 AM for check-in where you get the floor map. Bring your student ID for a smooth check-in.',
  },
  {
    q: 'What will I see across the 13 stalls?',
    a: 'Products and demos across 9 sectors: fire safety, heaters, organic food, automotive parts, AI, agriculture drones, consumer electronics, fashion and kitchenware — with founders present to answer questions.',
  },
  {
    q: 'I have no startup idea. Can I still participate?',
    a: 'Yes. The Idea Box Booth is open all day for raw one-line ideas — no team or prep needed. The Rapid-Fire Round lets you join a group on the spot, solve a live problem statement, and pitch in minutes.',
  },
  {
    q: 'How much time should I plan for?',
    a: 'Come for an hour or stay all day. Stall walkthrough runs from 10:30 AM, Idea Box opens at noon, Rapid-Fire is at 2:00 PM, founder networking at 3:30 PM, and wrap-up at 5:00 PM.',
  },
  {
    q: 'Who do I contact on the day?',
    a: 'Find the E-Cell help desk at the check-in gates inside Meena Bhujbal College Hall. For directions, use the Google Maps link in the Visit section.',
  },
];

function FaqItem({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="bg-[#101010] border border-white/5 rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: EASE }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`faq-panel-${index}`}
        id={`faq-button-${index}`}
        className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6"
      >
        <span className="text-sm sm:text-base font-medium" style={{ color: '#E1E0CC' }}>
          {q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-primary/40 flex items-center justify-center transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          <Plus className="w-4 h-4 text-primary" strokeWidth={2} />
        </span>
      </button>
      {open && (
        <div
          id={`faq-panel-${index}`}
          role="region"
          aria-labelledby={`faq-button-${index}`}
          className="px-5 sm:px-6 pb-5 sm:pb-6"
        >
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-black px-4 md:px-6 py-12 md:py-20 scroll-mt-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-12 px-2">
          <p className="text-primary text-[10px] sm:text-xs tracking-wide mb-4">
            First time? Start here
          </p>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Questions every visitor asks.',
                  className: 'font-normal',
                  style: { color: '#E1E0CC' },
                },
                {
                  text: 'Answered in one place.',
                  className: 'font-normal text-gray-500',
                },
              ]}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-1.5">
          {FAQS.map((f, i) => (
            <FaqItem
              key={f.q}
              q={f.q}
              a={f.a}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
