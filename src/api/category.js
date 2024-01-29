import { axiosPublic } from "../hooks/useAxiosPublic";

export const getAllCategoriesData = async () => {
  return await axiosPublic.get("/v1/categories");
};

export const getCategoryData = async slug => {
  return await axiosPublic.get(`/v1/category/${slug}`);
};

export const removeCategoryData = async (slug, authToken) => {
  return await axiosPublic.delete(`/v1/category/${slug}`, {
    headers: {
      authToken,
    },
  });
};
export const updateCategoryData = async (slug, category, authToken) => {
  return await axiosPublic.put(`/v1/category/${slug}`, category, {
    headers: {
      authToken,
    },
  });
};
export const createCategoryData = async (category, authToken) => {
  return await axiosPublic.post(`/v1/category`, category, {
    headers: {
      authToken,
    },
  });
};
export const getCategorySubsData = async id => {
  return await axiosPublic.get(`/v1/category/subs/${id}`);
};
