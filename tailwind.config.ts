import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#07090a',
        panel: '#0d1210',
        line: '#1c2622',
        phosphor: '#4ade9c',
        phosphordim: '#2a7a5c',
        amber: '#e0a458',
        alert: '#c4453f',
        bone: '#e8e6dc',
        fog: '#8a9490',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        scanlines:
          'repeating-linear-gradient(180deg, rgba(74,222,156,0.035) 0px, rgba(74,222,156,0.035) 1px, transparent 1px, transparent 3px)',
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.4' },
          '94%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scan: 'scan 6s linear infinite',
        flicker: 'flicker 4s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
