import type { Metadata } from 'next';
import ThemeWrapperComponent from '@/src/app/theme-wrapper.component.tsx';
import NavigationComponent from '@/src/app/navigation.component.tsx';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

export const metadata: Metadata = {
  title: 'Ben Shabowski',
  description: 'A website for Ben Shabowski',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html>
    <body>
      <AppRouterCacheProvider>
        <ThemeWrapperComponent>
          <NavigationComponent />
          {children}
        </ThemeWrapperComponent>
      </AppRouterCacheProvider>
    </body>
  </html>;
}
