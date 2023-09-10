import type { Metadata } from 'next';
import Link from 'next/link';
import { FloatLayoutLabel } from '@/components/FloatLayoutLabel';
import './globals.css';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja'>
      <body className='h-full min-h-screen'>
        <div className='bg-blue-200 min-h-screen flex flex-col relative'>
          <FloatLayoutLabel>RootLayout</FloatLayoutLabel>
          <header className='flex items-center gap-6 py-2 px-4 text-white font-bold bg-blue-900'>
            <Link href='/'>Home</Link>
            <Link href='/blog'>Blog</Link>
            <Link href='/store'>Store</Link>
            <Link href='/study'>Study</Link>
          </header>
          <main className='p-5 flex-grow'>{children}</main>
          <footer className='py-1 text-center bg-blue-900 text-white font-bold'>
            progLearning
          </footer>
        </div>
      </body>
    </html>
  );
}
