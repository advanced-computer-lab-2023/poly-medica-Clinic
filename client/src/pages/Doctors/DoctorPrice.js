import { Typography } from '@mui/material';
const DoctorPrice = ({ 
    priceBeforeDiscount,
    priceAfterDiscount,
    margin
}) => {
    return (
        <>
            {
                priceAfterDiscount < priceBeforeDiscount ? (
                    <div style={{ display: 'flex' }}>
                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{ textDecoration: 'line-through' }}
                        >
                            {`$${priceBeforeDiscount}`}
                        </Typography>
                        <Typography
                            variant="h4"
                            color="text.primary"
                            sx={{ marginLeft: `${margin}%` }}
                        >
                            {`$${priceAfterDiscount}`}
                        </Typography>
                    </div>
                ) : (
                    <Typography
                        variant="h4"
                        color="text.primary"
                    >
                        {`$${priceAfterDiscount}`}
                    </Typography>
                )
            }
        </>
    );
};

export default DoctorPrice;