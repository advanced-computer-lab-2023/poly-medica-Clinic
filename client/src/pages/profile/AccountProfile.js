import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
  
  
const AccountProfile = () => {

	const { user } = useUserContext();
	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Avatar
						src={user.avatar}
						sx={{
							height: 80,
							mb: 2,
							width: 80
						}}
					/>
					<Typography
						gutterBottom
						variant="h5"
					>
						{user.userName}
					</Typography>
				</Box>
			</CardContent>
			<Divider />
			<CardActions>
				<Button
					fullWidth
					variant="text"
				>
					Upload picture
				</Button>
			</CardActions>
		</Card>
	);
};
  
export default AccountProfile;