import { Route, useHistory } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import Loading from "../components/Loading";
import { useEffect, Suspense } from "react";
import { GUEST_ACCESS } from "./Constants";

const AuthGuard = ({ component: Component, Auth, isLazy, ...rest }) => {
  const { user } = useUserContext();
  const history = useHistory();
  const isRoute = true; // Dummy data


  const handleAuthorization = (User) => {
    if (User) {
      if (User.isAuth) {
        if (Auth.includes(User.access)) {
          if(isLazy) return <Suspense><Component {...rest} /></Suspense>;
          return <Component {...rest} />;
        } else {
          return <></>; // Return null for unauthorized access
        }
      } else {
        if (Auth.includes(GUEST_ACCESS)) {
          if(isLazy) return <Suspense><Component {...rest} /></Suspense>;
          return <Component {...rest} />;
        } else {
          return <></>; // Return null for unauthorized access
        }
      }
    } else {
      return <Loading />;
    }
  };

  useEffect(() => {
    if (user) {
      if (user.isAuth) {
        if (!Auth.includes(user.access)  && isRoute) {
          history.push('/home');
        }
      } else {
        if (!Auth.includes(GUEST_ACCESS) && isRoute) {
          history.push('/pages/login/login3');
        }
      }
    }
  }, [user, Auth, history, isRoute]);

  return <Route {...rest} render={(props) => handleAuthorization(user, props)} />;
};

export default AuthGuard;