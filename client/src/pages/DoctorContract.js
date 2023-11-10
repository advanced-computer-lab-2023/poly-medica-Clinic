//contract description and a button to accept the contract
 
import { Container, Paper, Typography, Grid, Button } from '@mui/material';

import Swal from 'sweetalert2';
import { useEffect, useState } from 'react'; 
 
import { useUserContext } from 'hooks/useUserContext'; 
import { clinicAxios } from 'utils/AxiosConfig'; 
import contract from '../utils/contract.pdf';

 
 
const DoctorContract = () => {
  
  
     

  
    const{ user } = useUserContext();
    const id = user.id;
    const [active, setActive] = useState(true);
    const [name, setName] = useState('');
    
     
       
    useEffect(() => {
        clinicAxios.get('doctors/'+id+'/status')
        .then((res) => {  
          
            const status = res.data.status;
            if(status){
                setActive(true);
            }
            else{
                setActive(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });

        clinicAxios.get('doctors/'+id+'/name')
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
        clinicAxios.post('doctors/'+id+'/status')
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
            <Typography variant="h1" align="center">
              Employment Contract
            </Typography> 
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {/* button to download the contract */}
                  
                  <Typography style={{ marginTop: '10px' }}  variant="body1" fontSize={15}>      
                    Hello Dr. {name},
                    Glad to tell you that your request to be a doctor in PolyMedica is accepted,
                     please review our offer and respond as fast as possible by pressing on the Accept button below.
                  </Typography>

                  <Button style={{ marginTop: '20px' }} fullWidth  
                   variant="contained" color="primary" href={contract} download>
                    Download Contract
                  </Button>
                  


                </Grid>
                 
                {/* Add more contract clauses as needed */}
              </Grid>
              <Button style={{ marginTop: '20px' }}
              disabled={active} fullWidth
               onClick={onClick} variant="contained" color="primary">
                Accept
              </Button>
            {/* </form> */}
          </Paper>
        </Container>
      );



};

export default DoctorContract;
