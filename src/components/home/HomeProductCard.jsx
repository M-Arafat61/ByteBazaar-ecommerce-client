/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { ViewIcon } from "@chakra-ui/icons";
import { FaCartPlus } from "react-icons/fa";

import laptop from "../../assets/defaultProduct.jpg";
import { Link } from "react-router-dom";
import LoaderSkeleton from "../shared/LoaderSkeleton";

const HomeProductCard = ({ status, product }) => {
  //   console.log(product);
  const { title, description, images, brand, slug } = product;

  return (
    <>
      <LoaderSkeleton status={status} />
      {status === "success" && (
        <Card maxW='sm' height='md' className='' variant='outline'>
          <CardBody>
            <Swiper
              pagination={{
                type: "fraction",
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className='mySwiper'
              style={{ height: "auto" }}
            >
              {images.length === 0 && (
                <SwiperSlide>
                  <Image
                    src={laptop}
                    className='w-full h-full object-cover'
                    alt='Default product image'
                    borderRadius='lg'
                  />
                </SwiperSlide>
              )}
              {images.map(image => (
                <SwiperSlide key={image.public_id}>
                  <Image
                    src={image.url}
                    className='w-[400px] h-[180px]'
                    objectFit='cover'
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Stack mt='4' spacing='1'>
              <Heading size='md'>{title.substring(0, 20)}</Heading>
              <Text>{description.substring(0, 20)}....</Text>

              <Text fontWeight='bold'>Brand : {brand}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Box className='flex justify-between items-center mx-auto w-full'>
              <Link
                to={`/product/${slug}`}
                className='flex flex-col items-center gap-y-1'
              >
                <ViewIcon boxSize={6} color='teal' />
                <Text>View Product</Text>
              </Link>
              <Divider orientation='vertical' />
              <Link className='flex flex-col items-center gap-y-1'>
                <Icon as={FaCartPlus} boxSize={6} color='teal' />
                <Text>Add to Cart</Text>
              </Link>
            </Box>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default HomeProductCard;
