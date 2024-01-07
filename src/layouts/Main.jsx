import { Outlet } from "react-router-dom";
import Nav from "../components/shared/nav";

const Main = () => {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Main;
