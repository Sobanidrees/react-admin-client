import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { HeaderDrawer } from '../../components/header/header_drawer';
import { Toolbar, Typography } from '@mui/material';
import { APP_FONT } from '../../constants/app_font';
import { SRCard } from '../../components/sr_card/cards';

export const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        <Toolbar />
        <Typography
          sx={{
            fontFamily: APP_FONT,
            fontWeight: '600',
            fontSize: '48px',
            color: '#003650',
          }}
        >
          Service Requests
        </Typography>
        <SRCard />
      </Box>
    </Box>
  );
};
