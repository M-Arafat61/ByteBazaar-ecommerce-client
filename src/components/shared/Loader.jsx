import { useEffect } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Loader = () => {
  const { email, token } = useSelector(state => state.user.userinfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email || !token) {
      console.log("Loader comp hitting");
      navigate("/login");
    }
  }, [email, token, navigate]);

  return (
    <div>
      <HiOutlineDotsHorizontal size={25} />
    </div>
  );
};

export default Loader;
