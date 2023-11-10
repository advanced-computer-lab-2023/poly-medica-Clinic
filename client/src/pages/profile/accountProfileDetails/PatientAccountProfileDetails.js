import { useCallback, useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useUserContext } from 'hooks/useUserContext';
import format from 'date-fns/format';

export const PatientAccountProfileDetails = () => {
    const [values, setValues] = useState({
        name: '',
        userName: '',
        dateOfBirth: '',
        email: '',
        mobileNumber: '',
        gender: '',
        emergencyName: '',
        emergencyMobile: '',
        emergencyRelation: ''
    });
    const [loading, setLoading] = useState(false);
    const { user } = useUserContext();
    useEffect(() => {

        const getPatientsURL = `http://localhost:8002/patients/${user.id}`;
        
        axios
            .get(getPatientsURL, { withCredentials: true })
            .then((response) => {
                const patientData = response.data;
                console.log('values', patientData);

                setValues({
                    name: patientData.name,
                    userName: patientData.userName,
                    dateOfBirth: format(new Date(patientData.dateOfBirth), 'yyyy-MM-dd'),
                    email: patientData.email,
                    mobileNumber: patientData.mobileNumber,
                    gender: patientData.gender.toLowerCase(),
                    emergencyName: patientData.emergencyContact.name,
                    emergencyMobile: patientData.emergencyContact.mobile,
                    emergencyRelation: patientData.emergencyContact.relation,
                });
            })
            
            .catch((err) => {
                console.log('here', err);
            });
    }, []);

    const handleChange = useCallback((event) => {
        setValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const getPatientsURL = 'http://localhost:8001/doctors/' + user.id;
        // let user;

        axios
            .patch(getPatientsURL, values, { withCredentials: true })
            .then((response) => {
                const values = response.data.doctor;
                console.log('values', values);
                Swal.fire({
                    icon: 'success', // Set the icon to a success icon
                    title: 'Success', // Title of the pop-up
                    text: 'Data updated successfully', // Message text
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log('here', err);
                setLoading(false);
            });
    };

    return (
        <form autoComplete='off' onSubmit={handleSubmit}>
            <Card>
                <CardHeader
                    subheader='The information can be edited'
                    title='Profile'
                />
                <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='name'
                                    name='name'
                                    onChange={handleChange}
                                    required
                                    disabled
                                    value={values.name}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='username'
                                    name='userName'
                                    onChange={handleChange}
                                    required
                                    disabled
                                    value={values.userName}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='email'
                                    name='email'
                                    required
                                    disabled
                                    onChange={handleChange}
                                    type='email'
                                    value={values.email}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='dateOfBirth'
                                    name='dateOfBirth'
                                    onChange={handleChange}
                                    required
                                    disabled
                                    value={values.dateOfBirth}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='mobile number'
                                    name='mobileNumber'
                                    onChange={handleChange}
                                    required
                                    disabled
                                    value={values.mobileNumber}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='gender'
                                    name='gender'
                                    onChange={handleChange}
                                    required
                                    disabled
                                    value={values.gender}
                                />
                            </Grid>
                                                        
                        </Grid>
                        <Divider sx={{ mt:5 }}/>
                        <CardHeader
                    title='Emergency contact'
                />
                <Grid container spacing={3}>
                <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='name'
                                    name='emergencyName'
                                    onChange={handleChange}
                                    required
                                    disabled
                                    value={values.emergencyName}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='mobile'
                                    name='emergencyMobile'
                                    onChange={handleChange}
                                    required
                                    disabled
                                    value={values.emergencyMobile}
                                />
                            </Grid>

                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='relation'
                                    name='emergencyRelation'
                                    onChange={handleChange}
                                    required
                                    disabled
                                    value={values.emergencyRelation}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
                <Divider/>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                        variant='contained'
                        type='submit'
                        disabled={loading}
                    >
                        Save details
                    </Button>
                </CardActions>
            </Card>
        </form>
    );
};

export default PatientAccountProfileDetails;