import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import {
  RiShoppingCartFill,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";

import { CiShop } from "react-icons/ci";
import { FaPerbyte, FaUserShield } from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../reducers/userReducer";
import DrawerComponent from "./Drawer";

const Header = () => {
  const dispatch = useDispatch();
  const { email, role } = useSelector(state => state.user.userinfo);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogout());
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  // console.log(email, role);

  return (
    <div className='flex gap-x-5 shadow-lg items-center py-4 text-[18px] font-medium'>
      <div className='flex md:hidden'>
        <DrawerComponent />
      </div>
      <NavLink
        className={({ isActive }) =>
          `md:flex hidden items-center gap-x-1 hover:bg-neutral-300/85 px-3 rounded-full py-1 ${
            isActive
              ? "text-emerald-400 border-b-[4px] border-emerald-500 shadow-sm"
              : ""
          }`
        }
      >
        <Icon className='text-xl' as={FaPerbyte} />
        ByteBazaar
      </NavLink>
      <NavLink
        to='/shop'
        className={({ isActive }) =>
          `md:flex hidden  items-center gap-x-1 hover:bg-neutral-300/85 px-3 rounded-full py-1 ${
            isActive
              ? "text-emerald-400 border-b-[4px] border-emerald-500 shadow-sm"
              : ""
          }`
        }
      >
        <Icon as={CiShop} />
        Shop
      </NavLink>

      <NavLink
        to='/cart'
        className={({ isActive }) =>
          `md:flex hidden  items-center gap-x-1 hover:bg-neutral-300/85 px-3 rounded-full py-1 ${
            isActive
              ? "text-emerald-400 border-b-[4px] border-emerald-500 shadow-sm"
              : ""
          }`
        }
      >
        <Icon as={RiShoppingCartFill} />
        Cart
      </NavLink>

      {!email ? (
        <div className='flex gap-x-2 md:gap-x-5 justify-end w-full'>
          <NavLink
            to='/login'
            className={({ isActive }) =>
              `flex items-center gap-x-1 hover:bg-neutral-300/85 px-1 md:px-3  rounded-full py-1 ${
                isActive
                  ? "text-emerald-400 border-b-[4px] border-emerald-500 shadow-sm"
                  : ""
              }`
            }
          >
            <Icon as={RiLoginCircleLine} />
            Login
          </NavLink>

          <NavLink
            to='/register'
            className={({ isActive }) =>
              `flex items-center gap-x-1 hover:bg-neutral-300/85 px-1 md:px-3 rounded-full py-1 ${
                isActive
                  ? "text-emerald-400 border-b-[4px] border-emerald-500 shadow-sm"
                  : ""
              }`
            }
          >
            <Icon as={FaUserShield} />
            Register
          </NavLink>
        </div>
      ) : (
        <div className='flex w-full justify-end'>
          <Menu>
            <MenuButton className='bg-neutral-300/85 px-2 py-1 rounded-xl font-normal text-base hover:border-emerald-400 hover:border-b-[4px] hover:text-emerald-400 overflow-hidden'>
              {email?.split("@")[0]}
              <Icon as={GiClick} />
            </MenuButton>
            <MenuList fontWeight='semibold' letterSpacing='wide' fontSize='xs'>
              {role === "admin" ? (
                <Link to='/admin/dashboard'>
                  <MenuItem className='flex items-center gap-x-1'>
                    <Icon as={MdOutlineSpaceDashboard} />
                    Admin Dashboard
                  </MenuItem>
                </Link>
              ) : (
                <Link to='/user/history'>
                  <MenuItem className='flex items-center gap-x-1'>
                    <Icon as={MdOutlineSpaceDashboard} />
                    User Dashboard
                  </MenuItem>
                </Link>
              )}
              <MenuItem
                onClick={handleLogout}
                className='flex items-center gap-x-1'
              >
                <Icon as={RiLogoutCircleLine} />
                <Text>Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Header;
