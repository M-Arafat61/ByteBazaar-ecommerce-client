import { axiosPublic } from "../hooks/useAxiosPublic";

export const createProductData = async (product, authToken) => {
  return await axiosPublic.post(`/v1/product`, product, {
    headers: {
      authToken,
    },
  });
};

export const getProductsByCount = async count => {
  return axiosPublic.get(`v1/products/${count}`);
};
