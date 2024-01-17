import { useContext } from "react";
import { GlobalContext } from "../context/ContextProvider";
import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRouteAlt = ({children}) => {
  const {user, userLoaded} = useContext(GlobalContext);

  if (!userLoaded) return (
    <div className="mt-12 md:mt-16 text-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (user) return (
    <Navigate to='/' />
  );

  return children;
};

export default PrivateRouteAlt;

PrivateRouteAlt.propTypes = {
  children: PropTypes.node
}