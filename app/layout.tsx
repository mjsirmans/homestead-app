import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Homestead',
  description: 'Family childcare coordination',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
