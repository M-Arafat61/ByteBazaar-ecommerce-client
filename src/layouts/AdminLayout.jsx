import { Outlet } from "react-router-dom";
import AdminNav from "../components/shared/AdminNav";
import Header from "../components/shared/Header";
import FetchUserData from "../utils/FetchUserData";

const AdminLayout = () => {
  return (
    <FetchUserData>
      <Header />
      <div className='grid grid-cols-5'>
        <AdminNav />
        <div className='col-span-4'>
          <Outlet />
        </div>
      </div>
    </FetchUserData>
  );
};

export default AdminLayout;
