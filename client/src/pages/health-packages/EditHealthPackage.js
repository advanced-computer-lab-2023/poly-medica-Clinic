import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl
} from '@mui/material';
import { useAdminContext } from 'hooks/useAdminContext';
import { updateHealthPackage } from 'api/AdminAPI';
import { usePatientContext } from 'hooks/usePatientContext';

const EditHealthPackage = () => {
    const { isEditDialogOpen, setIsEditDialogOpen, setSelectedEditPackage, selectedEditPackages } = useAdminContext();
    const { setPackages } = usePatientContext();
    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (selectedEditPackages) {
            updateHealthPackage(selectedEditPackages)
                .then(() => {
                    setIsEditDialogOpen(false);
                    setPackages((prevPackage) => {
                        const updatedPackages = prevPackage.map((packages) => {
                            if (packages._id === selectedEditPackages._id) {
                                return selectedEditPackages;
                            }
                            return packages;
                        });
                        return updatedPackages;
                    });
                    setSelectedEditPackage(null);
                });
        }
    };

    return (
        <Dialog
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
        >
            <DialogTitle>Edit Health Package</DialogTitle>
            <DialogContent>
                {selectedEditPackages && (
                    <form onSubmit={(e) => handleSaveEdit(e)} id='editPackageForm'>

                        <FormControl required fullWidth>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedEditPackages.name}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackages, name: e.target.value })}
                                required
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                name="price"
                                label="Price"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedEditPackages.price}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackages, price: e.target.value })}
                                required
                            />
                        </FormControl>

                        <FormControl required fullWidth>
                            <TextField
                                name="discountOfDoctor"
                                label="Doctor Discount"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedEditPackages.discountOfDoctor}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackages, discountOfDoctor: e.target.value })}
                                required
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                name="discountOfMedicin"
                                label="Medicine Discount"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedEditPackages.discountOfMedicin}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackages, discountOfMedicin: e.target.value })}
                                required
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                name="discountOfFamily"
                                label="Family Discount"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedEditPackages.discountOfFamily}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackages, discountOfFamily: e.target.value })}
                                required
                            />
                        </FormControl>
                    </form>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => setIsEditDialogOpen(false)}
                    color="secondary"
                >
                    Cancel
                </Button>
                <Button
                    type='submit'
                    color="primary"
                    form='editPackageForm'
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditHealthPackage;