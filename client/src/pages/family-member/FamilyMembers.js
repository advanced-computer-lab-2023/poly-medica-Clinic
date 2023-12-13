import { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Button,
    Paper,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddFamilyMember from './AddFamilyMember';
import { useUserContext } from 'hooks/useUserContext';
import { patientAxios } from '../../utils/AxiosConfig';
const FamilyMembers = () => {
    const [FamilyMembers, setFamilyMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [error , setError] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        nationalId: '',
        age: '',
        gender: '',
        relation: '',
        email: '',
        mobileNumber: ''
    });

    const handleFormInputChange = (e) => {
        setNewMember((member) => ({
            ...member,
            [e.target.name]: e.target.value,
        }));
        setError(false);
    };
    const { user } = useUserContext();
    const userId = user.id;
    useEffect(() => {
        const fetch = async () => {
            patientAxios
                .get('/family-members/' + userId)
                .then((response) => response.data)
                .then((data) => {
                    setFamilyMembers(data.familyMembers);
                    setIsLoading(false);
                }).catch(() => setIsLoading(false));
        };
        fetch();
    }, []);

    const handleClick = () => {
        setIsAddingMember(true);
        setNewMember({
            name: '',
            nationalId: '',
            age: '',
            gender: '',
            relation: '',
            email: '',
            mobileNumber: ''
        });
        setError(false);
    };

    return (
        <MainCard
            title='Family Members'
            secondary={
                <Button
                    variant='contained'
                    color='secondary'
                    startIcon={<AddCircleOutlineIcon></AddCircleOutlineIcon>}
                    onClick={handleClick}
                >
                    Add Family Member
                </Button>
            }
        >
            {isLoading && <p>Loading...</p>}
            {!isLoading && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ opacity: 0.5 }}>
                                <TableCell> </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>National Id</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Relation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {FamilyMembers.map((member) => (
                                <TableRow
                                    key={member._id}
                                    sx={{
                                        margin: 20,
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell>
                                        <PeopleIcon></PeopleIcon>
                                    </TableCell>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.nationalId}</TableCell>
                                    <TableCell>{member.age}</TableCell>
                                    <TableCell>{member.gender}</TableCell>
                                    <TableCell>{member.relation}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <AddFamilyMember
                setFamilyMembers={setFamilyMembers}
                isOpen={isAddingMember}
                setIsOpen={setIsAddingMember}
                newMember={newMember}
                handleFormInputChange={handleFormInputChange}
                setError={setError}
                error={error}
            />
        </MainCard>
    );
};

export default FamilyMembers;
