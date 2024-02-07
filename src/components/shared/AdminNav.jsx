import { Box, Icon } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { TbCategoryPlus } from "react-icons/tb";
import { RiCoupon3Fill, RiLockPasswordLine } from "react-icons/ri";

const AdminNav = () => {
  return (
    <Box
      className='flex flex-wrap  md:flex-col my-2 pl-2'
      fontSize={"lg"}
      fontWeight={"semibold"}
    >
      <NavLink
        to='/admin/dashboard'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1 flex items-center  text-lg  md:text-xl xl:text-2xl"
              : "  text-lg  md:text-xl xl:text-2xl  flex items-center  hover:bg-neutral-300/85  rounded-full px-3 py-1 "
          }`
        }
      >
        <Icon as={MdDashboard} marginRight={1} />
        Dashboard
      </NavLink>
      <NavLink
        to='/admin/product'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1  flex items-center  text-lg  md:text-xl xl:text-2xl"
              : "  text-lg  md:text-xl xl:text-2xl  flex items-center  hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        <Icon as={FaShopify} marginRight={1} />
        Product
      </NavLink>
      <NavLink
        to='/admin/products'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1  flex items-center  text-lg  md:text-xl xl:text-2xl"
              : "  text-lg  md:text-xl xl:text-2xl  flex items-center  hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        <Icon as={FaCartShopping} marginRight={1} />
        Products
      </NavLink>
      <NavLink
        to='/admin/category'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1  flex items-center  text-lg  md:text-xl xl:text-2xl"
              : "  text-lg  md:text-xl xl:text-2xl  flex items-center  hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        <Icon as={MdOutlineCategory} marginRight={1} />
        Category
      </NavLink>
      <NavLink
        to='/admin/sub'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1  flex items-center  text-lg  md:text-xl xl:text-2xl"
              : "  text-lg  md:text-xl xl:text-2xl  flex items-center  hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        <Icon as={TbCategoryPlus} marginRight={1} />
        Sub Category
      </NavLink>
      <NavLink
        to='/admin/coupon'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1  flex items-center  text-lg  md:text-xl xl:text-2xl"
              : "  text-lg  md:text-xl xl:text-2xl  flex items-center  hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        <Icon as={RiCoupon3Fill} marginRight={1} />
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
              ? "text-emerald-400 underline px-3 py-1  flex items-center  text-lg  md:text-xl xl:text-2xl"
              : "  text-lg  md:text-xl xl:text-2xl  flex items-center  hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        <Icon as={RiLockPasswordLine} marginRight={1} />
        Password
      </NavLink>
    </Box>
  );
};

export default AdminNav;
