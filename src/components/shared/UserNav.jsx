import { Box } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const UserNav = () => {
  return (
    <Box
      className='flex flex-col space-y-2 pl-2 md:pl-5'
      fontSize={"lg"}
      fontWeight={"semibold"}
    >
      <ChakraLink as={ReactRouterLink} to='/user/history'>
        History
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/user/password'>
        Password
      </ChakraLink>
      <ChakraLink as={ReactRouterLink} to='/user/wishlist'>
        Wishlist
      </ChakraLink>
    </Box>
  );
};

export default UserNav;
