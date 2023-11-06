import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    Button,
} from '@mui/material';

const AddressDetails = ({ selectedAddress, handleDialogClose }) => {
    return (
        <Dialog
            open={selectedAddress}
            onClose={handleDialogClose}
            PaperProps={{
                sx: { minWidth: window.outerWidth > 800 ? 500 : 300 },
            }}>
            {selectedAddress && (
                <>
                    <DialogTitle align='center' variant='h2'>
                        Address
                    </DialogTitle>
                    <DialogContent>
                        <Typography variant='subtitle1'>City:</Typography>
                        <Typography variant='body1'>
                            {selectedAddress.city}
                        </Typography>
                        <Typography variant='subtitle1'>Street:</Typography>
                        <Typography variant='body1'>
                            {selectedAddress.street}
                        </Typography>
                        <Typography variant='subtitle1'>
                            Building Name:
                        </Typography>
                        <Typography variant='body1'>
                            {selectedAddress.buildingName}
                        </Typography>
                        <Typography variant='subtitle1'>Mobile:</Typography>
                        <Typography variant='body1'>
                            {selectedAddress.phoneNumber}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color='primary'>
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default AddressDetails;
