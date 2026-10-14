import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Lightbulb, Zap, Check } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const EASE = [0.22, 1, 0.36, 1] as const;

function ActivityPanel({
  index,
  id,
  icon: Icon,
  kicker,
  title,
  description,
  steps,
  audience,
}: {
  index: number;
  id: string;
  icon: typeof Lightbulb;
  kicker: string;
  title: string;
  description: string;
  steps: string[];
  audience: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      id={id}
      className="bg-[#101010] rounded-2xl md:rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/5 flex flex-col scroll-mt-6"
      initial={{ scale: 0.97, opacity: 0, y: 20 }}
      animate={isInView ? { scale: 1, opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: EASE }}
    >
      <span className="inline-flex w-11 h-11 rounded-xl bg-primary items-center justify-center mb-6">
        <Icon className="w-5 h-5 text-black" strokeWidth={2.2} />
      </span>
      <p className="text-primary text-[10px] sm:text-xs tracking-wide uppercase">{kicker}</p>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium mt-2" style={{ color: '#E1E0CC' }}>
        {title}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm md:text-base mt-3 leading-relaxed">
        {description}
      </p>
      <ul className="flex flex-col gap-2.5 mt-6">
        {steps.map((s, i) => (
          <li key={s} className="flex items-start gap-3 text-xs sm:text-sm">
            <span
              className="shrink-0 w-5 h-5 rounded-full border border-primary/40 text-primary text-[10px] flex items-center justify-center mt-0.5"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="text-gray-300">{s}</span>
          </li>
        ))}
      </ul>
      <p className="inline-flex items-center gap-2 mt-6 pt-5 border-t border-white/10 text-[11px] sm:text-xs text-gray-500">
        <Check className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
        {audience}
      </p>
    </motion.div>
  );
}

export default function Activities() {
  return (
    <section id="activities" className="bg-black px-4 md:px-6 py-12 md:py-20 scroll-mt-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14 px-2">
          <p className="text-primary text-[10px] sm:text-xs tracking-wide mb-4">
            Not just a walkthrough — participate
          </p>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: 'Two ways to think like a founder.',
                  className: 'font-normal',
                  style: { color: '#E1E0CC' },
                },
                {
                  text: 'No stage fear. Just ideas.',
                  className: 'font-normal text-gray-500',
                },
              ]}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-2 md:gap-1">
          <ActivityPanel
            index={0}
            id="idea-box"
            icon={Lightbulb}
            kicker="Activity 01 • Open all day"
            title="Idea Box Booth."
            description="A low-pressure corner to pitch the startup living in your head. Write it, pin it, and get a founder's first reaction before you leave the hall."
            steps={[
              'Write your raw idea on a card — one line is enough',
              'Pin it on the Idea Wall for everyone to read',
              'Get live reactions and next-step nudges from founders',
            ]}
            audience="Open to every student — no team or prep needed"
          />
          <ActivityPanel
            index={1}
            id="rapid-fire"
            icon={Zap}
            kicker="Activity 02 • Timed rounds"
            title="Rapid-Fire Round."
            description="Pick a real problem statement, brainstorm against the clock, and present your fix. The closest thing to a founder's Monday morning."
            steps={[
              'Draw a problem statement from the challenge pool',
              'Brainstorm a solution with your group in minutes',
              'Present your fix rapid-fire to the room',
            ]}
            audience="Team up on the spot or bring your own crew"
          />
        </div>
      </div>
    </section>
  );
}
