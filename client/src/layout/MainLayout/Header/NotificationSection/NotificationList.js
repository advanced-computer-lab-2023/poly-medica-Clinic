import { useTheme } from '@mui/material/styles';
import { Divider, List } from '@mui/material';
import BasicNotification from './notificationComponents/BasicNotification';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';



// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = ({ notifications }) => {
	const theme = useTheme();
	

	return (
		<List
			sx={{
				width: '100%',
				maxWidth: 330,
				py: 0,
				borderRadius: '10px',
				[theme.breakpoints.down('md')]: {
					maxWidth: 300
				},
				'& .MuiListItemSecondaryAction-root': {
					top: 22
				},
				'& .MuiDivider-root': {
					my: 0
				},
				'& .list-container': {
					pl: 7
				}
			}}
		>
			{ 
				notifications.map( (notification, idx) => {
					return (
					<>
					<BasicNotification key={`notification_${idx}_${notification.createdAt}`} header={notification.notificationHead} body={notification.notificationBody} date={formatDistanceToNow(new Date(notification.createdAt))} chipLabel={notification.notificationState?'seen':'unseen'} chipType={notification.notificationState?'success':'error'} notificationType={notification.notificationType} senderImage={notification.senderImage} senderName={notification.senderName}/>
					<Divider/>
					</>
				);} )
			}
		</List>
	);
};

export default NotificationList;
