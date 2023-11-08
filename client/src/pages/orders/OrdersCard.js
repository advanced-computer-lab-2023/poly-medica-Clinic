import { ListItemButton, ListItemText, ListItemAvatar } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import moment from 'moment/moment';
import { DATE_FORAMT } from 'utils/Constants';

const formatDate = (date) => {
    const momentDate = new moment(date);
    return momentDate.format(DATE_FORAMT);
};

const OrderCard = ({ order, setSelectedOrder }) => {
    return (
        <ListItemButton onClick={() => setSelectedOrder(order)}>
            <ListItemAvatar sx={{ paddingRight: '2%' }}>
                <ReceiptLongIcon />
            </ListItemAvatar>
            <ListItemText
                primary={`Order Id : ${order._id}`}
                secondary={formatDate(order.createdAt)}
                sx={{
                    width: '60%',
                    lineHeight: '1.5em',
                    maxHeight: '3em',
                }}
            />
            <ListItemText sx={{ paddingLeft: '2%' }} primary={order.status} />
        </ListItemButton>
    );
};

export default OrderCard;
