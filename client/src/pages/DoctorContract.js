//contract description and a button to accept the contract
 
import { Container, Paper, Typography, Grid, Button } from '@mui/material';

import Swal from 'sweetalert2';
import { useEffect, useState } from 'react'; 
 
import { useUserContext } from 'hooks/useUserContext'; 
import { clinicAxios } from 'utils/AxiosConfig'; 
 
const DoctorContract = () => {
     

  
    const{ user } = useUserContext();
    const id = user.id;
    const [active, setActive] = useState(true); 
    
     useEffect(() => {
      clinicAxios.get('contract')
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }, []);

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
            <Typography variant="h5" align="center">
              Employment Contract
            </Typography>
            {/* <form onSubmit={handleFormSubmit}> */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body1">
                  This Doctor Employment Contract ( Contract) is entered into between Poly-Medica Clinic, hereinafter referred to as Poly-Medica, and the doctor, hereinafter referred to as Doctor, on [Date of Contract].

1. POSITION AND DUTIES

Poly-Medica employs Doctor as a [Full-Time/Part-Time] [Specialty] Doctor. Doctor agrees to perform the following duties:

1.1 Provide medical services and care to patients at Poly-Medica.
1.2 Comply with all applicable laws, regulations, and professional standards.
1.3 Maintain accurate and complete medical records.
1.4 Collaborate with the medical team and staff at Poly-Medica.
1.5 Attend meetings and training sessions as required.

2. COMPENSATION

Poly-Medica shall compensate Doctor as follows:

2.1 Salary: Doctor's salary will be determined in accordance with the clinic's standard compensation structure and will be paid at regular intervals.
2.2 Benefits: Doctor will be eligible for benefits as specified in the clinic's policies.
2.3 Bonus: Doctor may be eligible for performance-based bonuses as determined by Poly-Medica.

3. TERM AND TERMINATION

3.1 The term of this Contract is [Initial Term Length], commencing on [Start Date]. Either party may terminate this Contract with [Notice Period] written notice.
3.2 Termination for Cause: Poly-Medica may terminate this Contract for cause, including but not limited to:
a. Gross misconduct.
b. Violation of clinic policies.
c. Incompetence or negligence.
d. Breach of confidentiality.
e. Failure to maintain required licenses or certifications.
3.3 Severance: Upon termination without cause, Doctor shall be entitled to a severance package as per clinic policies.

4. LICENSURE AND CREDENTIALING

4.1 Doctor agrees to maintain all necessary licenses and certifications required for the practice of medicine in [Location]. Doctor shall promptly provide Poly-Medica with evidence of current and valid licensure and certifications.

5. CONFIDENTIALITY

5.1 Doctor shall maintain the confidentiality of all patient records and information and abide by all relevant privacy laws and regulations.

6. NON-COMPETE AND NON-SOLICITATION

6.1 Doctor agrees not to compete with Poly-Medica within a [Non-Compete Radius] for [Non-Compete Duration] after termination of this Contract.
6.2 Doctor agrees not to solicit or hire Poly-Medica's employees or patients for [Non-Solicitation Duration] after termination of this Contract.

7. GOVERNING LAW

7.1 This Contract shall be governed by and construed in accordance with the laws of [Jurisdiction].

8. ENTIRE AGREEMENT

8.1 This Contract constitutes the entire agreement between the parties and supersedes all prior and contemporaneous agreements, understandings, and representations, whether written or oral.

IN WITNESS WHEREOF, the parties have executed this Contract as of the date first above written.

Poly-Medica Clinic:

By: [Your Name]
[Your Title]
[Date]

Doctor:

[Doctor's Name]
[Date]                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    WHEREAS, the Hospital desires to employ the Doctor to provide medical services to its patients, and the Doctor is willing to accept such employment under the terms and conditions set forth herein.
                  </Typography>
                </Grid>
                {/* Add more contract clauses as needed */}
              </Grid>
              <Button disabled={active} fullWidth
               onClick={onClick} variant="contained" color="primary">
                Accept
              </Button>
            {/* </form> */}
          </Paper>
        </Container>
      );



};

export default DoctorContract;
