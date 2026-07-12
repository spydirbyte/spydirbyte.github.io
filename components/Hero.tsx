'use client';

import { motion } from 'framer-motion';
import { identity } from '@/lib/content';
import GlitchText from './GlitchText';
import Emblem3D from './Emblem3D';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 sm:pl-28 sm:pr-10 sm:pt-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-scanlines opacity-40" />
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '100%' }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-phosphor/[0.03] to-transparent"
        />
      </div>

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl"
        >
          <div className="mb-5 flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-phosphordim">
            <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-flicker" />
            CASE FILE // STATUS: ACTIVE
          </div>

          <h1 className="font-mono text-5xl font-bold leading-[0.95] tracking-tight text-bone sm:text-7xl xl:text-8xl">
            <GlitchText
              text={identity.callsign}
              className="text-glow cursor-default text-phosphor"
            />
          </h1>

          <p className="mt-5 max-w-xl text-lg text-fog sm:text-xl xl:text-2xl">{identity.tagline}</p>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-fog/70 sm:text-base">
            {identity.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {identity.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="clip-corner border border-line bg-panel/60 px-4 py-2 font-mono text-xs tracking-wide text-fog transition-all duration-200 hover:-translate-y-0.5 hover:border-phosphordim hover:text-phosphor hover:shadow-[0_0_18px_rgba(74,222,156,0.18)]"
              >
                {s.handle}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="order-first lg:order-last"
        >
          <Emblem3D />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-10 left-6 hidden font-mono text-[10px] tracking-widest text-fog/40 sm:left-28 sm:block"
      >
        SCROLL TO DECRYPT ↓
      </motion.div>
    </section>
  );
}
