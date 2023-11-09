import { useEffect } from 'react';
import { pharmacyAxios } from 'utils/AxiosConfig';
import MainCard from 'ui-component/cards/MainCard';

const Checkout = () => {
    const [items, setItems] = useState([]);
    const { user } = useUserContext();
    const userId = user.id;
    const totalCost = 0;
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
    }, []);

    
    return (
        <MainCard title='Orders'>
        </MainCard>
    );
};

export default Checkout;
