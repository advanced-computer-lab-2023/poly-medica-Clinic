import { FormControl, TextField, MenuItem } from '@mui/material';
import { GENDERS, RELATIONS } from 'utils/Constants';
import { usePatientContext } from 'hooks/usePatientContext';

const UnregisteredForm = () => {

    const { newMember, setNewMember, setError } = usePatientContext();

    const handleFormInputChange = (e) => {
        setNewMember((member) => ({
            ...member,
            [e.target.name]: e.target.value,
        }));
        setError(false);
    };

    return (
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
                    {GENDERS.map((option) => (
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

export default UnregisteredForm;