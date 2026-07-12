'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Copy, Check } from 'lucide-react';
import { repos, type Repo } from '@/lib/content';
import { SectionHeader } from './Dossier';

export default function Repos() {
  return (
    <section id="repos" className="relative px-6 py-24 sm:pl-28 sm:pr-10">
      <SectionHeader eyebrow="03 // TOOLING" title="Open Source Repos" />

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {repos.map((repo, i) => (
          <RepoCard key={repo.slug} repo={repo} index={i} />
        ))}
      </div>
    </section>
  );
}

function RepoCard({ repo, index }: { repo: Repo; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 8 });
  }

  function resetTilt() {
    setTilt({ x: 0, y: 0 });
  }

  function copyClone(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard?.writeText(`git clone https://github.com/spydirbyte/${repo.slug}.git`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="group relative flex flex-col overflow-hidden border border-line bg-panel/50 transition-colors hover:border-phosphordim"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* scan sweep on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-phosphor/[0.07] to-transparent transition-transform duration-700 group-hover:translate-y-full" />

        <a
          href={`https://github.com/spydirbyte/${repo.slug}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 flex-col"
        >
          {/* terminal chrome header */}
          <div className="flex items-center justify-between border-b border-line bg-void/50 px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-alert/70" />
              <span className="h-2 w-2 rounded-full bg-amber/70" />
              <span className="h-2 w-2 rounded-full bg-phosphordim" />
            </div>
            <span className="font-mono text-[10px] text-fog/40">
              ~/spydirbyte/{repo.slug}
            </span>
          </div>

          <div className="flex flex-1 flex-col p-5 pb-0">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 font-mono text-sm text-bone">
                <FolderGit2 size={16} className="shrink-0 text-phosphordim" />
                {repo.name}
              </div>
              <ExternalLink
                size={14}
                className="shrink-0 text-fog/30 transition-colors group-hover:text-phosphor"
              />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-fog/70">{repo.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {repo.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] tracking-wide text-phosphordim/90">
                  #{t.replace(/\s+/g, '_').toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </a>

        <div className="p-5 pt-4">
          <button
            onClick={copyClone}
            className="flex w-full items-center justify-between gap-2 border border-line bg-void/60 px-3 py-2 text-left font-mono text-[11px] text-fog/60 transition-colors hover:border-phosphordim hover:text-phosphor"
          >
            <span className="truncate">
              <span className="text-phosphordim">$</span> git clone {repo.slug}.git
            </span>
            {copied ? (
              <Check size={13} className="shrink-0 text-phosphor" />
            ) : (
              <Copy size={13} className="shrink-0" />
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
