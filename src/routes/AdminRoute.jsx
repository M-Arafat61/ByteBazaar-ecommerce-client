/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoginSuccess } from "../reducers/userReducer";
import { dbCurrentAdmin } from "../api/auth";
import Loader from "../components/shared/Loader";

const AdminRoute = ({ children }) => {
  const { email, token } = useSelector(state => state.user.userinfo);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email && token) {
          const res = await dbCurrentAdmin(token);
          dispatch(
            userLoginSuccess({
              name: res?.data?.name,
              username: res.data.username,
              email: res.data.email,
              userId: res.data._id,
              role: res.data.role,
              token: token,
            })
          );
        }
      } catch (error) {
        console.log("Current admin error", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email, token, dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return email && token ? children : <Loader />;
};

export default AdminRoute;
