import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { APP_FONT } from '../../constants/AppFont';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { InspectorAssignedSr } from '../../models/inspectors';
import { inspectorAssignedSr } from '../../redux/actions/inspectors';
import { UpdateServiceRequestStatus } from '../../models/service_requests';
import { serviceRequestsStatus } from '../../redux/actions/service_request';

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

export default function InspectorAssignedSrModal(props: any) {
  const { open, setOpen, selectedId, srId } = props;
  const [error, setError] = useState<string>();
  const dispatch = useDispatch();

  const assignSR = () => {
    const assignedSr: InspectorAssignedSr = {
      inspectorId: selectedId,
      serviceRequestId: parseInt(srId, 10),
    };
    console.log('serviceRequest====+++++++++', assignedSr);
    dispatch<any>(inspectorAssignedSr(assignedSr))
    .then(unwrapResult)
    .then((assigned_sr: any) => {
      if (assigned_sr) {
        const updateStatus: UpdateServiceRequestStatus = {
          id: parseInt(srId, 10),
          status: 'Pending',
        };
        console.log('updateStatusParams====+++++++++', updateStatus);
        dispatch<any>(serviceRequestsStatus(updateStatus))
          .then(unwrapResult)
          .then(() => {
            setOpen(!open);
          })
          .catch((err: any) => {
            setError(err);
          });
      }
    })
    .catch((err: any) => {
      setError(err);
    });
  };

  return (
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
          onClick={() => setOpen(!open)}
        >
          <CloseIcon style={{ color: '#9E9E9E' }} />
        </Button>
        <Stack
          direction={'column'}
          spacing={3}
          style={{ alignItems: 'center' }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: 'center' }}
          >
            Are you sure you want to assign inspection?
          </Typography>
          <Button
            onClick={assignSR}
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
              Assign Now
            </Typography>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
