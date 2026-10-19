
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, Store, Lightbulb, Zap } from 'lucide-react';

const FEATURES = [
  {
    number: '01',
    icon: Store,
    title: 'Startup Stalls',
    description: 'Discover products, meet emerging founders and explore innovation across industries.',
    items: [
      'Fire safety & heaters',
      'Organic food & kitchenware',
      'AI & consumer electronics',
      'Automotive parts & agri-drones',
      'Fashion and more',
    ],
    href: '#visit',
    action: 'Plan your visit',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Idea Box Booth',
    description: 'Every great startup begins with an idea. This is where yours gets heard.',
    items: [
      'Share your raw ideas',
      'Explore creative solutions',
      'Get inspired by other thinkers',
    ],
    href: '#idea-box',
    action: 'Explore activity',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Rapid-Fire Round',
    description: 'Think quickly, solve challenges and experience the energy of entrepreneurship.',
    items: [
      'Tackle problem statements',
      'Develop creative solutions',
      'Present your ideas',
    ],
    href: '#rapid-fire',
    action: 'Explore activity',
  },
];

export default function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="stalls"
      className="relative bg-black px-4 md:px-6 py-16 md:py-24 scroll-mt-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section heading */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-px bg-[#E1E0CC]" />
          <span className="text-[#E1E0CC]/60 text-xs uppercase tracking-[0.2em]">
            02 / Explore the Expo
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="text-[#E1E0CC] text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.05em] font-medium">
            More than
            <br />
            <span className="font-serif italic font-normal text-[#E1E0CC]/55">
              an exhibition.
            </span>
          </h2>

          <p className="text-[#E1E0CC]/60 text-sm md:text-base max-w-sm leading-relaxed">
            13 startup stalls. Interactive experiences.
            A space to discover, connect and think like a founder.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.number}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group bg-[#111111] border border-white/10 rounded-2xl p-6 md:p-7 flex flex-col min-h-[390px] hover:border-[#E1E0CC]/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="w-12 h-12 rounded-xl border border-white/15 flex items-center justify-center text-[#E1E0CC]">
                    <Icon size={23} strokeWidth={1.5} />
                  </div>

                  <span className="text-[#E1E0CC]/35 text-xs tracking-widest">
                    / {feature.number}
                  </span>
                </div>

                <h3 className="text-[#E1E0CC] text-2xl md:text-3xl font-medium tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-[#E1E0CC]/55 text-sm leading-relaxed mt-4">
                  {feature.description}
                </p>

                <ul className="flex flex-col gap-3 mt-7 mb-8">
                  {feature.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[#E1E0CC]/70 text-sm"
                    >
                      <Check
                        size={15}
                        className="shrink-0 mt-0.5 text-[#E1E0CC]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={feature.href}
                  className="mt-auto pt-5 border-t border-white/10 flex items-center justify-between text-[#E1E0CC] text-sm font-medium min-h-11"
                >
                  {feature.action}

                  <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#E1E0CC] group-hover:text-black transition-colors">
                    <ArrowUpRight size={17} />
                  </span>
                </a>
              </motion.article>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-between gap-4 mt-8 border-t border-white/10 pt-5">
          <span className="text-[#E1E0CC]/40 text-xs uppercase tracking-widest">
            Founder Expo 2026
          </span>

          <span className="text-[#E1E0CC]/40 text-xs uppercase tracking-widest">
            E-Cell MET × NEC 2026
          </span>
        </div>

      </div>
    </section>
  );
}
