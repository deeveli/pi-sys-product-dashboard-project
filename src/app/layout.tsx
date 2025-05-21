import '../global.css';

import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google';
import React from 'react';

import Analytics from '@/components/analytics';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ThemeProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { DEFAULT_VIEWPORT, seo } from '@/data/meta';
import { cn } from '@/lib/utils';

const fontSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = seo();
export const viewport: Viewport = DEFAULT_VIEWPORT;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, 'light')}
      style={{ colorScheme: 'light' }}
    >
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex size-full min-h-screen flex-col justify-start bg-primary/30">
            <Header />
            <main className="container h-full items-start justify-start text-clip rounded-lg px-2 py-4 md:px-8 md:py-0">
              {children}
            </main>
            <Toaster />
            <Footer />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
