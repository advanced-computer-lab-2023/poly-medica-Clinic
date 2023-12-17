//contract description and a button to accept the contract

import { Container, Paper, Typography, Grid, IconButton, Tooltip } from '@mui/material';
import { Handshake, CloudDownload } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { displayOfferText } from '../utils/DoctorUtils';
import { useUserContext } from 'hooks/useUserContext';
import { clinicAxios } from 'utils/AxiosConfig';
import contract from '../utils/contract.pdf';



const DoctorContract = () => {

  const { user } = useUserContext();
  const id = user.id;
  const [active, setActive] = useState(true);
  const [name, setName] = useState('');

  useEffect(() => {
    clinicAxios.get('doctors/' + id + '/status')
      .then((res) => {

        const status = res.data.status;
        if (status) {
          setActive(true);
        }
        else {
          setActive(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    clinicAxios.get('doctors/' + id + '/name')
      .then((res) => {

        const name = res.data.name;
        setName(name);
      })
      .catch((err) => {
        console.log(err);
      });

  }

    , []);

  const onClick = () => {
    clinicAxios.post('doctors/' + id + '/status')
      .then((res) => {
        console.log(res);
        //fire a swal to welcome the doctor as a new employee
        Swal.fire({
          icon: 'success',
          title: 'Welcome to Poly-Medica!',
          text: 'You are now an employee of Poly-Medica Clinic',
          confirmButtonText: 'OK'
        });
        setActive(true);
      })
      .catch((err) => {
        console.log(err);
      });

  };


  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Grid container spacing={2} align='center'>
          <Grid item xs={12}>
            {/* button to download the contract */}

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

          {/* Add more contract clauses as needed */}
        </Grid>
        {/* </form> */}
      </Paper>
    </Container>
  );



};

export default DoctorContract;
