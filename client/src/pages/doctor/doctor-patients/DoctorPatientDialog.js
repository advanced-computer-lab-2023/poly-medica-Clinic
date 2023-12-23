import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tab,
    Box,
    Button
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DoctorPatientDetails from './DoctorPatientDetails';
import FollowUp from './FollowUp';
import { useDoctorContext } from 'hooks/useDoctorContext';
const DoctorPatientDialog = () => {
    const { selectedPatient, loggedInDoctor, setLoggedInDoctor, setSelectedPatient } = useDoctorContext();

    const [tabValue, setTabValue] = useState('1');

    const handleDialogClose = () => {
        setSelectedPatient(null);
    };

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };
    const handleDialogCloseHelper = () => {
        setTabValue('1');
        handleDialogClose();
    };
    return (
        <Dialog
            open={selectedPatient}
            onClose={handleDialogCloseHelper}
            PaperProps={{
                sx: {
                    minWidth: window.outerWidth > 800 ? 700 : 500,
                    height: 500
                }
            }}
        >
            <TabContext value={tabValue}>
                <DialogTitle align='center' variant='h2' sx={{ marginBottom: '1em' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList value={tabValue} onChange={handleTabChange}>
                            <Tab label="Patient Details" value='1' />
                            <Tab label="Follow Up" value='2' />
                        </TabList>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <TabPanel value='1'>
                        <DoctorPatientDetails
                            selectedPatient={selectedPatient}
                        />
                    </TabPanel>
                    <TabPanel value='2'>
                        <FollowUp
                            selectedPatient={selectedPatient}
                            loggedInDoctor={loggedInDoctor}
                            setLoggedInDoctor={setLoggedInDoctor}
                        />
                    </TabPanel>
                </DialogContent>
            </TabContext>

            <DialogActions>
                <Button onClick={handleDialogCloseHelper} color='primary'>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DoctorPatientDialog;