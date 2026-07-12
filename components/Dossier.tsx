'use client';

import { motion } from 'framer-motion';
import { disciplines, competencies } from '@/lib/content';

export default function Dossier() {
  return (
    <section id="dossier" className="relative px-6 py-24 sm:pl-28 sm:pr-10">
      <SectionHeader eyebrow="01 // DOSSIER" title="Field of Operation" />

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h3 className="mb-4 font-mono text-xs tracking-widest text-fog/50">
            CORE COMPETENCIES
          </h3>
          <div className="flex flex-wrap gap-2">
            {competencies.map((c) => (
              <span
                key={c}
                className="border border-line px-3 py-1.5 font-mono text-xs text-fog/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-phosphordim hover:text-phosphor hover:shadow-[0_0_14px_rgba(74,222,156,0.15)]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-4 font-mono text-xs tracking-widest text-fog/50">
            LOGGED ACTIVITY
          </h3>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {disciplines.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
                className="flex gap-2 text-sm text-fog/75 transition-colors duration-200 hover:text-fog"
              >
                <span className="mt-1 shrink-0 text-phosphordim">▸</span>
                {d}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-mono text-xs tracking-[0.25em] text-phosphordim">{eyebrow}</div>
      <h2 className="mt-2 font-mono text-3xl font-bold tracking-tight text-bone sm:text-4xl">
        {title}
      </h2>
      <div className="mt-4 h-px w-full max-w-md bg-gradient-to-r from-phosphordim/60 to-transparent" />
    </motion.div>
  );
}
