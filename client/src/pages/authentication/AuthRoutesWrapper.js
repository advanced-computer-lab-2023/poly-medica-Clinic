import axios from 'axios';
import { useUserContext } from 'hooks/useUserContext';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loader from 'ui-component/Loader';


const AuthRoutesWrapper = () => {

    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { user, dispatch } = useUserContext();

    useEffect(() => {
		console.log(1);
		setIsLoading(true);
		if(user){
			navigate(`/${user.type}`);
			console.log(2);
		}else {
			axios.get('http://localhost:8004/check-user', { withCredentials: true }).then(async userData => {
				await dispatch({ auth: true, payload: userData.data });
				navigate(`/${userData.data.type}`);
				console.log(3);
			}).catch( () => {
				console.log(4);
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