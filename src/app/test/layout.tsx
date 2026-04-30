import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
