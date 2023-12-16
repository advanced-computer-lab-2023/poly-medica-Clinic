import { useState, useEffect } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Fab,
} from '@mui/material';

import { Add, Subscriptions } from '@mui/icons-material';
import AddFamilyMember from './AddFamilyMember';
import { useUserContext } from 'hooks/useUserContext';
import { patientAxios } from '../../utils/AxiosConfig';
import { HealthPackageSubscription } from './HealthPackageSubscription';
const FamilyMembers = () => {
    const [FamilyMembers, setFamilyMembers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openPackages, setOpenPackages] = useState(false);
    const [isAddingMember, setIsAddingMember] = useState(false);
    const [error, setError] = useState(false);
    const [newMember, setNewMember] = useState({
        name: '',
        nationalId: '',
        age: '',
        gender: '',
        relation: '',
        email: '',
        mobileNumber: '',
        id: ''
    });
    const [memberId, setMemberId] = useState(null);

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
            mobileNumber: '',
            id: ''
        });
        setError(false);
    };

    const handlePackageClick = (id) => {
        console.log('current Id = ', id);
        setMemberId(id);
        setOpenPackages(true);
    };

    return (
        <MainCard
            title='Family Members'

        >

            {isLoading && <p>Loading...</p>}
            {!isLoading && (<Fab
                color="secondary"
                aria-label="Add"
                onClick={handleClick}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 9999,
                }}
            >
                <Add />
            </Fab>)}
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
                                        <IconButton onClick={() => handlePackageClick(member.id)}>
                                            <Subscriptions color='secondary' />
                                        </IconButton>

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
            <HealthPackageSubscription memberId={memberId} openPackages={openPackages} setOpenPackages={setOpenPackages} />
        </MainCard>
    );
};

export default FamilyMembers;
