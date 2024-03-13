/* eslint-disable react/prop-types */

import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const LoaderSkeleton = ({ status }) => {
  if (status === "loading" || status === "error") {
    return (
      <Box padding='6' boxShadow='lg' bg='white'>
        <SkeletonCircle height={20} width={40} rounded='none' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    );
  }
};

export default LoaderSkeleton;
