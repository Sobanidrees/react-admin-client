import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ReactComponent as EfyxLogo } from '../../assets/images/efyxLogo.svg';
import { ReactComponent as HomeIcon } from '../../assets/images/home.svg';
import { ReactComponent as InspectorIcon } from '../../assets/images/inspector.svg';
import { ReactComponent as LogoutIcon } from '../../assets/images/logout.svg';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { APP_FONT } from '../../constants/app_font';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../redux/actions/admin';
import { unwrapResult } from '@reduxjs/toolkit';

const drawerWidth = 240;

export const HeaderDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = React.useState(false);
  const adminString = localStorage.getItem('admin');
  if (adminString) {
    var admin = JSON.parse(adminString);
  }

  const firstCharacter = admin.email.charAt(0).toUpperCase();

  const handleNavigateToDashboard = React.useCallback(() => {
    navigate('/dashboard');
  }, []);

  const theme = createTheme({
    typography: {
      fontFamily: APP_FONT,
    },
    components: {
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: '#00897B',
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontWeight: 600,
          },
        },
      },
    },
  });

  const drawerTab = {
    color: '#fff',
    '&:hover': {
      color: '#fff',
    },
  };

  const onLogout = () => {
    setLoading(true);
    dispatch<any>(adminLogout())
      .then(unwrapResult)
      .then((admin: any) => {
        navigate('/');
      })
      .catch((err: any) => {
        setLoading(false);
        console.log('error');
      });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: '#0EA1AB',
        }}
      >
        <Toolbar>
          <EfyxLogo height={75} width={150} />
          <IconButton sx={{ ml: 'auto' }}>
            <Avatar
              style={{
                height: 40,
                width: 40,
                color: '#008080',
                fontWeight: 700,
                backgroundColor: '#fff',
              }}
            >
              {firstCharacter}
            </Avatar>
          </IconButton>
          <Typography
            color="inherit"
            sx={{
              fontFamily: APP_FONT,
              fontWeight: '600',
              fontSize: '18px',
              color: '#fff',
            }}
          >
            {admin.email}
          </Typography>

          <Button onClick={onLogout} sx={{ ml: '20px' }}>
            <LogoutIcon style={{ marginLeft: '10px', marginRight: '10px' }} />
            <Typography
              sx={{
                fontFamily: APP_FONT,
                fontWeight: '600',
                fontSize: '18px',
                color: '#fff',
                textTransform: 'none',
              }}
            >
              Logout
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#80CBC4',
            marginY: '40px',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ThemeProvider theme={theme}>
              <Box sx={{ marginBottom: '10px' }}>
                <ListItem
                  key={'Dashboard'}
                  onClick={() => navigate('/dashboard')}
                  disablePadding
                >
                  <ListItemButton>
                    <HomeIcon
                      height={30}
                      width={30}
                      style={{ marginRight: '15px' }}
                    />
                    <ListItemText sx={drawerTab} primary={'Dashboard'} />
                  </ListItemButton>
                </ListItem>
              </Box>

              <ListItem
                key={'Inspector Details'}
                onClick={() => navigate('/inspector-details')}
                disablePadding
              >
                <ListItemButton>
                  <InspectorIcon
                    height={30}
                    width={30}
                    style={{ marginRight: '15px' }}
                  />
                  <ListItemText sx={drawerTab} primary={'Inspector Details'} />
                </ListItemButton>
              </ListItem>
            </ThemeProvider>
          </List>
        </Box>
      </Drawer>
      {isLoading && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
};
