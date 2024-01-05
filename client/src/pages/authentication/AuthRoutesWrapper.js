import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from 'ui-component/Loader';
import { authenticationAxios } from '../../utils/AxiosConfig';
import { dispatchUser } from 'store/user/configUserStore';
import { useDispatch, useSelector } from 'react-redux';

const AuthRoutesWrapper = () => {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
	const { user } = useSelector(state => state.user);
	const dispatch = useDispatch();

    useEffect(() => {
		setIsLoading(true);
		if(user){
			navigate(`/${user.type}/dashboard/home`);
		}else {
			authenticationAxios.get('/check-user', { withCredentials: true }).then(async userData => {
				await dispatch(dispatchUser({ user: userData.data }));
				navigate(`/${userData.data.type}`);
			}).catch( () => {
				setIsLoading(false);
			});	
		}		
	}, []);

    return ( 
    <>
    { isLoading && <Loader /> }
    { !isLoading && <Outlet/> }
    </> 
    );
};
 
export default AuthRoutesWrapper;