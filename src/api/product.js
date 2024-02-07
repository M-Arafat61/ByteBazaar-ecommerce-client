import { axiosPublic } from "../hooks/useAxiosPublic";

export const createProductData = async (product, authToken) => {
  return await axiosPublic.post(`/v1/product`, product, {
    headers: {
      authToken,
    },
    withCredentials: true,
  });
};

export const getProductsByCount = async count => {
  return axiosPublic.get(`v1/products/${count}`);
};

export const deleteProduct = async (slug, authToken) => {
  return await axiosPublic.delete(`/v1/product/${slug}`, {
    headers: {
      authToken,
    },
    withCredentials: true,
  });
};

export const getSingleProduct = async slug => {
  return await axiosPublic.get(`/v1/product/${slug}`);
};
