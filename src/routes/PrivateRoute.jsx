/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children }) => {
  const { email, token } = useSelector(state => state.user.userinfo);

  return email && token ? <div>{children}</div> : <LoadingToRedirect />;
};

export default PrivateRoute;
