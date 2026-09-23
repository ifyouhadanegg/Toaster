import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Codename:PhewBar — Toast Demo',
  description: 'A demo Toast-powered gifting flow: pick a venue, buy a beverage, and share it as a gift.',
  icons: {
    icon: '/icon.webp',
    apple: '/icon.webp'
  },
  appleWebApp: {
    capable: true,
    title: 'Codename:PhewBar',
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