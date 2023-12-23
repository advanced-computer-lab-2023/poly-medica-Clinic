import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
    MenuItem,
    Button,
    FormControl,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useUserContext } from 'hooks/useUserContext';
import { patientAxios } from '../../../utils/AxiosConfig';
import FamilyMemberOptions from './FamilyMemeberOptions';

const genders = ['MALE', 'FEMALE'];
const relations = ['HUSBAND', 'WIFE', 'CHILD'];

const AddFamilyMember = ({
    setFamilyMembers,
    isOpen,
    setIsOpen,
    newMember,
    handleFormInputChange,
    error,
    setError,
}) => {
    const [value, setValue] = useState('Registered-Family-Member');

    const { user } = useUserContext();
    const userId = user.id;
    const handleSubmit = (e) => {
        e.preventDefault();
        newMember.gender = newMember.gender.toUpperCase();
        newMember.relation = newMember.relation.toUpperCase();
        patientAxios
            .patch('/family-members/' + userId, { member: newMember })
            .then((data) => {
                setIsOpen(false);
                setFamilyMembers(data.data.familyMembers);
            })
            .catch((err) => {
                setError(true);
                console.log(err);
            });
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle variant='h3'>Add Family Member</DialogTitle>
                <DialogContent>
                    <FamilyMemberOptions
                        handleChange={handleChange}
                        value={value}
                    />
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        {value === 'Unregistered-Family-Member' && (
                            <>
                                <FormControl required fullWidth>
                                    <TextField
                                        label='Name'
                                        name='name'
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={newMember.name}
                                        sx={{ marginTop: 5 }}
                                        onChange={handleFormInputChange}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        label='National ID'
                                        name='nationalId'
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={newMember.nationalId}
                                        sx={{ marginTop: 5 }}
                                        onChange={handleFormInputChange}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        label='Age'
                                        name='age'
                                        type='Number'
                                        variant='outlined'
                                        required
                                        fullWidth
                                        value={newMember.age}
                                        sx={{ marginTop: 5 }}
                                        onChange={handleFormInputChange}
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        label='Gender'
                                        name='gender'
                                        variant='outlined'
                                        required
                                        fullWidth
                                        select
                                        defaultValue='Child'
                                        value={newMember.gender}
                                        sx={{ marginTop: 5 }}
                                        onChange={handleFormInputChange}>
                                        {genders.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
                                        {relations.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </>
                        )}
                        {value === 'Registered-Family-Member' && (
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
                                        {relations.map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </>
                        )}
                        <DialogActions>
                            <Button
                                variant='contained'
                                onClick={() => setIsOpen(false)}
                                color='secondary'>
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                type='submit'
                                color='primary'>
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddFamilyMember;
