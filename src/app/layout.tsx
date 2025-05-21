import '../global.css';

import type { Metadata } from 'next';
import { Plus_Jakarta_Sans as PlusJakartaSans } from 'next/font/google';

import Analytics from '@/components/analytics';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { ThemeProvider } from '@/components/providers';
import { seo } from '@/data/meta';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const fontSans = PlusJakartaSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = seo();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={fontSans.variable}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div
            className={cn(
              'min-h-screen h-full w-full flex flex-col justify-start',
              'bg-primary/30',
            )}
          >
            <Header />
            <main
              className={cn(
                'container px-2 md:px-8 py-4 h-full overflow-clip rounded-lg justify-start items-start md:py-0',
              )}
            >
              {children}
            </main>
            <Toaster />
            <Footer />
            <Analytics />{' '}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
