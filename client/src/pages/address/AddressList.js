import React from 'react';
import { List } from '@mui/material';
import AddressCard from './AddressCard.js';

const AddressList = ({
    addresses,
    setSelectedAddress,
    handleEditDialogOpen,
}) => {
    return (
        <List>
            {Array.isArray(addresses) &&
                addresses.map((address, index) => (
                    <div key={index}>
                        <div key={index}>
                            <AddressCard
                                address={address}
                                setSelectedAddress={setSelectedAddress}
                                handleEditDialogOpen={
                                    handleEditDialogOpen
                                }></AddressCard>
                        </div>
                    </div>
                ))}
        </List>
    );
};

export default AddressList;
