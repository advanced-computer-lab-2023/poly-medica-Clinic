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
	const { dispatch } = useUserContext();
	const navigate = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if(location.pathname != "/pages/login/login3" && location.pathname != "/pages/register/register3"){
		axios.get('http://localhost:8004/check-user', {  credentials: 'include', withCredentials:true }).then(user => {
			dispatch({ auth: true, payload: user.data });
		}).catch( () => {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "you are not autherized, please login",
			});
			navigate('/pages/login/login3');
		});
	}
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
