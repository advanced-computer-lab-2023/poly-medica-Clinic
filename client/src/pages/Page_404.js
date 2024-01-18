import { Grid } from '@mui/material';
import page_404 from 'assets/images/page_404.png';
import MainCard from 'ui-component/cards/MainCard';

const Page_404 = () => {
    return ( 
        <MainCard>
            <Grid container >
                <Grid item display={'flex'} alignContent={'center'} justifyContent={'center'} width={'100%'}>
                    <img src={page_404} height={600} />
                </Grid>
            </Grid>
        </MainCard>
     );
};
 
export default Page_404;