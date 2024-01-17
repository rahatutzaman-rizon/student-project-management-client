import { useContext } from "react";
import { GlobalContext } from "../context/ContextProvider";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
  const {user, userLoaded} = useContext(GlobalContext);
  const {pathname} = useLocation();

  if (!userLoaded) return (
    <div className="mt-12 md:mt-16 text-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!user) return (
    <Navigate to='/login' state={pathname} />
  );

  return children;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node
}