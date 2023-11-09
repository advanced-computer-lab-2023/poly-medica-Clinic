import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import AddressForm from './AddressForm';

import { ADDRESS_ATTRIBUTES } from 'utils/Constants';

const AddAddress = ({
    isAddDialogOpen,
    handleAddDialogClose,
    handleFormInputChange,
    handleAddAddress,
    newAddress,
}) => {
    return (
        <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
            <DialogTitle>Add New Address</DialogTitle>
            <DialogContent>
                <AddressForm
                    handleFormInputChange={handleFormInputChange}
                    handleSubmit={handleAddAddress}
                    object={newAddress}
                    objectAttributes={ADDRESS_ATTRIBUTES}
                ></AddressForm>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddDialogClose} color='secondary'>
                    Cancel
                </Button>
                <Button type='submit' color='primary' form='addressForm'>
                    Add Address
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddAddress;
