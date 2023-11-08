import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
} from '@mui/material';

const OrderTable = ({ items, total }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow sx={{ opacity: 0.5 }}>
                        <TableCell>Item(s)</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow
                            key={item._id}
                            sx={{
                                margin: 20,
                            }}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{`$ ${item.price}`}</TableCell>
                            <TableCell>{`$ ${
                                item.quantity * item.price
                            }`}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow
                            key={'total amount'}
                            sx={{
                                margin: 20,
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>{`$ ${total}`}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderTable;
