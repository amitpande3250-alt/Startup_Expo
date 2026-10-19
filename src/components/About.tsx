
import { motion, useReducedMotion } from 'framer-motion';

const highlights = [
  { number: '13', label: 'Startup Stalls' },
  { number: '01', label: 'Expo Day' },
  { number: '09+', label: 'Industry Areas' },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="overview"
      className="bg-black px-4 md:px-6 py-16 md:py-24 scroll-mt-8"
    >
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-[#E1E0CC]" />
          <span className="text-[#E1E0CC]/60 text-xs uppercase tracking-[0.2em]">
            01 / The Overview
          </span>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-[#E1E0CC] text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] tracking-[-0.05em] font-medium max-w-5xl">
            Thirteen startups.
            <br />
            One hall.
            <br />
            <span className="font-serif italic font-normal text-[#E1E0CC]/55">
              Infinite possibilities.
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-12 md:mt-20 border-t border-white/15 pt-8">
            <p className="text-[#E1E0CC]/50 text-sm uppercase tracking-widest">
              About Founder Expo 2026
            </p>

            <div>
              <p className="text-[#E1E0CC] text-lg md:text-xl leading-relaxed">
                A space where ideas meet opportunity, products meet people,
                and the next generation of founders takes centre stage.
              </p>

              <p className="text-[#E1E0CC]/60 text-sm md:text-base leading-relaxed mt-6">
                Organised in the context of NEC 2026 by E-Cell,
                MET Institute of Technology, Founder Expo brings together
                13 startup stalls spanning fire safety, organic food,
                automotive innovation, AI, agriculture drones,
                consumer electronics, fashion and more.
              </p>

              <p className="text-[#E1E0CC]/60 text-sm md:text-base leading-relaxed mt-4">
                Explore real products, discover emerging ideas and participate
                in interactive experiences including the Idea Box Booth
                and Rapid-Fire Round.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 md:gap-6 mt-14 md:mt-20">
          {highlights.map((item) => (
            <div
              key={item.label}
              className="border-t border-[#E1E0CC]/25 pt-5"
            >
              <p className="text-[#E1E0CC] text-3xl sm:text-5xl md:text-7xl tracking-tight font-medium">
                {item.number}
              </p>
              <p className="text-[#E1E0CC]/50 text-[10px] sm:text-sm mt-3 uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
