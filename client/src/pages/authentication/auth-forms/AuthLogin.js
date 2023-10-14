import { useState, useEffect } from 'react';
import {
	Box,
	Button,
	FormControl,
	Grid,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useUserContext } from 'hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import axiosInstanceAuthSer from 'utils/api/axiosInstanceAuthSer';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import Swal from 'sweetalert2';
import Loader from 'ui-component/Loader';
// import Cookies from 'js-cookie';
import axios from 'axios';


// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const { user, dispatch } = useUserContext();
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		if(user){
			navigate('/');
		}else {
			axios.get('http://localhost:8004/check-user', { withCredentials: true }).then(user => {
				dispatch({ auth: true, payload: user.data });
				navigate('/');
			}).catch( () => {
				setIsLoading(false);
			});	
		}		
	}, []);


	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		const postData = { 'userName': userName, 'password': password };
		const response = await axiosInstanceAuthSer.post('/login', postData);
		const data = response.data;		
		if(response.status === 200){
			dispatch({ auth: true, payload:data });
			navigate('/');
			setIsSubmitting(false);
		} else{
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: response.response.data.message,
			});
			setIsSubmitting(false);
			}
	};

	return (
		<>
		{isLoading && <Loader/>}
		{ !isLoading &&
		<>
			<Grid container direction="column" justifyContent="center" spacing={2}>
				<Grid item xs={12} container alignItems="center" justifyContent="center">
					<Box sx={{ mb: 2 }}>
						<Typography variant="subtitle1">Sign in with username address</Typography>
					</Box>
				</Grid>
			</Grid>
					<form onSubmit={handleSubmit}>
						<FormControl fullWidth required sx={{ marginBottom:3 }}>
							<TextField
							type='text'
							required
							label="username"
							value={userName}
							onChange={e => setUserName(e.target.value)}
							/>
						</FormControl>

						<FormControl fullWidth required>
							<TextField
							type={'password'}
							label="password"
							value={password}
							required
							onChange={e => setPassword(e.target.value)}
							/>
						</FormControl>
						<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
							<Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                Forgot Password?
							</Typography>
						</Stack>
						<Box sx={{ mt: 2 }}>
							<AnimateButton>
								<Button disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
								</Button>
							</AnimateButton>
						</Box>
					</form>
		</>
		}
		</>
	);
};

export default FirebaseLogin;
