'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Phase = 'login' | 'scanning' | 'boot' | 'granted' | 'exit';

const BOOT_LINES = [
  'ROUTING THROUGH 7 RELAYS...',
  'FINGERPRINT MASKED.',
  'CROSS-REFERENCING CASE FILE: SPYDIR...',
  'CLEARANCE LEVEL: ANONYMOUS // ACTIVE SINCE 2009',
  'DECRYPTING DOSSIER...',
];

function hex(n: number) {
  return Math.floor(Math.random() * 16 ** n)
    .toString(16)
    .padStart(n, '0')
    .toUpperCase();
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function AccessSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>('login');
  const [operatorId, setOperatorId] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [scanPct, setScanPct] = useState(0);
  const [hexTicker, setHexTicker] = useState('');
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const skippedRef = useRef(false);
  const cancelledRef = useRef(false);

  // Single continuous chain: scanning -> boot -> granted -> exit.
  // Everything checks the same cancelledRef, so calling skip() at any
  // point reliably halts it -- and nothing here can cancel itself
  // the way separate phase-keyed effects could.
  async function runSequence() {
    setPhase('scanning');

    const hexIv = setInterval(() => {
      setHexTicker(Array.from({ length: 6 }, () => hex(4)).join(' '));
    }, 90);

    let pct = 0;
    while (pct < 100) {
      if (cancelledRef.current) {
        clearInterval(hexIv);
        return;
      }
      await wait(110);
      pct += 4 + Math.random() * 10;
      setScanPct(Math.min(pct, 100));
    }
    clearInterval(hexIv);

    await wait(350);
    if (cancelledRef.current) return;

    setPhase('boot');
    for (let i = 0; i < BOOT_LINES.length; i++) {
      if (cancelledRef.current) return;
      await wait(180 + Math.random() * 160);
      if (cancelledRef.current) return;
      setVisibleLines((prev) => [...prev, BOOT_LINES[i]]);
    }

    await wait(300);
    if (cancelledRef.current) return;
    setPhase('granted');

    await wait(1000);
    if (cancelledRef.current) return;
    setPhase('exit');

    await wait(700);
    if (!cancelledRef.current) onDone();
  }

  function handleAuthenticate(e: React.FormEvent) {
    e.preventDefault();
    runSequence();
  }

  function skip() {
    if (skippedRef.current) return;
    skippedRef.current = true;
    cancelledRef.current = true;
    setPhase('exit');
    setTimeout(onDone, 400);
  }

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-void px-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-70" />
          <button
            onClick={skip}
            className="absolute right-5 top-5 font-mono text-[11px] tracking-widest text-fog/70 transition-colors hover:text-phosphor"
          >
            SKIP [ESC]
          </button>

          <div className="w-full max-w-md font-mono text-sm sm:text-base">
            <div className="mb-4 flex items-center gap-2 text-xs tracking-widest text-fog/60">
              <span className="h-2 w-2 rounded-full bg-phosphor animate-blink" />
              SECURE TERMINAL // {phase.toUpperCase()}
            </div>

            {phase === 'login' && (
              <motion.form
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleAuthenticate}
                className="clip-corner border border-line bg-panel/60 p-5"
              >
                <div className="mb-4 text-center text-xs tracking-[0.3em] text-phosphor/80 text-glow">
                  ▲ RESTRICTED ACCESS ▲
                </div>

                <label className="mb-1 block text-[11px] tracking-widest text-fog/50">
                  OPERATOR ID
                </label>
                <input
                  value={operatorId}
                  onChange={(e) => setOperatorId(e.target.value)}
                  placeholder="guest"
                  autoComplete="off"
                  className="mb-4 w-full border border-line bg-void/70 px-3 py-2 text-phosphor outline-none placeholder:text-fog/30 focus:border-phosphordim"
                />

                <label className="mb-1 block text-[11px] tracking-widest text-fog/50">
                  ACCESS KEY
                </label>
                <input
                  type="password"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="off"
                  className="mb-5 w-full border border-line bg-void/70 px-3 py-2 text-phosphor outline-none placeholder:text-fog/30 focus:border-phosphordim"
                />

                <button
                  type="submit"
                  className="w-full border border-phosphordim/70 bg-phosphor/[0.06] py-2.5 text-xs tracking-[0.2em] text-phosphor transition-colors hover:bg-phosphor/[0.14]"
                >
                  AUTHENTICATE ›
                </button>

                <p className="mt-3 text-center text-[10px] text-fog/35">
                  any credentials accepted // public case file
                </p>
              </motion.form>
            )}

            {phase === 'scanning' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="clip-corner border border-line bg-panel/60 p-5"
              >
                <div className="mb-3 text-phosphor/90">
                  {'>'} verifying operator credentials...
                </div>
                <div className="mb-2 h-2 w-full overflow-hidden border border-line bg-void/70">
                  <motion.div
                    className="h-full bg-phosphor/80"
                    animate={{ width: `${scanPct}%` }}
                    transition={{ ease: 'linear' }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-fog/50">
                  <span>{hexTicker}</span>
                  <span>{Math.floor(scanPct)}%</span>
                </div>
              </motion.div>
            )}

            {(phase === 'boot' || phase === 'granted') && (
              <div>
                <div className="space-y-1.5">
                  {visibleLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-glow text-phosphor/90"
                    >
                      <span className="mr-2 text-fog/50">{'>'}</span>
                      {line}
                    </motion.div>
                  ))}
                </div>

                {phase === 'boot' && (
                  <span className="mt-1 inline-block h-4 w-2 animate-blink bg-phosphor/80 align-middle" />
                )}

                <AnimatePresence>
                  {phase === 'granted' && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="clip-corner mt-6 border border-phosphordim/60 px-4 py-3"
                    >
                      <div className="text-glow-amber text-lg tracking-[0.2em] text-amber">
                        ACCESS GRANTED
                      </div>
                      <div className="mt-1 text-xs text-fog/60">
                        loading case file for public view...
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
