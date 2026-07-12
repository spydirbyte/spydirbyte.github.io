'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixRain from './MatrixRain';

const QUOTE = 'WE ARE ANONYMOUS. WE ARE LEGION. WE DO NOT FORGIVE. WE DO NOT FORGET.';

type Stage = 'flash' | 'intercept' | 'mask' | 'quote' | 'ready' | 'exit';

export default function IntroCinematic({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState<Stage>('flash');
  const [typed, setTyped] = useState('');
  const [glitchTick, setGlitchTick] = useState(0);
  const [bigGlitch, setBigGlitch] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setStage('ready');
      return;
    }
    const seq: Array<[Stage, number]> = [
      ['intercept', 500],
      ['mask', 1100],
      ['quote', 1000],
      ['ready', 2400],
    ];
    let cancelled = false;
    let t = 0;
    const timers: number[] = [];
    for (const [s, delay] of seq) {
      t += delay;
      timers.push(
        window.setTimeout(() => {
          if (!cancelled) setStage(s);
        }, t)
      );
    }
    // one dramatic full-screen glitch right as the mask appears
    timers.push(
      window.setTimeout(() => {
        if (cancelled) return;
        setBigGlitch(true);
        setTimeout(() => setBigGlitch(false), 220);
      }, 1600)
    );
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (stage !== 'quote' && stage !== 'ready') return;
    if (typed.length >= QUOTE.length) return;
    const iv = setTimeout(() => setTyped(QUOTE.slice(0, typed.length + 1)), 22);
    return () => clearTimeout(iv);
  }, [stage, typed]);

  useEffect(() => {
    const iv = setInterval(() => setGlitchTick((n) => n + 1), 2200);
    return () => clearInterval(iv);
  }, []);

  function proceed() {
    setStage('exit');
    setTimeout(onDone, 550);
  }

  return (
    <AnimatePresence>
      {stage !== 'exit' && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-hidden bg-black"
        >
          <MatrixRain opacityClass="opacity-[0.32]" />

          <AnimatePresence>
            {stage === 'flash' && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                className="absolute inset-0 z-10 bg-white"
              />
            )}
          </AnimatePresence>

          <motion.div
            key={glitchTick}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0 z-10 mix-blend-screen"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,0,60,0.06), transparent 40%, rgba(74,222,156,0.08) 60%, transparent)',
            }}
          />

          {bigGlitch && (
            <div className="pointer-events-none absolute inset-0 z-20 mix-blend-screen">
              <div className="absolute inset-0 translate-x-[3px] bg-alert/10" />
              <div className="absolute inset-0 -translate-x-[3px] bg-phosphor/10" />
              <div className="absolute inset-0 bg-scanlines opacity-80" />
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 z-10 bg-scanlines opacity-50" />
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-black" />

          <button
            onClick={proceed}
            className="absolute right-5 top-5 z-30 font-mono text-[11px] tracking-widest text-fog/50 transition-colors hover:text-phosphor"
          >
            SKIP
          </button>

          <div className="relative z-20 flex flex-col items-center px-6 text-center">
            <AnimatePresence mode="wait">
              {stage === 'intercept' && (
                <motion.div
                  key="intercept"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-mono text-sm tracking-[0.35em] text-alert/90 animate-flicker"
                >
                  SIGNAL INTERCEPTED
                </motion.div>
              )}
            </AnimatePresence>

            {(stage === 'mask' || stage === 'quote' || stage === 'ready') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4, filter: 'blur(20px)', rotate: -6 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  rotate: 0,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                  filter: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                }}
                className="relative"
              >
                <div className="absolute inset-0 -z-10 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-phosphor/20 blur-3xl" />
                {imgFailed ? (
                  <HoodFallback />
                ) : (
                  <img
                    src="/emblem.png"
                    alt="SPYDIR emblem"
                    onError={() => setImgFailed(true)}
                    className="w-56 select-none drop-shadow-[0_0_40px_rgba(74,222,156,0.45)] sm:w-72"
                    draggable={false}
                  />
                )}
              </motion.div>
            )}

            <AnimatePresence>
              {(stage === 'quote' || stage === 'ready') && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 max-w-md font-mono text-xs tracking-widest text-phosphor/90 text-glow sm:text-sm"
                >
                  {typed}
                  <span className="inline-block h-3 w-1.5 translate-y-0.5 animate-blink bg-phosphor/80 align-middle" />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {stage === 'ready' && (
                <motion.button
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  onClick={proceed}
                  className="clip-corner group mt-10 border border-phosphordim/70 bg-phosphor/[0.05] px-8 py-3 font-mono text-xs tracking-[0.25em] text-phosphor transition-all hover:-translate-y-0.5 hover:bg-phosphor/[0.14] hover:shadow-[0_0_24px_rgba(74,222,156,0.3)]"
                >
                  ENTER<span className="ml-1 inline-block transition-transform group-hover:translate-x-1">›</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HoodFallback() {
  return (
    <svg width="140" height="140" viewBox="0 0 120 120" className="text-phosphor">
      <path
        d="M60 8 C30 8 16 34 16 60 C16 84 30 100 34 108 L86 108 C90 100 104 84 104 60 C104 34 90 8 60 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity="0.9"
      />
      <circle cx="48" cy="58" r="4" fill="currentColor" />
      <circle cx="72" cy="58" r="4" fill="currentColor" />
      <path d="M48 78 Q60 86 72 78" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
    </svg>
  );
}
