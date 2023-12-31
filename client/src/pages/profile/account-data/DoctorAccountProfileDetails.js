import { useCallback, useState, useEffect } from 'react';
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
import { clinicAxios } from '../../../utils/AxiosConfig';
import Loader from 'ui-component/Loader';

export const DoctorAccountProfileDetails = () => {
    const [values, setValues] = useState({
        name: '',
        userName: '',
        dateOfBirth: '',
        speciality: '',
        email: '',
        hourlyRate: '',
        affiliation: '',
        educationalBackground: '',
        walletAmount: '',
    });
    const [loading, setLoading] = useState(true);
    const { user } = useUserContext();
    useEffect(() => {
        const getPatientsURL = '/doctor/' + user.id;
        // let user;

        clinicAxios
            .get(getPatientsURL, { withCredentials: true })
            .then((response) => {
                const values = response.data.doctor;
                console.log('values', values);

                setValues({
                    name: values.userData.name,
                    userName: values.userData.userName,
                    dateOfBirth: format(new Date(values.userData.dateOfBirth), 'yyyy-MM-dd'),
                    speciality: values.speciality,
                    email: values.userData.email,
                    hourlyRate: values.hourlyRate,
                    affiliation: values.affiliation,
                    educationalBackground: values.educationalBackground,
                    walletAmount: values.walletAmount,
                });
                setLoading(false);
            })
            .catch((err) => {
                console.log('here', err);
                setLoading(false);
            });
    }, [loading]);

    const handleChange = useCallback((event) => {
        setValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        const getDoctorURL = '/doctors/' + user.id;
        // let user;

        clinicAxios
            .patch(getDoctorURL, values, { withCredentials: true })
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
                
                Swal.fire({
                    icon: 'error', // Set the icon to a success icon
                    title: 'error', // Title of the pop-up
                    text: err.response.data.message, // Message text
                });
                setLoading(false);
            });
    };
    

    return (loading)?(<Loader></Loader>):(
        <form autoComplete='off' onSubmit={handleSubmit}>
            {  console.log(loading) }  
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
                                    label='speciality'
                                    name='speciality'
                                    onChange={handleChange}
                                    type='text'
                                    disabled
                                    value={values.speciality}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='email'
                                    name='email'
                                    required
                                    onChange={handleChange}
                                    type='email'
                                    value={values.email}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='hourlyRate'
                                    name='hourlyRate'
                                    type='number'
                                    inputProps={{
                                        min:0
                                    }}
                                    onChange={handleChange}
                                    required
                                    value={values.hourlyRate}
                                />
                            </Grid>
                            <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='affiliation'
                                    name='affiliation'
                                    onChange={handleChange}
                                    required
                                    value={values.affiliation}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                 md={6}
                            >
                                <TextField
                                    fullWidth
                                    label='educationalBackground'
                                    name='educationalBackground'
                                    onChange={handleChange}
                                    disabled
                                    required
                                    value={values.educationalBackground}
                                />
                            </Grid>
                            {/* <Grid
                                xs={12}
                                // md={6}
                            >
                                <TextField
                                    fullWidth
                                    label='Wallet Amount'
                                    name='Wallet Amount'
                                    onChange={handleChange}
                                    disabled
                                    required
                                    value={values.walletAmount}
                                />
                            </Grid> */}
                        </Grid>
                    </Box>
                </CardContent>
                <Divider />
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

export default DoctorAccountProfileDetails;
