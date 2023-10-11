import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import axios from 'axios';
import { useEffect } from 'react';
import { useUserContext } from 'hooks/useUserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


// ==============================|| APP ||============================== //

const App = () => {
	const customization = useSelector((state) => state.customization);
	const { dispatch, user } = useUserContext();
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		axios.get('http://localhost:8004/check-user', {  withCredentials:true }).then(userCheck => {
			if(!user)
				dispatch({ auth: true, payload: userCheck.data });
			if(location.pathname == "/pages/login/login3" || location.pathname == "/pages/register/register3"){
				navigate('/');
			}
		}).catch( () => {
			if(location.pathname != "/pages/login/login3" && location.pathname != "/pages/register/register3"){
				Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "you are not autherized, please login",
			});
			navigate('/pages/login/login3');
		}
			dispatch({ auth: false, payload: null });
		});
	
	}, []);

	return (
			<ThemeProvider theme={themes(customization)}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Routes />
				</LocalizationProvider>
			</ThemeProvider>
	);
};

export default App;

