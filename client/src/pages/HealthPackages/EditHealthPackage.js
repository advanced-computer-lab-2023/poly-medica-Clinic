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

const EditHealthPackage = ({ isEditDialogOpen, setIsEditDialogOpen, setSelectedEditPackage, handleSaveEdit, selectedEditPackage }) => {
    return (
        <Dialog
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
        >
            <DialogTitle>Edit Health Package</DialogTitle>
            <DialogContent>
                {selectedEditPackage && (
                    <form onSubmit={(e) => handleSaveEdit(e)} id='editPackageForm'>

                        <FormControl required fullWidth>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={selectedEditPackage.name}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackage, name: e.target.value })}
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
                                value={selectedEditPackage.price}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackage, price: e.target.value })}
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
                                value={selectedEditPackage.discountOfDoctor}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackage, discountOfDoctor: e.target.value })}
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
                                value={selectedEditPackage.discountOfMedicin}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackage, discountOfMedicin: e.target.value })}
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
                                value={selectedEditPackage.discountOfFamily}
                                onChange={(e) => setSelectedEditPackage({ ...selectedEditPackage, discountOfFamily: e.target.value })}
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