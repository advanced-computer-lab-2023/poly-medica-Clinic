import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';
import { getPatientHealthPackage } from 'api/PatientAPI';
import { usePatientContext } from 'hooks/usePatientContext';

export const HealthPackageSubscription = () => {
    const [healthPackage, setHealthPackage] = useState(null);
    const { memberId, openPackages, setOpenPackages } = usePatientContext();
    useEffect(() => {
        const fetchData = async () => {
            if (memberId) {
                try {
                    getPatientHealthPackage(memberId).then((response) => {
                        setHealthPackage(response.healthPackages[0]);
                    });
                } catch (error) {
                    console.log('error = ', error.response.message);
                }
            }
        };

        fetchData();
    }, [memberId, openPackages]);

    const handleClose = () => {
        setOpenPackages(false);
    };

    return (
        <Dialog open={openPackages} >
            <DialogTitle>Health Package Subscription</DialogTitle>
            <DialogContent>
                {memberId ? (
                    healthPackage ? (
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Subscribed Package:</TableCell>
                                        <TableCell>{healthPackage.name}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <p>This family member is not subscribed to any health packages.</p>
                    )
                ) : (
                    <p>This family member is subscribed to the same package as you</p>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='primary'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
