import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    TextField,
    MenuItem,
    Button,
    FormControl,
} from '@mui/material';
import axios from 'axios';

const genders = ['Male', 'Female'];
const relations = ['Husband', 'Wife', 'Child'];

const AddFamilyMember = ({
    setFamilyMembers,
    isOpen,
    setIsOpen,
    newMember,
    handleFormInputChange,
    userNameError,
    setUserNameError,
}) => {
    const userId = '65256ddfbe76d9d70f92d287';
    const handleSubmit = (e) => {
        e.preventDefault();
        newMember.gender = newMember.gender.toUpperCase();
        newMember.relation = newMember.relation.toUpperCase();
        axios
            .patch('http://localhost:8002/family-members/' + userId, newMember)
            .then((data) => {
                setIsOpen(false);
                setFamilyMembers(data.data.familyMembers);
            })
            .catch(() => {
                setUserNameError(true);
            });
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={setIsOpen}>
                <DialogTitle variant='h3'>Add Family Member</DialogTitle>
                <DialogContent>
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        <FormControl required fullWidth>
                            <TextField
                                label='Name'
                                name='name'
                                variant='outlined'
                                required
                                fullWidth
                                value={newMember.name}
                                sx={{ marginTop: 5 }}
                                onChange={handleFormInputChange}
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                label='Username'
                                name='userName'
                                variant='outlined'
                                required
                                fullWidth
                                error={userNameError}
                                helperText={
                                    userNameError
                                        ? 'there is no user with this userName'
                                        : ''
                                }
                                value={newMember.userName}
                                sx={{ marginTop: 5 }}
                                onChange={(e) => {
                                    setUserNameError(false);
                                    handleFormInputChange(e);
                                }}
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                label='National ID'
                                name='nationalId'
                                variant='outlined'
                                required
                                fullWidth
                                value={newMember.nationalId}
                                sx={{ marginTop: 5 }}
                                onChange={handleFormInputChange}
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                label='Age'
                                name='age'
                                type='Number'
                                variant='outlined'
                                required
                                fullWidth
                                value={newMember.age}
                                sx={{ marginTop: 5 }}
                                onChange={handleFormInputChange}
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                label='Gender'
                                name='gender'
                                variant='outlined'
                                required
                                fullWidth
                                select
                                value={newMember.gender}
                                sx={{ marginTop: 5 }}
                                onChange={handleFormInputChange}
                            >
                                {genders.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                label='Relation'
                                name='relation'
                                variant='outlined'
                                required
                                fullWidth
                                select
                                value={newMember.relation}
                                sx={{ marginTop: 5 }}
                                onChange={handleFormInputChange}
                            >
                                {relations.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                        <DialogActions>
                            <Button
                                variant='contained'
                                onClick={() => setIsOpen(false)}
                                color='secondary'
                            >
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                type='submit'
                                color='primary'
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AddFamilyMember;
