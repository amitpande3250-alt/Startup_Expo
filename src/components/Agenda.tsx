import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const EASE = [0.22, 1, 0.36, 1] as const;

const AGENDA = [
  {
    time: '10:00 AM',
    title: 'Gates open & check-in',
    description: 'Walk in, grab the floor map, and head to the stalls that match your curiosity.',
  },
  {
    time: '10:30 AM',
    title: 'Stall walkthrough begins',
    description: 'All 13 startups live — demos, products and founder chats across 9 sectors.',
  },
  {
    time: '12:00 PM',
    title: 'Idea Box Booth opens',
    description: 'Pin your idea on the wall and collect first reactions from founders.',
  },
  {
    time: '2:00 PM',
    title: 'Rapid-Fire Round',
    description: 'Timed problem statements, fast brainstorming, back-to-back pitches.',
  },
  {
    time: '3:30 PM',
    title: 'Founder interactions',
    description: 'Open networking — ask the questions you saved up while walking the floor.',
  },
  {
    time: '5:00 PM',
    title: 'Close & takeaways',
    description: 'Wrap-up, key lessons, and what to explore next in the NEC journey.',
  },
];

export default function Agenda() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="agenda" className="bg-black px-4 md:px-6 py-12 md:py-20 scroll-mt-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14 px-2">
          <p className="text-primary text-[10px] sm:text-xs tracking-wide mb-4">
            10 AM – 5 PM • Plan your day
          </p>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'One day. Six moments.',
                  className: 'font-normal',
                  style: { color: '#E1E0CC' },
                },
                {
                  text: 'Come for an hour or stay all day.',
                  className: 'font-normal text-gray-500',
                },
              ]}
            />
          </div>
        </div>

        <div ref={ref} className="relative">
          {/* Timeline spine */}
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-white/10" aria-hidden="true" />
          <ol className="flex flex-col gap-2 sm:gap-1">
            {AGENDA.map((item, i) => (
              <motion.li
                key={item.time}
                className="relative grid grid-cols-12 gap-3 sm:gap-4 items-start bg-[#101010] border border-white/5 rounded-2xl p-5 sm:p-6 pl-9 sm:pl-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              >
                <span
                  className="absolute left-0 sm:left-[3px] top-7 w-[15px] h-[15px] sm:w-[13px] sm:h-[13px] rounded-full bg-primary ring-4 ring-black"
                  aria-hidden="true"
                />
                <div className="col-span-12 sm:col-span-3">
                  <p className="text-primary text-xs sm:text-sm font-medium">{item.time}</p>
                </div>
                <div className="col-span-12 sm:col-span-9">
                  <h3 className="text-sm sm:text-base md:text-lg font-medium" style={{ color: '#E1E0CC' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
