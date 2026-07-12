'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { languageCategories } from '@/lib/content';
import { SectionHeader } from './Dossier';

const ALL_LABEL = 'All';

export default function Skills() {
  const [active, setActive] = useState(ALL_LABEL);

  const items =
    active === ALL_LABEL
      ? languageCategories.flatMap((c) => c.items)
      : languageCategories.find((c) => c.label === active)?.items ?? [];

  return (
    <section id="skills" className="relative px-6 py-24 sm:pl-28 sm:pr-10">
      <SectionHeader eyebrow="04 // ARSENAL" title="Languages Known" />

      <div className="mt-8 flex flex-wrap gap-2">
        {[ALL_LABEL, ...languageCategories.map((c) => c.label)].map((label) => (
          <button
            key={label}
            onClick={() => setActive(label)}
            className={`border px-3 py-1.5 font-mono text-[11px] tracking-widest transition-colors ${
              active === label
                ? 'border-phosphordim bg-phosphor/[0.08] text-phosphor'
                : 'border-line text-fog/50 hover:text-fog/80'
            }`}
          >
            {label.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {items.map((lang, i) => (
            <LangCard key={lang} lang={lang} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="mt-3 flex items-center justify-center gap-2 border border-dashed border-line px-3 py-3 text-center font-mono text-xs text-fog/40">
        + MANY MORE
      </div>
    </section>
  );
}

function LangCard({ lang, index }: { lang: string; index: number }) {
  const [decrypted, setDecrypted] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, delay: (index % 10) * 0.02 }}
      onViewportEnter={() => setDecrypted(true)}
      viewport={{ once: true, margin: '-20px' }}
      className="group relative overflow-hidden border border-line px-3 py-3 text-center font-mono text-xs text-fog/80 transition-colors hover:border-phosphordim hover:text-phosphor"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-phosphor transition-transform duration-300 group-hover:scale-x-100" />
      {decrypted ? lang : ''}
    </motion.div>
  );
}
