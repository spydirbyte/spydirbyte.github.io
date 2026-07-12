'use client';

import { useEffect, useState } from 'react';

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#01';

export default function GlitchText({
  text,
  className = '',
  triggerOnMount = true,
}: {
  text: string;
  className?: string;
  triggerOnMount?: boolean;
}) {
  const [display, setDisplay] = useState(triggerOnMount ? '' : text);

  useEffect(() => {
    if (!triggerOnMount) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const totalFrames = 18;
    let raf: number;

    function tick() {
      frame++;
      const revealCount = Math.floor((frame / totalFrames) * text.length);
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (i < revealCount) {
          out += text[i];
        } else if (text[i] === ' ') {
          out += ' ';
        } else {
          out += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        }
      }
      setDisplay(out);
      if (frame < totalFrames) {
        raf = window.setTimeout(tick, 45) as unknown as number;
      } else {
        setDisplay(text);
      }
    }
    tick();
    return () => clearTimeout(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  function handleHover() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;
    let frame = 0;
    const totalFrames = 8;
    const iv = setInterval(() => {
      frame++;
      let out = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') {
          out += ' ';
        } else if (Math.random() > 0.75) {
          out += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        } else {
          out += text[i];
        }
      }
      setDisplay(out);
      if (frame >= totalFrames) {
        clearInterval(iv);
        setDisplay(text);
      }
    }, 45);
  }

  return (
    <span className={className} onMouseEnter={handleHover}>
      {display}
    </span>
  );
}
