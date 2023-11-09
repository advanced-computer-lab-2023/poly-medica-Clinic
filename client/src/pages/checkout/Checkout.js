import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from 'hooks/useUserContext';
import { pharmacyAxios, patientAxios } from 'utils/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import OrderTable from 'pages/orders/OrderTable';
import AddressCard from 'pages/address/AddressCard';
import { ZERO_INDEX } from 'utils/Constants';
import { Button, Typography } from '@mui/material';

const Checkout = () => {
    const [items, setItems] = useState([]);
    const [primaryAddress, setPrimaryAddress] = useState(null);
    const { user } = useUserContext();
    const userId = user.id;
    const navigate = useNavigate();
    let totalCost = 0;
    primaryAddress;
    useEffect(() => {
        pharmacyAxios
            .get(`/cart/${userId}/medicines/`)
            .then((response) => {
                const medicines = response.data;
                setItems(() => {
                    const itms = medicines.map((medicine) => {
                        const itm = {
                            name: medicine.medicine.name,
                            quantity: medicine.quantity,
                            price: medicine.medicine.price,
                        };
                        totalCost += itm.quantity * itm.price;
                        return itm;
                    });
                    return itms;
                });
            })
            .catch((error) => {
                console.log(error);
            });

        patientAxios
            .get('/address/' + userId)
            .then((response) => {
                const data = response.data.deliveryAddresses;
                if (data) {
                    setPrimaryAddress(data[ZERO_INDEX]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <MainCard title='Checkout' sx={{ width: '90%', margin: '0 auto' }}>
            <SubCard title='Order Details' sx={{ marginBottom: 5 }}>
                <OrderTable items={items} total={totalCost} />
            </SubCard>
            <SubCard
                title='Delivery Address'
                secondary={
                    <>
                        <Button
                            onClick={() => {
                                navigate('/patient/pages/address');
                            }}>
                            Add
                        </Button>
                    </>
                }>
                {primaryAddress && (
                    <AddressCard address={primaryAddress} includeEdit={false} />
                )}
                {!primaryAddress && (
                    <Typography sx={{ textAlign: 'center' }}>
                        Please add a delivery address
                    </Typography>
                )}
            </SubCard>
        </MainCard>
    );
};

export default Checkout;
