import {
    Card,
    CardContent,
    TableCell,
    Table,
    TableBody,
    TableRow,
    Typography,
} from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';

const AddressCard = ({ address }) => {
    return (
        // <ListItem>
        //     <ListItemAvatar sx={{ paddingRight: '2%' }}>
        //         <HomeIcon />
        //     </ListItemAvatar>
        //     <ListItemText
        //         primary={`${address.city},  ${address.street},  ${address.buildingName}`}
        //         sx={{
        //             marginLeft: '2%',
        //             width: '50%',
        //             lineHeight: '1.5em',
        //             maxHeight: '3em',
        //         }}
        //         secondary={`Phone :  ${address.phoneNumber}`}
        //     />
        //     {/* <ListItemText sx={{ paddingLeft: '2%' }} primary={``} /> */}
        // </ListItem>

        <Card>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell
                                sx={{
                                    border: 0,
                                    padding: 0,
                                    width: '35%',
                                }}>
                                Address
                            </TableCell>
                            <TableCell
                                color='text.secondary'
                                align='start'
                                sx={{
                                    border: 0,
                                    padding: 0,
                                }}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'>
                                    {`${address.city}, ${address.street}, ${address.buildingName}`}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                sx={{
                                    padding: 0,
                                    paddingBottom: 5,
                                    width: '35%',
                                }}>
                                Phone Number
                            </TableCell>
                            <TableCell
                                align='start'
                                sx={{
                                    padding: 0,
                                    paddingBottom: 5,
                                }}>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'>
                                    {`${address.phoneNumber}`}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            {/* <CardActions>
                <Button size='small'>Learn More</Button>
            </CardActions> */}
        </Card>
    );
};

export default AddressCard;
