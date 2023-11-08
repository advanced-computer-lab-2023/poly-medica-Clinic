import { useState, useEffect } from 'react';
import { patientAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import AddressList from './AddressList.js';
import AddAddress from './AddAddress.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import EditAddress from './EditAddress.js';

const Address = () => {
    const [addresses, setAddresses] = useState(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [address, setAddress] = useState({
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

    const handleEditDialogOpen = () => {
        setIsEditDialogOpen(true);
    };

    const handleAddDialogClose = () => {
        setIsAddDialogOpen(false);
        setAddress({
            city: '',
            street: '',
            buildingName: '',
            phoneNumber: '',
            primary: false,
        });
    };

    const handleEditDialogClose = () => {
        setIsEditDialogOpen(false);
        setAddress({
            city: '',
            street: '',
            buildingName: '',
            phoneNumber: '',
            primary: false,
        });
    };

    const handleFormInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
        console.log(Address);
    };

    const handleAddAddress = (e) => {
        e.preventDefault();
        const deliveryAddresses = [...addresses, address];
        patientAxios
            .patch('/address/' + userId, { deliveryAddresses })
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

    const handleEditAddress = (e) => {
        e.preventDefault();
        const deliveryAddresses = addresses.map((curAddress) => {
            if (curAddress._id === address._id) {
                return address;
            }
            if (address.primary) curAddress.primary = false;
            return curAddress;
        });
        patientAxios
            .patch(`/address/${userId}`, { deliveryAddresses })
            .then((response) => {
                const newAddresses = response.data.deliveryAddresses;
                console.log(newAddresses);
                setAddresses(newAddresses);
                handleEditDialogClose();
            })
            .catch((error) => {
                console.log('Error Editting address:', error);
                handleEditDialogClose();
            });
    };

    return (
        <MainCard title='Addresses'>
            {addresses && (
                <AddressList
                    addresses={addresses}
                    setSelectedAddress={setAddress}
                    handleEditDialogOpen={handleEditDialogOpen}
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
                newAddress={address}
            />
            <EditAddress
                address={address}
                handleDialogClose={handleEditDialogClose}
                handleFormInputChange={handleFormInputChange}
                handleSaveAddress={handleEditAddress}
                isEditDialogOpen={isEditDialogOpen}
            />
        </MainCard>
    );
};

export default Address;
