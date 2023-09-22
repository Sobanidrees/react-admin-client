import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { HeaderDrawer } from '../../components/header/HeaderDrawer';
import { Toolbar, Typography } from '@mui/material';
import { APP_FONT } from '../../constants/AppFont';
import { SRCard } from '../../components/sr-card/Cards';

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
