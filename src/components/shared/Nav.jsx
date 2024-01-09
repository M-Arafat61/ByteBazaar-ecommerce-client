import { Menu, MenuButton, MenuList, MenuItem, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import {
  RiHomeOfficeLine,
  RiShoppingBag2Line,
  RiShoppingCartFill,
  RiLoginCircleLine,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { FaUserShield } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useDispatch } from "react-redux";
import { userLogout } from "../../reducers/userReducer";

const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isActive = path => {
    return location.pathname == path ? { borderBottom: "2px solid blue" } : {};
  };
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(userLogout());
      })
      .catch(error => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className='flex text-lg justify-between shadow-md py-5'>
      <div className='flex gap-x-5'>
        <Menu>
          <Link
            to='/'
            className='flex items-center gap-x-1'
            style={isActive("/")}
          >
            <Icon as={RiHomeOfficeLine} />
            Home
          </Link>
        </Menu>
        <Menu>
          <Link to='/' className='flex items-center gap-x-1'>
            <Icon as={RiShoppingBag2Line} />
            Shop
          </Link>
        </Menu>
        <Menu>
          <Link to='/' className='flex items-center gap-x-1'>
            <Icon as={RiShoppingCartFill} />
            Cart
          </Link>
        </Menu>
      </div>
      <div className='flex gap-x-5'>
        <Menu>
          <Link
            to='/login'
            className='flex items-center gap-x-1'
            style={isActive("/login")}
          >
            <Icon as={RiLoginCircleLine} />
            Login
          </Link>
        </Menu>
        <Menu>
          <Link
            to='/register'
            className='flex items-center gap-x-1'
            style={isActive("/register")}
          >
            <Icon as={FaUserShield} />
            Register
          </Link>
        </Menu>
        <Menu isLazy>
          <MenuButton>Open menu</MenuButton>
          <MenuList>
            <MenuItem>Username</MenuItem>
            <MenuItem>Dashboard</MenuItem>
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
    </div>
  );
};

export default Nav;
