import { motion, useScroll, MotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const BODY_TEXT =
  'Founder Expo 2026 brings together 13 startup stalls in Meena Bhujbal College Hall on 12 October 2026, 10 AM – 5 PM, as part of the National Entrepreneurship Challenge (NEC) 2026. Walk the floor across fire safety, heaters, organic food, automotive parts, AI, agriculture drones, consumer electronics, fashion and kitchenware — plus an Idea Box Booth and a Rapid-Fire Round where students generate ideas, build concepts and pitch solutions.';

function AnimatedLetter({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

export default function About() {
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: bodyRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = BODY_TEXT.split('');
  const totalChars = chars.length;

  return (
    <section id="overview" className="bg-black px-4 md:px-6 py-10 md:py-16 scroll-mt-4">
      <div className="bg-[#101010] rounded-2xl md:rounded-[2rem] max-w-6xl mx-auto text-center px-5 sm:px-10 md:px-16 py-12 sm:py-16 md:py-24">
        <p className="text-primary text-[10px] sm:text-xs tracking-wide mb-6 md:mb-8">
          NEC 2026 • E-Cell, MET Institute of Technology
        </p>

        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-8 md:mb-12">
          <WordsPullUpMultiStyle
            segments={[
              { text: 'Thirteen startups, one hall,', style: { color: '#E1E0CC' }, className: 'font-normal' },
              {
                text: 'an idea in every corner.',
                style: { color: '#E1E0CC' },
                className: 'italic font-serif font-normal',
              },
              {
                text: 'From fire safety to AI, drones to fashion — built to spark founders.',
                style: { color: '#E1E0CC' },
                className: 'font-normal',
              },
            ]}
          />
        </div>

        <p
          ref={bodyRef}
          className="text-[#DEDBC8] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed"
        >
          {chars.map((char, index) => {
            const charProgress = index / totalChars;
            return (
              <AnimatedLetter
                key={index}
                char={char}
                progress={scrollYProgress}
                range={[charProgress - 0.1, charProgress + 0.05]}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
}
