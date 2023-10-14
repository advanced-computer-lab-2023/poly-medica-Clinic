import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl
} from '@mui/material';

const AddHealthPackages = ({ isAddDialogOpen, handleAddDialogClose, handleFormInputChange, handleAddPackage, newPackage }) => {
   
    return (
            <Dialog open={isAddDialogOpen} onClose={handleAddDialogClose}>
                <DialogTitle>Add New Package</DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => handleAddPackage(e)} id='addPackageForm'>
                        <FormControl required fullWidth>
                            <TextField
                                name="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={newPackage.name}
                                onChange={handleFormInputChange}
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
                                value={newPackage.price}
                                onChange={handleFormInputChange}
                                required
                            />
                        </FormControl>
    
                        <FormControl required fullWidth>
                            <TextField
                                name="discountOfDoctor"
                                label="Doctor-Discount"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={newPackage.discountOfDoctor}
                                onChange={handleFormInputChange}
                                required
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                name="discountOfMedicin"
                                label="Medicine-Discount"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={newPackage.discountOfMedicin}
                                onChange={handleFormInputChange}
                                required
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                name="discountOfFamily"
                                label="Family-Discount"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={newPackage.discountOfFamily}
                                onChange={handleFormInputChange}
                                required
                            />
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddDialogClose} color="secondary">
                        Cancel
                    </Button>
                    <Button
                        type='submit'
                        color='primary'
                        form='addPackageForm'
                    >
                        Add Health Package
                    </Button>
                </DialogActions>
            </Dialog>
        );
};
export default AddHealthPackages;