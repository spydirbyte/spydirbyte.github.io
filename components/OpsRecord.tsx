'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { opsRecord } from '@/lib/content';
import { SectionHeader } from './Dossier';

export default function OpsRecord() {
  const [open, setOpen] = useState<string | null>(opsRecord[opsRecord.length - 1].year);

  const totalOps = opsRecord.reduce((acc, y) => acc + y.ops.length, 0);

  return (
    <section id="ops" className="relative px-6 py-24 sm:pl-28 sm:pr-10">
      <SectionHeader eyebrow="02 // THE RECORD" title="Operations Log" />

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-fog/70">
        Some made headlines. Others never got the spotlight. Every disruption, every hour a
        corrupt system was knocked offline, sent a message.{' '}
        <span className="text-phosphordim">{totalOps}+ operations logged.</span>
      </p>

      <div className="mt-10 border-l border-line pl-6 sm:pl-10">
        {opsRecord.map((row, i) => {
          const isOpen = open === row.year;
          return (
            <div key={row.year} className="relative mb-3 -ml-[29px] pl-[29px] sm:-ml-[41px] sm:pl-[41px]">
              <span className="absolute left-0 top-2.5 h-2 w-2 -translate-x-1/2 rounded-full bg-phosphordim sm:left-0" />
              <button
                onClick={() => setOpen(isOpen ? null : row.year)}
                className="flex w-full items-center justify-between gap-4 border border-line bg-panel/40 px-4 py-3 text-left transition-all duration-200 hover:border-phosphordim hover:shadow-[0_0_16px_rgba(74,222,156,0.1)]"
              >
                <span className="font-mono text-sm tracking-widest text-bone">{row.year}</span>
                <span className="font-mono text-xs text-fog/50">
                  {row.ops.length} OP{row.ops.length > 1 ? 'S' : ''} {isOpen ? '−' : '+'}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 border-x border-b border-line bg-void/40 px-4 py-3">
                      {row.ops.map((op) => (
                        <span
                          key={op}
                          className="border border-phosphordim/30 bg-phosphor/[0.04] px-2.5 py-1 font-mono text-[11px] tracking-wide text-phosphor/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-phosphordim hover:bg-phosphor/[0.1]"
                        >
                          {op}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="mt-8 font-mono text-xs tracking-widest text-amber/80">
        30+ OPERATIONS LOGGED // STATUS: ACTIVE
      </div>
    </section>
  );
}
