import {
    Box,
    Grid,
    Paper,
    Typography
} from '@mui/material';
import Healthcare from '../../assets/images/static/Healthcare.jpeg';
const MainCard = () => {
    const MainCardData = {
        title: 'Better Healthcare for a Better Lifestyle',
        description: 'Book online appointments with the best doctors in your city.\n All your medical and pharamacy needs, one place. ',
        image: Healthcare,
        imageAltText: 'Healthcare Ahmaaaaad'
    };
    return (
        <Paper
            sx={{
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                mb: 4,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${MainCardData.image})`,
            }}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{ display: 'none' }} src={MainCardData.image} alt={MainCardData.imageAltText} />}
            <Box
                sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" sx={{ fontSize: '1.em' }} gutterBottom>
                            {MainCardData.title}
                        </Typography>
                        <Typography variant="h5" sx={{ color: '#C7BBD1' }} paragraph>
                            {MainCardData.description}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default MainCard;