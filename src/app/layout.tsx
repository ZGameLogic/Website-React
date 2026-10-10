import type { Metadata } from 'next';
import ThemeWrapperComponent from '@/src/app/theme-wrapper.component.tsx';
import NavigationComponent from '@/src/app/navigation.component.tsx';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import {GlobalDataProvider} from '@/src/global/global-data.provider.tsx';

export const metadata: Metadata = {
  title: 'Ben Shabowski',
  description: 'A website for Ben Shabowski',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html>
    <body>
      <AppRouterCacheProvider>
        <GlobalDataProvider>
          <ThemeWrapperComponent>
            <NavigationComponent />
            {children}
          </ThemeWrapperComponent>
        </GlobalDataProvider>
      </AppRouterCacheProvider>
    </body>
  </html>;
}
