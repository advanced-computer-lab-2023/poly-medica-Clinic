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
import { usePatientContext } from 'hooks/usePatientContext';
import { addHealthPackage } from 'api/AdminAPI';
const AddHealthPackages = () => {

    const { openAddDialog: isAddDialogOpen, setOpenAddDialog: setIsAddDialogOpen, newPackage, setNewPackage } = useAdminContext();
    const { setPackages } = usePatientContext();
    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setNewPackage((prevPackage) => ({
            ...prevPackage,
            [name]: value,
        }));
    };

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
        setNewPackage({
            name: '',
            price: '',
            discountOfDoctor: '',
            discountOfMedicin: '',
            discountOfFamily: '',
        });
    };

    const handleAddPackage = (e) => {
        e.preventDefault();

        addHealthPackage(newPackage).then((response) => {
            const newPackageData = response.data;
            setPackages((prevPackage) => [...prevPackage, newPackageData]);
            handleAddDialogClose();
        })
            .catch(() => {
                handleAddDialogClose();
            });
    };

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