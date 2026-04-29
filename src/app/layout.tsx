import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZAOstock 2026',
  description: 'A one-day artist-built music festival in downtown Ellsworth, Maine. October 3, 2026. Run by The ZAO.',
  metadataBase: new URL('https://zaostock.com'),
  openGraph: {
    title: 'ZAOstock 2026',
    description: 'A one-day artist-built music festival in downtown Ellsworth, Maine. October 3, 2026.',
    url: 'https://zaostock.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
