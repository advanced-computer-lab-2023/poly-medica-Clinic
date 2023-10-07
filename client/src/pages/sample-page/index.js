// project imports

import CardSecondaryAction from 'ui-component/cards/CardSecondaryAction';
import MainCard from 'ui-component/cards/MainCard';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MenuCard from 'ui-component/cards/MenuCard';
import { Button, Grid, Typography } from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import EarningCardLoader from 'ui-component/cards/loadingShapes/EarningCardLoader';
import ImagePlaceholderLoader from 'ui-component/cards/loadingShapes/ImagePlaceholderLoader';
import ProductPlaceholderLoader from 'ui-component/cards/loadingShapes/ProductPlaceholderLoader';
import TotalGrowthBarChartLoader from 'ui-component/cards/loadingShapes/TotalGrowthBarChartLoader';
import TotalIncomeCardLoader from 'ui-component/cards/loadingShapes/TotalIncomeCardLoader';
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import BajajAreaChartCard from 'ui-component/charts/BajajaChart/BajajAreaChartCard';
import EarningCard from 'ui-component/EarningCard';
import PopularCard from 'ui-component/charts/PopularCard';
import TotalGrowthBarChart from 'pages/dashboard/TotalGrowthBarChart';
import TotalIncomeDarkCard from 'ui-component/cards/TotalIncomeDarkCard';
import TotalIncomeLightCard from 'ui-component/cards/TotalIncomeLightCard';
import TotalOrderLineChartCard from 'pages/dashboard/TotalOrderLineChartCard';


// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => (
	<MainCard title="Sample Card">
		<Grid container spacing={gridSpacing} display={'flex'} flexDirection={'row'}>
			<Grid item>
				<CardSecondaryAction title={'hi'} link={'#'} icon={<AcUnitIcon fontSize="small" sx={{ paddingLeft:0.2 }}/>} />
			</Grid>

			<Grid item width={'100%'}>
				<MenuCard progress={4} title={'hello'} subTitle={'noo'}/>
			</Grid>

			<Grid item width={'100%'}>
				<SubCard title={'hi from malek'}>
					<Typography>you can do what ever you want</Typography>
				</SubCard>
			</Grid>

			<Grid item width={'100%'}>
				<EarningCardLoader/>
			</Grid>

			<Grid item width={'100%'}>
				<ImagePlaceholderLoader />
			</Grid>

			<Grid item width={'100%'}>
				<ProductPlaceholderLoader/>
			</Grid>

			<Grid item width={'100%'}>
				<TotalGrowthBarChartLoader/>
			</Grid>

			<Grid item width={'100%'}>
				<TotalIncomeCardLoader/>
			</Grid>

			<Grid item>
				<AnimateButton>
					<Button variant="contained" color="primary" sx={{ boxShadow: 'none', marginLeft:3 }}>
                go malek
					</Button>
				</AnimateButton>
			</Grid>

			<Grid item>
				<BajajAreaChartCard data={[100, 15, 10, 50, 30, 40, 25]} title={'malek is the Boss'} subTitle={'the greatest'} value={1000}/>
			</Grid>

			<Grid item>
				<EarningCard isLoading={false} earning={'Total earning'} value={1000}/>
			</Grid>

			<Grid item width={'100%'}>
				<PopularCard isLoading={false} data={[100, 15, 10, 50, 30, 40, 25]} title={'malek is the Boss'} subTitle={'the greatest'} value={1000} earningList={[{ title:'malek mohamed', value:1550, subTitle:'great', benefit:true }, { title:'Reliance', value:200.00, subTitle:'10% Profit', benefit:false }, { title:'TTML', value:7800.00, subTitle:'10% Profit', benefit:false }]}/>
			</Grid>

			<Grid item width={'100%'}>
				<TotalGrowthBarChart isLoading={false}/>
			</Grid>

			<Grid item width={'100%'}>
				<TotalOrderLineChartCard/>
			</Grid>

			<Grid item>
				<TotalIncomeDarkCard title={'255$'} subTitle={'total income'}/>
			</Grid>

			<Grid item>
				<TotalIncomeLightCard title={'255$'} subTitle={'total income'}/>
			</Grid>



		</Grid>
	</MainCard>
);

export default SamplePage;
