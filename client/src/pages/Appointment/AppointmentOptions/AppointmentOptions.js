import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Tab,
    Button
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import AppointmentDetails from './AppointmentDetails';
import AppointmentReschedule from './AppointmentReschedule';
import FollowUp from './FollowUp';


const AppointmentOptions = ({ 
    selectedAppointment, 
    setSelectedAppointment, 
    handleDialogClose, 
    user 
}) => {
    const [tabValue, setTabValue] = useState('1');
    const [cannotReschedule, setCannotReschedule] = useState(false);
    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };
    const handleDialogCloseHelper = () => {
        setTabValue('1');
        handleDialogClose();
    };
    useEffect(() => {
        console.log('selectedAppointment == ', selectedAppointment);
        if(selectedAppointment){
            setCannotReschedule(
                selectedAppointment.status.toUpperCase() == 'COMPLETE'
                || selectedAppointment.status.toUpperCase() == 'CANCELLED'
            );
        }
    }, [selectedAppointment]);

    return (
        <Dialog
            open={selectedAppointment}
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
                            <Tab label="Appointment Details" value='1'/>
                            <Tab label="Reschedule" value='2' disabled={cannotReschedule}/>
                            <Tab label="Follow Up" value='3'/>
                        </TabList>
                    </Box>
                </DialogTitle>

                <DialogContent>
                    <TabPanel value='1'>
                        <AppointmentDetails 
                            selectedAppointment={selectedAppointment}
                            setSelectedAppointment={setSelectedAppointment}
                            user={user}
                        />
                    </TabPanel>
                    <TabPanel value='2'>
                        <AppointmentReschedule
                            selectedAppointment={selectedAppointment}
                            setSelectedAppointment={setSelectedAppointment}
                            setTabValue={setTabValue}
                        />
                    </TabPanel>
                    <TabPanel value='3'>
                        <FollowUp
                            selectedAppointment={selectedAppointment}
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

export default AppointmentOptions;
