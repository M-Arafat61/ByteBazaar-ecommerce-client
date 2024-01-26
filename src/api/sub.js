import { axiosPublic } from "../hooks/useAxiosPublic";

export const getAllSubsData = async () => {
  return await axiosPublic.get("/v1/subs");
};

export const getSubData = async slug => {
  return await axiosPublic.get(`/v1/sub/${slug}`);
};

export const removeSubData = async (slug, authToken) => {
  return await axiosPublic.delete(`/v1/sub/${slug}`, {
    headers: {
      authToken,
    },
  });
};
export const updateSubData = async (slug, sub, authToken) => {
  return await axiosPublic.put(`/v1/sub/${slug}`, sub, {
    headers: {
      authToken,
    },
  });
};
export const createSubData = async (sub, authToken) => {
  return await axiosPublic.post(`/v1/sub`, sub, {
    headers: {
      authToken,
    },
  });
};
