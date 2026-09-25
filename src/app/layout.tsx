import type { Metadata } from 'next';
import ThemeWrapper from '@/src/app/ThemeWrapper';
import Navigation from '@/src/app/Navigation';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export const metadata: Metadata = {
  title: 'Ben Shabowski',
  description: 'A website for Ben Shabowski',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html>
    <body>
      <AppRouterCacheProvider>
        <ThemeWrapper>
          <Navigation />
          {children}
        </ThemeWrapper>
      </AppRouterCacheProvider>
    </body>
  </html>;
}
