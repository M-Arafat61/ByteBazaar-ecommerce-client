import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";
import FetchUserData from "../utils/FetchUserData";

const Main = () => {
  return (
    <FetchUserData>
      <Header />
      <Outlet />
    </FetchUserData>
  );
};

export default Main;
