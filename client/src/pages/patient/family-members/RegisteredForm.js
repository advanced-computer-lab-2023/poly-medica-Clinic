import { Typography, FormControl, TextField, MenuItem } from '@mui/material';
import { usePatientContext } from 'hooks/usePatientContext';
import { RELATIONS } from 'utils/Constants';

const RegisteredForm = () => {

    const { newMember, error, setNewMember, setError } = usePatientContext();

    const handleFormInputChange = (e) => {
        setNewMember((member) => ({
            ...member,
            [e.target.name]: e.target.value,
        }));
        setError(false);
    };
    return (
        <>
            {error && (
                <Typography color='error' variant='h5'>
                    Please enter a valid email or mobile
                    number
                </Typography>
            )}
            <FormControl required fullWidth>
                <TextField
                    label='Email'
                    name='email'
                    variant='outlined'
                    fullWidth
                    value={newMember.email}
                    sx={{ marginTop: 2 }}
                    onChange={
                        handleFormInputChange
                    }></TextField>
            </FormControl>
            <FormControl required fullWidth>
                <TextField
                    label='Mobile Number'
                    name='mobileNumber'
                    variant='outlined'
                    fullWidth
                    value={newMember.mobileNumber}
                    sx={{ marginTop: 5 }}
                    onChange={
                        handleFormInputChange
                    }></TextField>
            </FormControl>
            <FormControl required fullWidth>
                <TextField
                    label='Relation'
                    name='relation'
                    variant='outlined'
                    required
                    fullWidth
                    select
                    value={newMember.relation}
                    sx={{ marginTop: 5 }}
                    onChange={handleFormInputChange}>
                    {RELATIONS.map((option) => (
                        <MenuItem
                            key={option}
                            value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        </>
    );
};

export default RegisteredForm;