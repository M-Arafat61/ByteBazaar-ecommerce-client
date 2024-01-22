import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const AdminNav = () => {
  return (
    <Box
      className='flex flex-wrap md:flex-col my-2 pl-2'
      fontSize={"lg"}
      fontWeight={"semibold"}
    >
      <NavLink
        to='/admin/dashboard'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        Admin Dashboard
      </NavLink>
      <NavLink
        to='/admin/product'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        Product
      </NavLink>
      <NavLink
        to='/admin/products'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        Products
      </NavLink>
      <NavLink
        to='/admin/category'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        Category
      </NavLink>
      <NavLink
        to='/admin/subcategory'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        Sub Category
      </NavLink>
      <NavLink
        to='/admin/coupon'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        Coupons
      </NavLink>

      {/* 
      Todo
      1.Making admin password change page
      
      */}
      <NavLink
        to='/user/password'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        Password
      </NavLink>
    </Box>
  );
};

export default AdminNav;
