import React, { useState, useEffect } from 'react';
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
import { patientAxios } from '../../utils/AxiosConfig';

export const HealthPackageSubscription = ({ memberId, openPackages, setOpenPackages }) => {
    const [healthPackage, setHealthPackage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log('memberId = ', memberId);
            if (memberId) {
                try {
                    patientAxios.get(`/patient/${memberId}/health-packages`).then((response) => {
                        setHealthPackage(response.data.healthPackages[0]);
                    });
                } catch (error) {
                    console.log('error = ', error.response.data.message);
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
                                    <TableRow>
                                        <TableCell>Status:</TableCell>
                                        <TableCell>{healthPackage.status}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <p>This family member is not subscribed to any health packages.</p>
                    )
                ) : (
                    <p>This family member cannot subscribe to health packages as they have no account.</p>
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
