import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions';
import { useUserContext } from 'hooks/useUserContext.js';
// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
	const { user } = useUserContext();
	const userType = user.type;
	const defaultId = useSelector((state) => state.customization.defaultId);
	const dispatch = useDispatch();
	return (
		<ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={`/${userType}/dashboard/home`}>
			<Logo />
		</ButtonBase>
	);
};

export default LogoSection;
