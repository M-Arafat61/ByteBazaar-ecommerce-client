import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@chakra-ui/react";
import {
  RiHomeOfficeLine,
  RiShoppingBag2Line,
  RiShoppingCartFill,
  RiLoginCircleLine,
} from "react-icons/ri";
import { FaUserShield } from "react-icons/fa";

const Nav = () => {
  const location = useLocation();
  const isActive = path => {
    return location.pathname == path ? { borderBottom: "2px solid blue" } : {};
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
            <MenuItem>Settings</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
