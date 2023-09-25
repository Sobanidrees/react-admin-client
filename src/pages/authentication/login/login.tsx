import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Typography,
  createTheme,
  ThemeProvider,
  Grid,
  CssBaseline,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as EfyxLogo } from '../../../assets/images/efyxLogo.svg';
import { APP_FONT } from '../../../constants/AppFont';
import { useDispatch } from 'react-redux';
import { AdminDto } from '../../../models/account';
import { adminLogin } from '../../../redux/actions/admin';
import { unwrapResult } from '@reduxjs/toolkit';

type LoginBase = {
  email: string;
  password: string;
};

const theme = createTheme({
  typography: {
    fontFamily: APP_FONT,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'linear-gradient(to right bottom, #008080, #003650)',
        },
      },
    },
  },
});

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      navigate('/dashboard');
    }
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginBase>({
    shouldUseNativeValidation: true,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const submit: SubmitHandler<any> = async (login: LoginBase) => {
    setError(null);
    setLoading(true);
    const admin: AdminDto = {
      email: login.email,
      password: login.password,
    };
    dispatch<any>(adminLogin(admin))
      .then(unwrapResult)
      .then((adminJwt: string) => {
        setLoading(false);
        if (adminJwt) {
          navigate('/dashboard');
        }
      })
      .catch((err: any) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          justifyContent: 'center',
        }}
      >
        <EfyxLogo
          height={75}
          width={150}
          style={{ position: 'absolute', marginTop: 60 }}
        />
        <CssBaseline />
        <Box
          sx={{
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '4%',
            boxShadow: '5px 5px 10px',
          }}
        >
          {error && (
            <Typography fontSize="14px" color="error">
              {error}
            </Typography>
          )}
          <Box component="form">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '412px',
              }}
            >
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Please enter your email.',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email format',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    type="text"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    autoFocus
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{
                  minLength: {
                    value: 8,
                    message: 'Password should be greater then 8 letters',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Password should be less then 20 letters',
                  },
                  required: 'Please enter your password.',
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message: 'Invalid password format',
                  },
                }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    value={value}
                    onChange={onChange}
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />
                )}
              />
              <Button
                onClick={handleSubmit(submit)}
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 10,
                  backgroundColor: '#008080',
                  '&:hover': {
                    backgroundColor: '#003650',
                  },
                }}
              >
                Login
              </Button>
            </div>
          </Box>
        </Box>
        {isLoading && (
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
            onClick={() => {}}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
