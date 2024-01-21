/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dbCurrentAdmin } from "../api";
import Loader from "../components/shared/Loader";
import { userLoginSuccess } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const AdminRoute = ({ children }) => {
  const { email, token, role } = useSelector(state => state.user.userinfo);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }, [email, token, dispatch, navigate, role]);

  useEffect(() => {
    if (!loading && role !== "admin") {
      navigate("/");
    }
    if (!email && !token) {
      setLoading(false);
    }
  }, [email, token, loading, role, navigate]);

  if (loading) {
    return <HiOutlineDotsHorizontal size={25} />;
  }
  return loading ? (
    <HiOutlineDotsHorizontal size={25} />
  ) : email && token ? (
    children
  ) : (
    <Loader />
  );
};

export default AdminRoute;
