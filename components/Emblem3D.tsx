'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Emblem3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgFailed, setImgFailed] = useState(false);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -18, y: px * 22 });
  }

  function reset() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative mx-auto h-64 w-64 select-none sm:h-80 sm:w-80"
      style={{ perspective: 1000 }}
      aria-hidden="true"
    >
      {/* ambient glow sits behind everything, outside the 3D group so blur filters can't
          break preserve-3d depth sorting and cover the emblem image */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-phosphor/[0.08] blur-3xl" />

      <motion.div
        className="relative h-full w-full"
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-phosphordim/40"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(72deg)' }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-phosphordim/70"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${(360 / 8) * i}deg) translate(150px) rotate(-${(360 / 8) * i}deg)`,
              }}
            />
          ))}
        </motion.div>

        {/* mid ring, counter-rotating */}
        <motion.div
          className="absolute inset-10 rounded-full border border-phosphor/25"
          animate={{ rotateZ: -360 }}
          transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          style={{ transformStyle: 'preserve-3d', transform: 'rotateX(58deg)' }}
        />

        {/* inner dashed ring */}
        <motion.div
          className="absolute inset-20 rounded-full border border-dashed border-amber/30"
          animate={{ rotateZ: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {/* core mark, floats forward in z */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-phosphordim/60 bg-void/70 shadow-[0_0_35px_rgba(74,222,156,0.3)] sm:h-32 sm:w-32">
            {imgFailed ? (
              <HoodFallback />
            ) : (
              <img
                src="/emblem.png"
                alt="SPYDIR emblem"
                onError={() => setImgFailed(true)}
                className="h-20 w-20 object-contain drop-shadow-[0_0_12px_rgba(74,222,156,0.55)] sm:h-24 sm:w-24"
                draggable={false}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function HoodFallback() {
  return (
    <svg width="40" height="40" viewBox="0 0 120 120" className="text-phosphor">
      <path
        d="M60 8 C30 8 16 34 16 60 C16 84 30 100 34 108 L86 108 C90 100 104 84 104 60 C104 34 90 8 60 8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        opacity="0.9"
      />
      <circle cx="48" cy="58" r="5" fill="currentColor" />
      <circle cx="72" cy="58" r="5" fill="currentColor" />
      <path d="M48 78 Q60 86 72 78" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
    </svg>
  );
}
