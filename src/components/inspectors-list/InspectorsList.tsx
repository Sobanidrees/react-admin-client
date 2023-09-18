import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Button,
  Divider,
  Stack,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { APP_FONT } from '../../constants/AppFont';
import { useEffect, useState } from 'react';
import { fetchInspectors } from '../../redux/actions/inspectors';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { Inspectors } from '../../models/inspectors';
import InspectorAssignedSrModal from '../modals/InpectorAssignedSrModal';

const theme = createTheme({
  typography: {
    fontFamily: APP_FONT,
  },
});

const listStyle = {
  marginTop: '20px',
};

export default function InspectorsList({ id }: any) {
  const dispatch = useDispatch();
  const [inspectors, setInspectors] = useState<Inspectors[]>([]);
  const [expandedPanels, setExpandedPanels] = useState<string[]>([]);
  const [showInspectorAssignedSrModal, setShowInspectorAssignedSrModal] =
    useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>();

  useEffect(() => {
    dispatch<any>(fetchInspectors())
      .then(unwrapResult)
      .then((inspector: any) => {
        if (inspector) {
          console.log(inspector, '=========inspectorsassign=========');
          setInspectors(inspector);
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      const newExpandedPanels = [...expandedPanels];

      if (isExpanded) {
        newExpandedPanels.push(panel);
      } else {
        const index = newExpandedPanels.indexOf(panel);
        if (index !== -1) {
          newExpandedPanels.splice(index, 1);
        }
      }
      setExpandedPanels(newExpandedPanels);
    };

  const handleAssignButtonClick = (event: any) => {
    event.stopPropagation();
  };

  const handleAssignRequest = (id: number) => {
    setSelectedId(id);
    setShowInspectorAssignedSrModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      {!!inspectors.length &&
        inspectors.map((inspector) => (
          <Accordion
            expanded={expandedPanels.includes(inspector.id.toString())}
            onChange={handleChange(inspector.id.toString())}
            key={inspector.id}
            sx={listStyle}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#003650' }} />}
            >
              <Typography
                sx={{
                  width: '50%',
                  fontWeight: 600,
                  color: '#003650',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
              >
                {inspector.fullName}
              </Typography>
              <Stack direction={'row'} spacing={23} alignItems={'center'}>
                <Button
                  onClick={(event) => {
                    handleAssignButtonClick(event);
                    handleAssignRequest(inspector.id);
                  }}
                  variant="outlined"
                  size="small"
                  sx={{
                    textTransform: 'none',
                    borderColor: '#0EA1AB',
                    color: '#003650',
                    width: 244,
                  }}
                >
                  ASSIGN INSPECTION
                </Button>
                <Typography sx={{ color: '#003650', fontWeight: 500 }}>
                  View Details
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: '#003650',
                    alignSelf: 'center',
                  }}
                >
                  Profile
                </Typography>
                <Stack direction={'column'}>
                  <Typography
                    mt={'15px'}
                    mb={'5px'}
                    variant="h6"
                    sx={{ ml: '7%', fontWeight: 500, color: '#003650' }}
                  >
                    Emirates ID{' '}
                    <span
                      style={{
                        marginLeft: '61%',
                        color: '#003650',
                        fontWeight: 400,
                        justifyItems: 'center',
                      }}
                    >
                      {inspector.emiratesId}
                    </span>
                  </Typography>
                  <Divider sx={{ marginX: '5%' }} />
                  <Typography
                    mt={'15px'}
                    mb={'5px'}
                    variant="h6"
                    sx={{ ml: '7%', fontWeight: 500, color: '#003650' }}
                  >
                    Phone No.{' '}
                    <span
                      style={{
                        marginLeft: '67%',
                        color: '#003650',
                        fontWeight: 400,
                      }}
                    >
                      {inspector.phoneNumber}
                    </span>
                  </Typography>
                  <Divider sx={{ marginX: '5%' }} />
                </Stack>
              </Stack>
              <Stack mt={'30px'}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    color: '#003650',
                    alignSelf: 'center',
                  }}
                >
                  Assigned Slots
                </Typography>
                <Stack
                  direction={'row'}
                  mt={'20px'}
                  ml={'7%'}
                >
                  <Typography
                    mt={'15px'}
                    mb={'5px'}
                    width={'45%'}
                    variant="h5"
                    sx={{ fontWeight: 500, color: '#003650' }}
                  >
                    Date
                  </Typography>
                  <Typography
                    mt={'15px'}
                    mb={'5px'}
                    width={'45%'}
                    variant="h5"
                    sx={{ fontWeight: 500, color: '#003650' }}
                  >
                    Time
                  </Typography>
                  <Typography
                    mt={'15px'}
                    mb={'5px'}
                    width={'20%'}
                    variant="h5"
                    sx={{ fontWeight: 500, color: '#003650' }}
                  >
                    Plan
                  </Typography>
                </Stack>
                {inspector.serviceRequests.map((request, index) => (
                  <Stack
                    direction={'row'}
                    mt={'5px'}
                    ml={'7%'}
                    key={index}
                  >
                    <Typography
                      mt={'10px'}
                      mb={'5px'}
                      width={'45%'}
                      variant="h6"
                      sx={{ fontWeight: 400, color: '#003650' }}
                    >
                      {request.date}
                    </Typography>
                    <Typography
                      mt={'10px'}
                      mb={'5px'}
                      width={'45%'}
                      variant="h6"
                      sx={{ fontWeight: 400, color: '#003650' }}
                    >
                      {request.time}
                    </Typography>
                    <Typography
                      mt={'10px'}
                      mb={'5px'}
                      width={'20%'}
                      variant="h6"
                      sx={{ fontWeight: 400, color: '#003650' }}
                    >
                      {request.packageType}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      {showInspectorAssignedSrModal && (
        <InspectorAssignedSrModal
          open={showInspectorAssignedSrModal}
          setOpen={setShowInspectorAssignedSrModal}
          selectedId={selectedId}
          srId={id}
        />
      )}
    </ThemeProvider>
  );
}
