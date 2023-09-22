import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, ThemeProvider, createTheme } from '@mui/material';
import { APP_FONT } from '../../constants/AppFont';
import { useNavigate } from 'react-router-dom';
import SrUpdateModal from '../modals/SrUpdateModal';
import { useDispatch } from 'react-redux';
import { fetchServiceRequests } from '../../redux/actions/service_request';
import { unwrapResult } from '@reduxjs/toolkit';
import { ServiceRequest } from '../../models/service_requests';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: APP_FONT,
  },
});

const cardStyle = {
  width: '71%',
  borderWidth: 1,
  borderColor: '#000',
  marginTop: '15px',
  display: 'flex',
  flexWrap: 'wrap',
};

const leftContentStyle = {
  flex: '50%',
};

const rightContentStyle = {
  flex: '30%',
};

export const SRCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [serviceRequests, setServiceRequests] = useState<
    ServiceRequest[]
  >([]);
  const [showSrUpdateModal, setShowSrUpdateModal] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>();

  const handleNavigateToInspectorDetails = useCallback((id: number) => {
    navigate(`/inspector-details?id=${id}`);
  }, []);

  useEffect(() => {
    dispatch<any>(fetchServiceRequests())
      .then(unwrapResult)
      .then((service_requests: any) => {
        if (service_requests) {
          setServiceRequests(service_requests);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handleUpdateRequest = (id: number) => {
    setSelectedId(id);
    setShowSrUpdateModal(true);
  };

  const updateDateTimeInServiceRequests = (id: number, newDate: string, newTime: string) => {
    const updatedServiceRequests = serviceRequests.map((sr) => {
      if (sr.id === id) {
        return {
          ...sr,
          date: newDate,
          time: newTime,
        };
      }
      return sr;
    });
    setServiceRequests(updatedServiceRequests);
  };

  return (
    <ThemeProvider theme={theme}>
      {!!serviceRequests.length &&
        serviceRequests.map((sr) => (
          <Card key={sr.id} variant="outlined" sx={cardStyle}>
            <CardContent sx={leftContentStyle}>
              <Stack direction={'column'} spacing={1}>
                <Typography
                  variant="h5"
                  sx={{ marginBottom: '3px', fontWeight: 600, color: '#003650' }}
                >
                  {sr.consumer?.fullName}
                </Typography>
                <Typography
                  sx={{
                    marginBottom: '3px',
                    fontWeight: 700,
                    color: '#003650',
                  }}
                >
                  Contact:{' '}
                  <span style={{ color: '#003650', fontWeight: 400 }}>
                    {sr.consumer?.phoneNumber}
                  </span>
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 400, color: '#003650' }}
                >
                  Requested a Service for{' '}
                  <span style={{ color: '#003650', fontWeight: 700 }}>
                    {`${sr.vehicle?.year} ${sr.vehicle?.make} ${sr.vehicle?.model}`}{' '}
                  </span>
                    {moment(sr?.createdAt).fromNow()}
                </Typography>
              </Stack>
            </CardContent>
            <CardContent sx={rightContentStyle}>
              <Stack direction={'row'} spacing={2}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#003650',
                  }}
                >
                  Date:{' '}
                  <span style={{ color: '#003650', fontWeight: 400 }}>
                    {sr.date}
                  </span>
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: '#003650',
                  }}
                >
                  Time:{' '}
                  <span style={{ color: '#003650', fontWeight: 400 }}>
                    {sr.time}
                  </span>
                </Typography>
              </Stack>
            </CardContent>
            <CardActions>
              <Button
                onClick={()=>handleNavigateToInspectorDetails(sr.id)}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  borderColor: '#0EA1AB',
                  color: '#003650',
                  width: 244,
                }}
              >
                ASSIGN TO INSPECTOR
              </Button>
              <Button
                onClick={() => handleUpdateRequest(sr.id)}
                variant="outlined"
                size="small"
                sx={{
                  textTransform: 'none',
                  borderColor: '#0EA1AB',
                  color: '#003650',
                  width: 244,
                }}
              >
                UPDATE THE REQUEST
              </Button>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#003650',
                  marginLeft: '180px',
                  textTransform: 'uppercase',
                }}
              >
                {sr.packageType}
              </Typography>
            </CardActions>
          </Card>
        ))}
      {showSrUpdateModal && (
        <SrUpdateModal
          open={showSrUpdateModal}
          setOpen={setShowSrUpdateModal}
          selectedId={selectedId}
          updateDateTimeInServiceRequests={updateDateTimeInServiceRequests}
        />
      )}
    </ThemeProvider>
  );
};
