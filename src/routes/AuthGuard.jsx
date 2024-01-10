import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const { email, token } = useSelector(state => state.userinfo);

  useEffect(() => {
    if (email && token) {
      navigate("/");
    }
  }, [email, token, navigate]);

  return email && token ? null : children;
};

export default AuthGuard;
