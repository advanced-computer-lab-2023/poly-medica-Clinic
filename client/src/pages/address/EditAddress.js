import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import AddressForm from './AddressForm';

import { ADDRESS_ATTRIBUTES } from 'utils/Constants';

const EditAddress = ({
    isEditDialogOpen,
    handleDialogClose,
    handleFormInputChange,
    handleSaveAddress,
    address,
}) => {
    return (
        <Dialog open={isEditDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogContent>
                <AddressForm
                    handleFormInputChange={handleFormInputChange}
                    handleSubmit={handleSaveAddress}
                    object={address}
                    objectAttributes={ADDRESS_ATTRIBUTES}
                ></AddressForm>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose} color='secondary'>
                    Cancel
                </Button>
                <Button type='submit' color='primary' form='addressForm'>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default EditAddress;
