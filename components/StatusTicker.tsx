'use client';

const MESSAGES = [
  'CONNECTION SECURE',
  'NODE-7 RELAY ACTIVE',
  '30+ OPERATIONS LOGGED',
  'AFFILIATED SINCE 2009',
  'DOSSIER INTEGRITY: OK',
  'THREAT LEVEL: NOMINAL',
  'UPTIME: 15+ YEARS',
];

export default function StatusTicker() {
  const line = MESSAGES.join('   //   ');
  return (
    <div className="fixed inset-x-0 top-0 z-30 hidden overflow-hidden border-b border-line bg-void/80 py-1.5 backdrop-blur-sm sm:block">
      <div className="animate-[ticker_28s_linear_infinite] whitespace-nowrap font-mono text-[10px] tracking-[0.2em] text-phosphordim/70">
        <span className="mx-4">{line}</span>
        <span className="mx-4">{line}</span>
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[ticker_28s_linear_infinite\\] { animation: none; }
        }
      `}</style>
    </div>
  );
}
