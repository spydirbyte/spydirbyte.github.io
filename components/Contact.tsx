'use client';

import { identity } from '@/lib/content';
import { SectionHeader } from './Dossier';

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 pb-32 pt-24 sm:pl-28 sm:pr-10 sm:pb-24">
      <SectionHeader eyebrow="05 // TRANSMIT" title="Open a Channel" />

      <p className="mt-6 max-w-lg text-sm leading-relaxed text-fog/70">
        Reach out through any of the channels below. Verified identity only, all others will be
        logged and ignored.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        {identity.socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="clip-corner border border-line bg-panel/60 px-5 py-3 font-mono text-xs tracking-wide text-fog transition-all duration-200 hover:-translate-y-0.5 hover:border-phosphordim hover:text-phosphor hover:shadow-[0_0_18px_rgba(74,222,156,0.18)]"
          >
            <div className="text-[10px] text-fog/40">{s.label}</div>
            <div className="mt-0.5">{s.handle}</div>
          </a>
        ))}
      </div>

      <div className="mt-20 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] tracking-wide text-fog/40 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} SPYDIR // END OF FILE</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-phosphor animate-blink" />
          CONNECTION SECURE
        </span>
      </div>
    </section>
  );
}
