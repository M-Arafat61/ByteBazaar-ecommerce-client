import { axiosPublic } from "../hooks/useAxiosPublic";

export const createProductData = async (product, authToken) => {
  return await axiosPublic.post(`/v1/product`, product, {
    headers: {
      authToken,
    },
  });
};
