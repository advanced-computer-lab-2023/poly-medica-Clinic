import { useTheme } from '@mui/material/styles';
import {
    Card, CardContent, Typography 
} from '@mui/material';

const FeatureCard = ({ title, description, icon }) => {
    const theme = useTheme();
    return (
        <Card sx={{
            maxWidth: '25%',
            height: '18em',
            backgroundColor: theme.palette.primary.light,
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 11%)',
            ':hover': {
                boxShadow: '0 2px 14px 0 rgb(32 40 45 / 40%)',
            },
        }}>
            <CardContent>
                {icon}
                <Typography variant="h3" color='GrayText' component="h2" sx={{ marginBottom: '0.5em', marginTop: '0.3em' }}>
                    {title}
                </Typography>
                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;