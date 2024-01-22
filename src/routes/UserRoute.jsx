/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../components/shared/Loader";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const { email, token, role } = useSelector(state => state.user.userinfo);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoreData = async () => {
      if (email && token) {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [email, token, navigate]);

  useEffect(() => {
    if (!loading && role !== "user") {
      if (role !== "admin") {
        navigate("/");
      }
    }
    if (!email && !token) {
      setLoading(false);
    }
  }, [email, token, loading, role, navigate]);

  return loading ? (
    <HiOutlineDotsHorizontal size={25} />
  ) : email && token ? (
    children
  ) : (
    <Loader />
  );
};

export default UserRoute;
