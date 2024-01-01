import { useCallback, useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import format from 'date-fns/format';
import { patientAxios } from 'utils/AxiosConfig';
import Loader from 'ui-component/Loader';
import { PATIENT_TYPE_ENUM } from 'utils/Constants';
import { useParams } from 'react-router';
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
        emergencyRelation: '',
        walletAmount: '',
    });
    const [loading, setLoading] = useState(true);
    const { user } = useUserContext();
    const isPatient = user.type === PATIENT_TYPE_ENUM;
    const { patientId } = useParams();
    const userId = isPatient ? user.id : patientId;
    useEffect(() => {

        const getPatientsURL = `/patients/${userId}`;

        patientAxios
            .get(getPatientsURL)
            .then((response) => {
                const patientData = response.data.patient;
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
                    walletAmount: patientData.walletAmount,
                });
                setLoading(false);
            })


            .catch((err) => {
                console.log('here', err);
            });
    }, [loading]);

    const handleChange = useCallback((event) => {
        setValues((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }, []);

    return loading ? (<Loader></Loader>) : (
        <form autoComplete='off'>
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
                            {/* {isPatient && <Grid xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label='Wallet Amount'
                                    name='Wallet Amount'
                                    onChange={handleChange}
                                    disabled
                                    value={values.walletAmount}
                                />
                            </Grid>} */}

                        </Grid>
                        <Divider sx={{ mt: 5 }} />
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
            </Card>
        </form>
    );
};

export default PatientAccountProfileDetails;