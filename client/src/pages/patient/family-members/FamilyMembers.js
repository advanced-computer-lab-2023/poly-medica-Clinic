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
    Tooltip,
    Fab
} from '@mui/material';

import { Add, Subscriptions } from '@mui/icons-material';
import AddFamilyMember from './AddFamilyMember';
import { getFamilyMembers } from 'api/PatientAPI';
import Loader from 'ui-component/Loader';
import { HealthPackageSubscription } from './HealthPackageSubscription';
import { usePatientContext } from 'hooks/usePatientContext';
import { useSelector } from 'react-redux';

const FamilyMembers = () => {
    const [isAddingMember, setIsAddingMember] = useState(false);

    const { FamilyMembers, setFamilyMembers, isLoading, setIsLoading, setOpenPackages,
        setError, setNewMember, setMemberId } = usePatientContext();

        const { user } = useSelector(state => state.user);
    const userId = user.id;
    useEffect(() => {
        const fetch = async () => {
            getFamilyMembers(userId)
                .then((response) => {
                    setFamilyMembers(response.familyMembers);
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
        setMemberId(id);
        setOpenPackages(true);
    };

    return (
        <MainCard
            title='Family Members'

        >

            {isLoading && <Loader />}
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
                                        <Tooltip title='View Health Package Subscribtion'>
                                            <IconButton onClick={() => handlePackageClick(member.id)}>
                                                <Subscriptions color='secondary' />
                                            </IconButton>
                                        </Tooltip>
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
                isOpen={isAddingMember}
                setIsOpen={setIsAddingMember}
            />
            <HealthPackageSubscription />
        </MainCard>
    );
};

export default FamilyMembers;
