import { Box } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

const AdminNav = () => {
  return (
    <Box
      className='flex flex-col space-y-2 pl-2 md:pl-5'
      fontSize={"lg"}
      fontWeight={"semibold"}
    >
      <ChakraLink as={ReactRouterLink} to='/admin/dashboard'>
        Admin Dashboard
      </ChakraLink>
    </Box>
  );
};

export default AdminNav;
