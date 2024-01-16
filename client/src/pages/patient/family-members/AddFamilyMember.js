import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Button,
} from '@mui/material';
import { useState } from 'react';
import { updateFamilyMembers } from 'api/PatientAPI';
import FamilyMemberOptions from './FamilyMemeberOptions';
import { REGISTERED_MEMBER, UNREGISTERED_MEMBER } from 'utils/Constants';
import UnregisteredForm from './UnregisteredForm';
import RegisteredForm from './RegisteredForm';
import { usePatientContext } from 'hooks/usePatientContext';
import { useSelector } from 'react-redux';

const AddFamilyMember = ({ isOpen, setIsOpen }) => {

    const { user } = useSelector(state => state.user);
    const { setFamilyMembers, newMember, setError } = usePatientContext();

    const [value, setValue] = useState(REGISTERED_MEMBER);

    const userId = user.id;

    const handleSubmit = (e) => {
        e.preventDefault();
        newMember.gender = newMember.gender.toUpperCase();
        newMember.relation = newMember.relation.toUpperCase();
        
        updateFamilyMembers(userId, newMember).then((response) => {
                setIsOpen(false);
                setFamilyMembers(response.familyMembers);
            })
            .catch((err) => {
                setError(true);
                console.log(err);
            });
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}>
                <DialogTitle variant='h3'>Add Family Member</DialogTitle>
                <DialogContent>
                    <FamilyMemberOptions
                        handleChange={handleChange}
                        value={value}
                    />
                    <form autoComplete='off' onSubmit={handleSubmit}>
                        {value === UNREGISTERED_MEMBER && (
                            <UnregisteredForm />
                        )}
                        {value === REGISTERED_MEMBER && (
                            <RegisteredForm />
                        )}
                        <DialogActions>
                            <Button
                                variant='contained'
                                onClick={() => setIsOpen(false)}
                                color='secondary'>
                                Cancel
                            </Button>
                            <Button
                                variant='contained'
                                type='submit'
                                color='primary'>
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
