import PropTypes from 'prop-types';
//import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/loadingShapes/EarningCardLoader';

// assets
import EarningIcon from 'assets/images/icons/earning.svg';
//import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
//import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
//import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
//import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
//import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';

const CardWrapper = styled(MainCard)(({ theme }) => ({
	backgroundColor: theme.palette.secondary.dark,
	color: '#fff',
	overflow: 'hidden',
	position: 'relative',
	'&:after': {
		content: '""',
		position: 'absolute',
		width: 210,
		height: 210,
		background: theme.palette.secondary[800],
		borderRadius: '50%',
		top: -85,
		right: -115,
		opacity: 0.9,
		[theme.breakpoints.down('sm')]: {
			top: -105,
			right: -140
		}
	},
	'&:before': {
		content: '""',
		position: 'absolute',
		width: 210,
		height: 210,
		background: theme.palette.secondary[800],
		borderRadius: '50%',
		top: -145,
		right: -15,
		opacity: 0.3,
		[theme.breakpoints.down('sm')]: {
			top: -155,
			right: -70
		}
	}
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const EarningCard = ({ isLoading, earning, value }) => {
	const theme = useTheme();

	return (
		<>
			{isLoading ? (
				<SkeletonEarningCard />
			) : (
				<CardWrapper border={false} content={false} sx={{ width: '220px' }}>
					<Box sx={{ p: 2.25 }}>
						<Grid container direction="column">
							<Grid item >
								<Avatar
									sx={{
										...theme.typography.largeAvatar,
										backgroundColor: theme.palette.secondary[800],
										mt: 1
									}}
								>
									<img src={EarningIcon} />
								</Avatar>
							</Grid>
							<Grid item sx={{ mt : 1.5 , mb: 0.25 }}>
								<Typography
									sx={{
										zIndex: 12,
										fontSize: '1.12rem',
										fontWeight: 700,
										color: theme.palette.secondary[200]
									}}
								>
									{earning}
								</Typography>
							</Grid>
							<Grid item>
								<Grid container alignItems="center">
									<Grid item>
										<Typography sx={{ fontSize: '2.0rem', fontWeight: 500, mr: 1, mt: 0.75, mb: 0.75 }}>${value}</Typography>
									</Grid>
									<Grid item>
										<Avatar
											sx={{
												...theme.typography.smallAvatar,
												backgroundColor: theme.palette.secondary[200],
												color: theme.palette.secondary.dark
											}}
										>
											<ArrowUpwardIcon fontSize="inherit" sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }} />
										</Avatar>
									</Grid>
								</Grid>
							</Grid>

						</Grid>
					</Box>
				</CardWrapper>
			)}
		</>
	);
};

EarningCard.propTypes = {
	isLoading: PropTypes.bool
};

export default EarningCard;
