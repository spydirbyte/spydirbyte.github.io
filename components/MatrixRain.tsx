'use client';

import { useEffect, useRef } from 'react';

export default function MatrixRain({ opacityClass = 'opacity-[0.24]' }: { opacityClass?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ01SPYDIR#$%&+-_/\\<>[]{}';
    let cols: number;
    let drops: number[];
    const fontSize = 15;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      cols = Math.floor(canvas!.width / fontSize);
      drops = new Array(cols).fill(0).map(() => Math.random() * -100);
    }
    resize();
    window.addEventListener('resize', resize);

    if (reduceMotion) {
      return () => window.removeEventListener('resize', resize);
    }

    let raf: number;
    let lastTime = 0;
    const interval = 60;

    function draw(time: number) {
      raf = requestAnimationFrame(draw);
      if (time - lastTime < interval) return;
      lastTime = time;

      ctx!.fillStyle = 'rgba(7, 9, 10, 0.12)';
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      ctx!.font = `${fontSize}px monospace`;

      for (let i = 0; i < cols; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const isHead = Math.random() > 0.94;
        ctx!.fillStyle = isHead ? 'rgba(196, 255, 220, 0.9)' : 'rgba(74, 222, 156, 0.35)';
        ctx!.fillText(char, x, y);

        if (y > canvas!.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    }
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-0 ${opacityClass}`}
      aria-hidden="true"
    />
  );
}
