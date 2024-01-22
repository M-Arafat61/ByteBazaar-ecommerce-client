import { Outlet } from "react-router-dom";
import AdminNav from "../components/shared/AdminNav";
import Header from "../components/shared/Header";
import FetchUserData from "../utils/FetchUserData";

const AdminLayout = () => {
  return (
    <FetchUserData>
      <Header />
      <div className='md:grid md:grid-cols-5 py-10 space-x-5 space-y-8 md:space-y-0'>
        <AdminNav />
        <div className='md:col-span-4 pt-1'>
          <Outlet />
        </div>
      </div>
    </FetchUserData>
  );
};

export default AdminLayout;
