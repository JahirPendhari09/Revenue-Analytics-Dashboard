import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LabelProvider } from '@/contexts/LabelContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sales Dashboard',
  description: 'Full-stack dashboard application with editable labels',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LabelProvider>
          {children}
        </LabelProvider>
      </body>
    </html>
  );
}