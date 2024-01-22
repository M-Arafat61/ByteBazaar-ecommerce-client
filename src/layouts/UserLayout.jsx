import { Outlet } from "react-router-dom";
import Header from "../components/shared/Header";
import UserNav from "../components/shared/UserNav";
import FetchUserData from "../utils/FetchUserData";

const UserLayout = () => {
  return (
    <FetchUserData>
      <Header />
      <div className='grid grid-cols-5 my-10 space-x-5'>
        <UserNav />
        <div className='col-span-4'>
          <Outlet />
        </div>
      </div>
    </FetchUserData>
  );
};

export default UserLayout;
