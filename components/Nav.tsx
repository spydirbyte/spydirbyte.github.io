'use client';

import { useEffect, useState } from 'react';
import { Terminal, UserSquare2, ListTree, FolderGit2, Radar, Send } from 'lucide-react';

const SECTIONS = [
  { id: 'home', label: 'Home', icon: Terminal },
  { id: 'dossier', label: 'Dossier', icon: UserSquare2 },
  { id: 'ops', label: 'Ops Log', icon: ListTree },
  { id: 'repos', label: 'Repos', icon: FolderGit2 },
  { id: 'skills', label: 'Skills', icon: Radar },
  { id: 'contact', label: 'Contact', icon: Send },
];

export default function Nav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Mobile bottom app bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-line bg-void/90 backdrop-blur-md">
        <ul className="flex items-center justify-between px-2 py-2">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <li key={id} className="flex-1">
              <a
                href={`#${id}`}
                className={`flex flex-col items-center gap-1 py-1 text-[10px] font-mono tracking-wide transition-colors ${
                  active === id ? 'text-phosphor' : 'text-fog/50'
                }`}
              >
                <Icon size={18} strokeWidth={1.75} />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop side dock */}
      <nav className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 sm:flex">
        <ul className="flex flex-col gap-5 border-l border-line pl-4">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`group flex items-center gap-3 font-mono text-[11px] tracking-widest transition-all duration-200 hover:scale-105 ${
                  active === id ? 'text-phosphor' : 'text-fog/40 hover:text-fog/80'
                }`}
              >
                <Icon size={15} strokeWidth={1.75} />
                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    active === id ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0 group-hover:max-w-[100px] group-hover:opacity-100'
                  }`}
                >
                  {label.toUpperCase()}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
