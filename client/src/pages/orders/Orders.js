import { useState, useEffect } from 'react';
import { patientAxios } from 'pages/utilities/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';
import OrdersList from './OrdersList.js';
import OrdersDetails from './OrdersDetails.js';
import { useUserContext } from 'hooks/useUserContext.js';
import { CANCELLED_STATUS } from 'utils/Constants.js';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const { user } = useUserContext();
    const userId = user.id;
    useEffect(() => {
        patientAxios
            .get(`/order/${userId}`)
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleDialogClose = () => {
        setSelectedOrder(null);
    };

    const handleCancleOrder = () => {
        selectedOrder.status = CANCELLED_STATUS;
        patientAxios
            .patch(`/order/${selectedOrder._id}`, { order: selectedOrder })
            .then((response) => {
                const order = response.data;
                setOrders((prevOrders) => {
                    const updateOrders = prevOrders.map((ord) => {
                        if (ord._id === order._id) return order;
                        return ord;
                    });
                    return updateOrders;
                });
            })
            .catch((err) => {
                console.log(err);
            });
        handleDialogClose();
    };

    return (
        <MainCard title='Orders'>
            <OrdersList orders={orders} setSelectedOrder={setSelectedOrder} />
            <OrdersDetails
                selectedOrder={selectedOrder}
                handleDialogClose={handleDialogClose}
                handleCancleOrder={handleCancleOrder}
            />
        </MainCard>
    );
};

export default Orders;
