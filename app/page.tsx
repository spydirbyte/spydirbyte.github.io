'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IntroCinematic from '@/components/IntroCinematic';
import AccessSequence from '@/components/AccessSequence';
import Nav from '@/components/Nav';
import StatusTicker from '@/components/StatusTicker';
import Hero from '@/components/Hero';
import Dossier from '@/components/Dossier';
import OpsRecord from '@/components/OpsRecord';
import Repos from '@/components/Repos';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

type Stage = 'intro' | 'access' | 'main';

export default function Home() {
  // Always plays on every load, every visit -- no session skip.
  const [stage, setStage] = useState<Stage>('intro');

  function handleIntroDone() {
    setStage('access');
  }

  function handleAccessDone() {
    setStage('main');
  }

  return (
    <>
      <AnimatePresence>
        {stage === 'intro' && <IntroCinematic key="intro" onDone={handleIntroDone} />}
      </AnimatePresence>

      <AnimatePresence>
        {stage === 'access' && <AccessSequence key="access" onDone={handleAccessDone} />}
      </AnimatePresence>

      {stage === 'main' && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 pb-16 sm:pb-0"
        >
          <StatusTicker />
          <Nav />
          <div className="mx-auto max-w-[1800px] sm:pt-9">
            <Hero />
            <Dossier />
            <OpsRecord />
            <Repos />
            <Skills />
            <Contact />
          </div>
        </motion.main>
      )}
    </>
  );
}
