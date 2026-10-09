import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const IMG_STORYBOARD =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85';
const IMG_CRITIQUES =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85';
const IMG_CAPSULE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85';

const CARD_EASE = [0.22, 1, 0.36, 1] as const;

function CardShell({
  index,
  children,
  className = '',
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`rounded-2xl overflow-hidden relative ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: CARD_EASE }}
    >
      {children}
    </motion.div>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2 mt-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-xs sm:text-sm">
          <Check className="w-4 h-4 shrink-0 mt-0.5 text-primary" strokeWidth={2.5} />
          <span className="text-gray-400">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LearnMore({ href, label = 'Learn more' }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1.5 mt-4 text-xs sm:text-sm text-primary/80 hover:text-primary transition-colors"
    >
      {label}
      <ArrowRight className="w-3.5 h-3.5 -rotate-45" strokeWidth={2} />
    </a>
  );
}

function InfoCard({
  index,
  icon,
  title,
  number,
  items,
  href,
  label,
}: {
  index: number;
  icon: string;
  title: string;
  number: string;
  items: string[];
  href: string;
  label?: string;
}) {
  return (
    <CardShell index={index} className="bg-[#212121] p-5 sm:p-6 flex flex-col min-h-[380px] lg:min-h-[440px]">
      <img
        src={icon}
        alt={title}
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-6"
        loading="lazy"
      />
      <div className="flex items-baseline gap-2">
        <h3 className="text-base sm:text-lg font-medium" style={{ color: '#E1E0CC' }}>
          {title}
        </h3>
        <span className="text-[10px] sm:text-xs text-gray-500">({number})</span>
      </div>
      <Checklist items={items} />
      <div className="mt-auto pt-4">
        <LearnMore href={href} label={label} />
      </div>
    </CardShell>
  );
}

export default function Features() {
  return (
    <section id="stalls" className="relative bg-black px-4 md:px-6 py-12 md:py-20 overflow-hidden scroll-mt-4">
      {/* Subtle noise background */}
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14 px-2">
          <p className="text-primary text-[10px] sm:text-xs tracking-wide mb-4">
            12 Oct 2026 • Meena Bhujbal College Hall
          </p>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle
              segments={[
                {
                  text: '13 stalls. 9 sectors. Infinite ideas.',
                  className: 'font-normal',
                  style: { color: '#E1E0CC' },
                },
                {
                  text: 'Walk the floor. Meet the builders.',
                  className: 'font-normal text-gray-500',
                },
              ]}
            />
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-2 md:gap-1">
          <InfoCard
            index={0}
            icon={IMG_STORYBOARD}
            title="Startup Stalls."
            number="01"
            href="#visit"
            label="Plan your visit"
            items={[
              'Fire safety & heaters',
              'Organic food & kitchenware',
              'AI & consumer electronics',
              'Auto parts, agri-drones & fashion',
            ]}
          />

          <InfoCard
            index={1}
            icon={IMG_CRITIQUES}
            title="Idea Box Booth."
            number="02"
            href="#idea-box"
            items={[
              'Drop raw ideas, no filter',
              'Get founder feedback live',
              'Turn sparks into startups',
            ]}
          />

          <InfoCard
            index={2}
            icon={IMG_CAPSULE}
            title="Rapid-Fire Round."
            number="03"
            href="#rapid-fire"
            items={[
              'Solve live problem statements',
              'Pitch your fix in minutes',
              'Think & present like a founder',
            ]}
          />
        </div>
      </div>
    </section>
  );
}
