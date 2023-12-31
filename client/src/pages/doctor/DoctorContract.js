import { Container, Paper, Typography, Grid, IconButton, Tooltip } from '@mui/material';
import { Handshake, CloudDownload } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { displayOfferText } from '../../utils/DoctorUtils';
import { useUserContext } from 'hooks/useUserContext';
import { clinicAxios } from 'utils/AxiosConfig';
import contract from '../../utils/contract.pdf';
import { getDoctorStatus, updateDoctorStatus } from 'api/DoctorAPI';
const DoctorContract = () => {

  const { user } = useUserContext();
  const id = user.id;
  const [active, setActive] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    getDoctorStatus(id).then((res) => {
      const status = res.status;
      if (status) {
        setActive(true);
      }
      else {
        setActive(false);
      }
    });

    clinicAxios.get('doctors/' + id + '/name')
      .then((res) => {
        const name = res.data.name;
        setName(name);
      });

  }

    , []);

  const onClick = () => {
    updateDoctorStatus(id)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Welcome to Poly-Medica!',
          text: 'You are now an employee of Poly-Medica Clinic',
          confirmButtonText: 'OK'
        });
        setActive(true);
      });

  };


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={2} align='center'>
          <Grid item xs={12}>
            <Typography style={{ marginTop: '10px' }} variant="body1" fontSize={15}>
              {displayOfferText(active, name)}
            </Typography>

          </Grid>
          <Grid item xs={6}>
            <Tooltip title='Download Contract'>
              <IconButton style={{ marginTop: '2%' }} color="primary" href={contract} download>
                <CloudDownload />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={6}>
            <Tooltip title='Accept Offer'>
              <IconButton style={{ marginTop: '2%' }}
                disabled={active} onClick={onClick} color="primary">
                <Handshake />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );

};

export default DoctorContract;
