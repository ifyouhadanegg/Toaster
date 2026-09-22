import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Toast Demo',
  description: 'A small Toast Demo ordering workflow built with Next.js.',
  icons: {
    icon: '/icon.webp',
    apple: '/icon.webp'
  },
  appleWebApp: {
    capable: true,
    title: 'Toast Demo',
    statusBarStyle: 'default'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}