import { useDispatch, useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Loader from 'ui-component/Loader';
import { authenticationAxios } from './utils/AxiosConfig';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { showFailureAlert } from './utils/swal';
import { dispatchUser } from 'store/user/configUserStore';


// ==============================|| APP ||============================== //

const App = () => {
	const customization = useSelector((state) => state.customization);
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();
	useEffect(() => {
		setIsLoading(true);
		authenticationAxios.get('/check-user', {  withCredentials:true }).then(async userCheck => {
			console.log({ ckeckData: userCheck.data });
			if(!user)
				{
					await dispatch(dispatchUser({ user: userCheck.data }));
					setIsLoading(false);
				}
			if(location.pathname == '/login/login3' || location.pathname == '/login/register/register3'){
				console.log('formward ',{ user });
				navigate(`/${userCheck.data.type}`);
				setIsLoading(false);
			}
			
		}).catch( async () => {
			if(location.pathname != '/login/login3' && location.pathname != '/login/register/register3'){
			showFailureAlert('Oops...', 'you are not autherized, please login');
			navigate('/login/login3');
			setIsLoading(false);
		}
			await dispatch(dispatchUser({ user: null }));
			setIsLoading(false);
		});
	
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<ThemeProvider theme={themes(customization)}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterDateFns}>
				{isLoading && <Loader />}
				{!isLoading &&<Routes />}
				</LocalizationProvider>
			</ThemeProvider>
		</DndProvider>
	);
};

export default App;

