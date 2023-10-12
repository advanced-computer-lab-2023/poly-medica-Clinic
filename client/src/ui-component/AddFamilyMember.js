import { TextField, MenuItem, Button, IconButton } from '@mui/material';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

const genders = ['Male', 'Female'];
const relations = ['Husband', 'Wife', 'Child'];

const AddFamilyMember = ({ setIsAddingMember, setFamilyMembers }) => {
    const [name, setName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('Male');
    const [relation, setRelation] = useState('Husband');
    const userId = '6522700045d2f29d43a9d002';
    const handleSubmit = (e) => {
        e.preventDefault();
        const Gen = gender.toUpperCase(),
            Rel = relation.toUpperCase();
        axios
            .patch('http://localhost:8002/family-members/' + userId, {
                name,
                nationalId,
                age,
                gender: Gen,
                relation: Rel,
            })
            .then((reponse) => reponse.data)
            .then((data) => {
                setIsAddingMember(false);
                setFamilyMembers(data.familyMembers);
            });
    };
    return (
        <MainCard
            title='Add Family Member'
            secondary={
                <IconButton
                    onClick={() => setIsAddingMember(false)}
                    color='error'
                >
                    <CloseIcon />
                </IconButton>
            }
        >
            <form autoComplete='off' onSubmit={handleSubmit}>
                <TextField
                    label='Name'
                    required
                    variant='outlined'
                    sx={{ marginTop: 5 }}
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label='National ID'
                    required
                    variant='outlined'
                    sx={{ marginTop: 5 }}
                    fullWidth
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                />
                <TextField
                    label='Age'
                    required
                    type='Number'
                    variant='outlined'
                    sx={{ marginTop: 5 }}
                    fullWidth
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <TextField
                    label='Gender'
                    select
                    required
                    variant='outlined'
                    sx={{ marginTop: 5 }}
                    fullWidth
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    {genders.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label='Relation'
                    select
                    required
                    sx={{ marginTop: 5 }}
                    fullWidth
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                >
                    {relations.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <div
                    style={{
                        marginTop: 30,
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button variant='contained' type='submit' color='secondary'>
                        Submit
                    </Button>
                </div>
            </form>
        </MainCard>
    );
};

export default AddFamilyMember;
