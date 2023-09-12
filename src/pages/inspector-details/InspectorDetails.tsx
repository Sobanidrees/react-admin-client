import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { HeaderDrawer } from '../../components/header/HeaderDrawer';
import { AdminDto } from '../../models/Account';
import { useState } from 'react';

interface Props {
  window?: () => Window;
}

export const InspectorDetails = (props: Props) => {
  const [admin, setAdmin] = useState<AdminDto>();
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <HeaderDrawer />
    </Box>
  );
};
