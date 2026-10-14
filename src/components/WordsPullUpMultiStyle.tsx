import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export interface TextSegment {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface WordsPullUpMultiStyleProps {
  segments: TextSegment[];
  className?: string;
  style?: React.CSSProperties;
}

export default function WordsPullUpMultiStyle({ segments, className = '', style }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Flatten segments into words preserving per-word className/style
  const words: { word: string; className?: string; style?: React.CSSProperties }[] = [];
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w.length === 0) return;
      words.push({ word: w, className: seg.className, style: seg.style });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${w.className ?? ''}`}
            style={w.style}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {w.word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
