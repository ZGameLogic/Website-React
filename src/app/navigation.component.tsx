'use client';

import {AppBar, Divider, Button, Typography, Toolbar} from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavigationComponent(){
  const pathname = usePathname();

  return <AppBar position={'static'} sx={{ marginBottom: 2 }}>
    <Toolbar>
      <Typography sx={{ marginRight: 2 }} variant={'h4'}>Ben Shabowski</Typography>
      <Divider orientation={'vertical'} flexItem sx={{ marginRight: 2 }} />
      <Button
        sx={{
          borderRadius: 0,
          '&.active': { borderBottom: '2px solid white' },
          ...(pathname === '/' && { borderBottom: '2px solid white' })
        }}
        color={'inherit'}
        component={Link}
        href={'/'}
      >
        Project Dashboard
      </Button>
      <Button
        sx={{
          borderRadius: 0,
          '&.active': { borderBottom: '2px solid white' },
          ...(pathname === '/architecture' && { borderBottom: '2px solid white' })
        }}
        color={'inherit'}
        component={Link}
        href={'/architecture'}
      >
        architecture
      </Button>
    </Toolbar>
  </AppBar>;
}
