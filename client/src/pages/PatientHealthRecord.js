//import React, { useState, useEffect } from 'react';
import { Dialog,DialogTitle,DialogContent,Button,DialogActions,  Typography } from '@mui/material';

 
// const handleClose = () => {
//     setOpen(false);
// }
 
const PatientDetails = ({ patient }) => {
	return (
		<Dialog
			PaperProps={{
				sx: { minWidth: window.outerWidth > 800 ? 500 : 300 },
			}}


		>
			<DialogTitle align='center' variant='h2'>
				{patient.name}
			</DialogTitle>
			<DialogContent>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}  
				>
					<img src={null} alt={patient.name} width='100' height='100' />
					<Typography variant='h6' gutterBottom>
						{patient.name}
					</Typography>
					
                   
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={null} color='primary'>
                    Close
				</Button>
			</DialogActions>
		</Dialog>

             
             

	);


};
export default PatientDetails;

