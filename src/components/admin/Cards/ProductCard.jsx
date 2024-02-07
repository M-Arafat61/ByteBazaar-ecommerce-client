/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import laptop from "../../../assets/defaultProduct.jpg";
import { Link } from "react-router-dom";

const ProductCard = ({ product, handleProductDelete }) => {
  const { title, description, price, subs, images, brand, slug } = product;

  return (
    <Card maxW='xs' height='md' className='' variant='outline'>
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

          <Flex gap={"2"}>
            <Text fontWeight='bold'>{brand} | </Text>
            {subs.map(sub => (
              <Text key={sub._id} fontWeight='semibold'>
                {sub.name}
              </Text>
            ))}
          </Flex>

          <Text color='blue.600' fontSize='xl'>
            Price ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='5'>
          <Link to={`/admin/product/${slug}`}>
            <Button variant='solid' colorScheme='blue'>
              <EditIcon className='mr-1' />
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => handleProductDelete(slug)}
            variant='solid'
            colorScheme='red'
          >
            <DeleteIcon className='mr-1' />
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
