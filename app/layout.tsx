import type { Metadata } from 'next';
import './globals.css';
import MatrixRain from '@/components/MatrixRain';

export const metadata: Metadata = {
  title: 'SPYDIR // Case File',
  description:
    '15+ years of hacktivism, OSINT, red team operations, and open-source security tooling. Affiliated with Anonymous since 2009.',
  metadataBase: new URL('https://spydirbyte.github.io'),
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: 'SPYDIR // Case File',
    description:
      '15+ years of hacktivism, OSINT, red team operations, and open-source security tooling.',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SPYDIRBYTE' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SPYDIR // Case File',
    description:
      '15+ years of hacktivism, OSINT, red team operations, and open-source security tooling.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MatrixRain />
        <div className="grain-overlay bg-grain" />
        <div className="crt-overlay" />
        {children}
      </body>
    </html>
  );
}
