import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Message = ({ message, type, time, vertical, horizontal }) => {
	return (
		<Snackbar
			anchorOrigin={{ vertical, horizontal }}
			autoHideDuration={time}
		>
			<Alert variant='filled' severity={type}>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default Message;
