'use client';

import {ReactNode} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, useMediaQuery} from '@mui/material';

export default function ThemeWrapperComponent({ children }: { children: ReactNode }) {
  const prefersLightMode = useMediaQuery('(prefers-color-scheme: light)');

  const theme = createTheme({
    palette: {
      mode: prefersLightMode ? 'light' : 'dark',
      primary: {
        main: '#9b3fba',
      }
    },
  });

  return <ThemeProvider theme={theme}>
    <CssBaseline />
    {children}
  </ThemeProvider>;
};
