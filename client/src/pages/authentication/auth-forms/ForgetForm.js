import { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	Grid,
	Stack,
	TextField,
} from '@mui/material';
import { authenticationAxios } from 'utils/AxiosConfig';
// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useNavigate } from 'react-router';
import { showFailureAlert, showSuccessAlert } from 'utils/swal';


// ============================|| FIREBASE - LOGIN ||============================ //

const ForgetForm = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const postData = { 'email': email };
		try {
			await authenticationAxios.post('/reset-password', postData);
			showSuccessAlert('Success!', 'Email sent successfully');
			navigate('/login/login3');
			setEmail('');
			setIsSubmitting(false);
		} catch (error) {
			showFailureAlert('Oops...', error.response.data.errMessage);
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<Grid container direction="column" justifyContent="center" spacing={2}>
			</Grid>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth required sx={{ marginBottom: 3 }}>
					<TextField
						type='email'
						required
						label="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
				</FormControl>

				<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
				</Stack>
				<Box sx={{ mt: 2 }}>
					<AnimateButton>
						<Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
							submit
						</Button>
					</AnimateButton>
				</Box>
			</form>
		</>
	);
};

export default ForgetForm;
