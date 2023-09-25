import { useEffect, useState } from 'react';
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
import { APP_FONT } from '../../constants/AppFont';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../redux/actions/admin';
import { unwrapResult } from '@reduxjs/toolkit';

const drawerWidth = 240;

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
  marginY: '6px',
  color: '#fff',
  '&:hover': {
    color: '#fff',
  },
};

export const HeaderDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const [isLoading, setLoading] = useState<boolean>(false);
  const adminString = localStorage.getItem('admin');
  const [focusedItem, setFocusedItem] = useState(-1);

  if (adminString) {
    var admin = JSON.parse(adminString);
  }

  const onLogout = () => {
    setLoading(true);
    dispatch<any>(adminLogout())
      .then(unwrapResult)
      .then((admin: any) => {
        navigate('/');
      })
      .catch((err: any) => {
        setLoading(false);
        console.error('error', err);
      });
  };

  useEffect(() => {
    if (currentPath === '/dashboard') {
      setFocusedItem(0);
    } else if (currentPath === '/inspector-details') {
      setFocusedItem(1);
    } else {
      setFocusedItem(-1);
    }
  }, [currentPath]);

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
              sx={{
                height: 40,
                width: 40,
                color: '#008080',
                fontWeight: 700,
                backgroundColor: '#fff',
              }}
            >
              {admin.email.charAt(0).toUpperCase()}
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
                  <ListItemButton
                    selected={focusedItem === 0}
                    sx={{
                      '&.Mui-selected': {
                        backgroundColor: '#00897B',
                        '&:hover': {
                          backgroundColor: '#00897B',
                        },
                      },
                    }}
                  >
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
                <ListItemButton
                  selected={focusedItem === 1}
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: '#00897B',
                      '&:hover': {
                        backgroundColor: '#00897B',
                      },
                    },
                  }}
                >
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
