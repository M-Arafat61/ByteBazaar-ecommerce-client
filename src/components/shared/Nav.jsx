import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
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

const Nav = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogout());
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };
  const { email } = useSelector(state => state.userinfo);
  // console.log(email);

  return (
    <div className='flex gap-x-5 shadow-lg items-center py-4 text-[18px] font-medium'>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `flex items-center gap-x-1 hover:bg-neutral-300/85 px-3 rounded-full py-1 ${
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
          `flex items-center gap-x-1 hover:bg-neutral-300/85 px-3 rounded-full py-1 ${
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
          `flex items-center gap-x-1 hover:bg-neutral-300/85 px-3 rounded-full py-1 ${
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
        <div className='flex gap-x-5 justify-end w-full'>
          <NavLink
            to='/login'
            className={({ isActive }) =>
              `flex items-center gap-x-1 hover:bg-neutral-300/85 px-3 rounded-full py-1 ${
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
              `flex items-center gap-x-1 hover:bg-neutral-300/85 px-3 rounded-full py-1 ${
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
          <Menu isLazy autoSelect:true>
            <MenuButton className='bg-neutral-300/85 px-2 py-1 rounded-xl font-normal text-base hover:border-emerald-400 hover:border-b-[4px] hover:text-emerald-400 overflow-hidden'>
              {email?.split("@")[0]}
              <Icon as={GiClick} />
            </MenuButton>
            <MenuList fontWeight='semibold' letterSpacing='wide' fontSize='xs'>
              <MenuItem className='flex items-center gap-x-1'>
                <Icon as={MdOutlineSpaceDashboard} />
                Dashboard
              </MenuItem>
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

export default Nav;
