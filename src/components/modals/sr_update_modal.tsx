import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { APP_FONT } from '../../constants/app_font';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { UpdateServiceRequestDto } from '../../models/service_requests';
import { unwrapResult } from '@reduxjs/toolkit';
import { updateServiceRequests } from '../../redux/actions/service_request';
import { useDispatch } from 'react-redux';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  bgcolor: '#eeeeee',
  border: '1px solid #000',
  borderRadius: '10px',
  px: 4,
  pb: 4,
};

export default function SrUpdateModal(props: any) {
  const { open, setOpen, selectedId } = props;
  const [date, setDate] = React.useState('');
  const [time, setTime] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<any>();
  const dispatch = useDispatch();

  const formatSelectedDate = (date: any) => {
    const dateObject = new Date(date);
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    const year = dateObject.getFullYear().toString();
    const formattedDate = `${month}/${day}/${year}`;
    setDate(formattedDate);
  };

  const formatSelectedTime = (time: any) => {
    const dateObject = new Date(time);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours}:${minutes
      .toString()
      .padStart(2, '0')} ${amOrPm}`;
    setTime(formattedTime);
  };

  const updateDateTime: UpdateServiceRequestDto = {
    serviceRequestId: selectedId,
    date: date,
    time: time,
  };
  const updateSR = () => {
    dispatch<any>(updateServiceRequests(updateDateTime))
      .then(unwrapResult)
      .then((update_sr: any) => {
        // setDate(update_sr.date);
        // setTime(update_sr.time);
        console.log(update_sr.date,update_sr.time);
        if (update_sr) {
          setOpen(!open);
        } else {
          setError(error);
        }
      })
      .catch((err: any) => {
        // handle result here
        setLoading(false);
        setError(err);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            style={{
              borderRadius: '20px',
              minWidth: '10px',
              marginLeft: '97%',
            }}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <CloseIcon style={{ color: '#9E9E9E' }} />
          </Button>
          <Stack
            direction={'column'}
            spacing={3}
            style={{ alignItems: 'center' }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update The Service Request Time
            </Typography>
            <Stack spacing={2} alignItems={'center'}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(date: any) => formatSelectedDate(date)}
                  value={date}
                  label="Select Date"
                  sx={{
                    width: '120%',
                    '& input:focus': {
                      borderColor: '#fff',
                    },
                  }}
                />
                <TimePicker
                  onChange={(time: any) => formatSelectedTime(time)}
                  value={time}
                  label="Select Time"
                  sx={{ width: '120%' }}
                />
              </LocalizationProvider>
            </Stack>
            <Button
              onClick={updateSR}
              sx={{
                width: '75%',
                borderRadius: '10px',
                bgcolor: '#dddddd',
                borderColor: '#000',
                borderWidth: 0.5,
                '&:hover': {
                  backgroundColor: '#003650',
                  '& .MuiTypography-root': {
                    color: '#fff',
                  },
                },
              }}
              variant="outlined"
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontFamily: APP_FONT,
                  fontWeight: 500,
                  textTransform: 'none',
                  paddingY: 0.5,
                  color: '#000',
                }}
              >
                Update Request
              </Typography>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
