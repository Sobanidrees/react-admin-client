import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { HeaderDrawer } from '../../components/header/HeaderDrawer';
import InspectorsList from '../../components/inspectors-list/InspectorsList';
import { Toolbar, Typography } from '@mui/material';
import { APP_FONT } from '../../constants/AppFont';
import { useLocation } from 'react-router-dom';

export const InspectorDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

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
          Inspectors Details
        </Typography>
        <InspectorsList id={id} />
      </Box>
    </Box>
  );
};
