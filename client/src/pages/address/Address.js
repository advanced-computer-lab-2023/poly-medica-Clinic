import { useState, useEffect } from 'react';
import { patientAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import AddressList from './AddressList.js';
import AddAddress from './AddAddress.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

const Address = () => {
    const [addresses, setAddresses] = useState(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [newAddress, setNewAddress] = useState({
        city: '',
        street: '',
        buildingName: '',
        phoneNumber: '',
        primary: false,
    });
    const { user } = useUserContext();
    const userId = user.id;
    useEffect(() => {
        patientAxios
            .get('/address/' + userId)
            .then((response) => {
                setAddresses(response.data.deliveryAddresses);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleAddDialogOpen = () => {
        setIsAddDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
        setNewAddress({
            city: '',
            street: '',
            buildingName: '',
            phoneNumber: '',
            primary: false,
        });
    };

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
        console.log(newAddress);
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        patientAxios
            .patch('/address/' + userId, newAddress)
            .then((response) => {
                const newAddresses = response.data.deliveryAddresses;
                setAddresses(newAddresses);
                handleAddDialogClose();
            })
            .catch((error) => {
                console.log('Error adding address:', error);
                handleAddDialogClose();
            });
    };

    return (
        <MainCard title='Addresses'>
            {addresses && (
                <AddressList
                    addresses={addresses}
                />
            )}
            <Fab
                color='secondary'
                aria-label='Add'
                onClick={handleAddDialogOpen}
                sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    zIndex: 9999,
                }}>
                <Add />
            </Fab>
            <AddAddress
                isAddDialogOpen={isAddDialogOpen}
                handleAddDialogClose={handleAddDialogClose}
                handleFormInputChange={handleFormInputChange}
                handleAddAddress={handleAddAddress}
                newAddress={newAddress}
            />
        </MainCard>
    );
};

export default Address;
