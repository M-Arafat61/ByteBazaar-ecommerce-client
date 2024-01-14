/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { email, token } = useSelector(state => state.user.userinfo);

  useEffect(() => {
    if (!email || !token) {
      console.log("PrivateRoute - Redirecting to /login");
      navigate("/login");
    }
  }, [email, token, navigate]);
  return email && token ? <div>{children}</div> : null;
};

export default PrivateRoute;
