import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../../public/ecom-logo.png";
import { CiShop } from "react-icons/ci";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaPerbyte } from "react-icons/fa";

const DrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button ref={btnRef} colorScheme='white' onClick={onOpen}>
        <IoMenu className='text-3xl text-emerald-400' />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody onClick={onClose}>
            <Link className='w-3/4 flex mx-auto justify-center' to='/'>
              <img className='w-1/2' src={logo} alt='logo' />
            </Link>
            <div className='space-y-2 mt-14'>
              <Link className='border border-dashed flex  items-center gap-x-1 hover:text-emerald-400  hover:bg-emerald-700/85 px-3 rounded-full py-1'>
                <Icon className='text-xl' as={FaPerbyte} />
                ByteBazaar
              </Link>
              <Link
                to='/shop'
                className='border border-dashed flex  items-center gap-x-1 hover:text-emerald-400  hover:bg-emerald-700/85 px-3 rounded-full py-1'
              >
                <Icon as={CiShop} />
                Shop
              </Link>

              <Link
                to='/cart'
                className='border border-dashed flex  items-center hover:text-emerald-400  hover:bg-emerald-700/85 gap-x-1  px-3 rounded-full py-1'
              >
                <Icon as={RiShoppingCartFill} />
                Cart
              </Link>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
