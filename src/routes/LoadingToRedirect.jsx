import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgDanger } from "react-icons/cg";
import { Icon } from "@chakra-ui/react";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className='min-h-screen flex flex-col space-y-2 items-center justify-center text-red-500'>
      <Icon className='text-2xl ' as={CgDanger} />
      <p className='text-xl'>Redirecting in {count} seconds!</p>
    </div>
  );
};

export default LoadingToRedirect;
