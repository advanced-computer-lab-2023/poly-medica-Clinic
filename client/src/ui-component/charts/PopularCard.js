import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, 
	// Button, CardActions,
	CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';

// project imports
import BajajAreaChartCard from 'ui-component/charts/BajajaChart/BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/loadingShapes/ProductPlaceholderLoader';
import { gridSpacing } from 'store/constant';

// assets
// import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading, data, title, subTitle, value, earningList }) => {
	const theme = useTheme();

	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			{isLoading ? (
				<SkeletonPopularCard />
			) : (
				<MainCard content={false}>
					<CardContent>
						<Grid container spacing={gridSpacing}>
							<Grid item xs={12}>
								<Grid container alignContent="center" justifyContent="space-between">
									<Grid item>
										<Typography variant="h4">Popular Stocks</Typography>
									</Grid>
									<Grid item>
										<MoreHorizOutlinedIcon
											fontSize="small"
											sx={{
												color: theme.palette.primary[200],
												cursor: 'pointer'
											}}
											aria-controls="menu-popular-card"
											aria-haspopup="true"
											onClick={handleClick}
										/>
										<Menu
											id="menu-popular-card"
											anchorEl={anchorEl}
											keepMounted
											open={Boolean(anchorEl)}
											onClose={handleClose}
											variant="selectedMenu"
											anchorOrigin={{
												vertical: 'bottom',
												horizontal: 'right'
											}}
											transformOrigin={{
												vertical: 'top',
												horizontal: 'right'
											}}
										>
											<MenuItem onClick={handleClose}> Today</MenuItem>
											<MenuItem onClick={handleClose}> This Month</MenuItem>
											<MenuItem onClick={handleClose}> This Year </MenuItem>
										</Menu>
									</Grid>
								</Grid>
							</Grid>
							<Grid item xs={12} sx={{ pt: '16px !important' }}>
								<BajajAreaChartCard  data={data} title={title} subTitle={subTitle} value={value}/>
							</Grid>
							<Grid item xs={12}>

								{earningList && earningList.map((item, idx) => (
									<Grid container direction="column" key={idx}>
										<Grid item>
											<Grid container alignItems="center" justifyContent="space-between">
												<Grid item>
													<Typography variant="subtitle1" color="inherit">
														{item.title}
													</Typography>
												</Grid>
												<Grid item>
													<Grid container alignItems="center" justifyContent="space-between">
														<Grid item>
															<Typography variant="subtitle1" color="inherit">
                              ${item.value}
															</Typography>
														</Grid>
														<Grid item>
															<Avatar
																variant="rounded"
																sx={{
																	width: 16,
																	height: 16,
																	borderRadius: '5px',
																	backgroundColor: item.benefit?theme.palette.success.light:theme.palette.orange.light,
																	color: item.benefit?theme.palette.success.dark:theme.palette.orange.dark,
																	ml: 2
																}}
															>
																{item.benefit &&<KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />}
																{!item.benefit && <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />}
															</Avatar>
														</Grid>
													</Grid>
												</Grid>
											</Grid>
										</Grid>
										<Grid item>
											<Typography variant="subtitle2" sx={{ color: item.benefit?'success.dark':theme.palette.orange.dark }}>
												{item.subTitle}
											</Typography>
										</Grid>
										<Divider sx={{ my: 1.5 }} />
									</Grid>     
								))}
							</Grid>
						</Grid>
					</CardContent>
					{/* <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions> */}
				</MainCard>
			)}
		</>
	);
};

PopularCard.propTypes = {
	isLoading: PropTypes.bool
};

export default PopularCard;
