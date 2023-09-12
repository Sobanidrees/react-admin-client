import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { HeaderDrawer } from '../../components/header/header_drawer';
import { AdminDto } from '../../models/account';

interface Props {
  window?: () => Window;
}

export const InspectorDetails = (props: Props) => {
  const [admin, setAdmin] = React.useState<AdminDto>();
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderDrawer />
    </Box>
  );
};
