import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const UserNav = () => {
  return (
    <Box
      className='flex flex-col space-y-2 pl-2'
      fontSize={"lg"}
      fontWeight={"semibold"}
    >
      <NavLink
        to='/user/history'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        History
      </NavLink>
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
      <NavLink
        to='/user/wishlist'
        className={({ isActive }) =>
          `${
            isActive
              ? "text-emerald-400 underline px-3 py-1"
              : "hover:bg-neutral-300/85  rounded-full px-3 py-1"
          }`
        }
      >
        Wishlist
      </NavLink>
    </Box>
  );
};

export default UserNav;
