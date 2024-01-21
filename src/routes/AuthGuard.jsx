import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const { email, token } = useSelector(state => state.user.userinfo);

  useEffect(() => {
    if (email && token) {
      navigate("/");
    }
  }, [email, token, navigate]);

  return email && token ? null : children;
};

export default AuthGuard;
