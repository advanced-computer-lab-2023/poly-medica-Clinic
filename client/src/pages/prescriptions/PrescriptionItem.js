import React from 'react';
import { ListItem,
	ListItemAvatar,
	ListItemText,
	IconButton
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
const PrescriptionItem = ({ Prescription }) => {
	console.log(Prescription);
	return (
		<>
			<ListItem button>
				<ListItemAvatar sx={{ paddingRight: '2%' }}>
					<img width="80" height="80" />
				</ListItemAvatar>
				<ListItemText primary={'Antinal'} secondary={
					<div
						style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
						{'my medicine'}
					</div>
				} sx={{
					width: '60%',
					lineHeight: '1.5em',
					maxHeight: '3em',
				}} />
				<ListItemText sx={{ paddingLeft: '2%' }} primary={`$${20}`} />
				<IconButton
					edge="end"
					aria-label="edit"
				>
					<EditIcon />
				</IconButton>
			</ListItem>
		</>
	);
};

export default PrescriptionItem;