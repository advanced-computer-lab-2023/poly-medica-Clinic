import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from './bajaj-area-chart';

// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = ({ data, title, subTitle, value }) => {
	const theme = useTheme();
	const customization = useSelector((state) => state.customization);
	const { navType } = customization;

	const orangeDark = theme.palette.secondary[800];

	useEffect(() => {
		const newSupportChart = {
			...chartData.options,
			colors: [orangeDark],
			tooltip: {
				theme: 'light'
			}
		};
		ApexCharts.exec('support-chart', 'updateOptions', newSupportChart);
	}, [navType, orangeDark]);

	return (
		<Card sx={{ bgcolor: 'secondary.light' }}>
			<Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
				<Grid item xs={12}>
					<Grid container alignItems="center" justifyContent="space-between">
						<Grid item>
							<Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
								{title}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
								{value}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
						{subTitle}
					</Typography>
				</Grid>
			</Grid>
			<Chart {...chartData} series={[
				{
					data: data
				}
			] }  />
		</Card>
	);
};

export default BajajAreaChartCard;
