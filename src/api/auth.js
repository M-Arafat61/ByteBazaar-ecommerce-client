import { axiosPublic } from "../hooks/useAxiosPublic";

export const createOrUpdateUser = async authToken => {
  return await axiosPublic.post(
    `/v1/create-or-update-user`,
    {},
    {
      withCredentials: true,
      headers: {
        // Authorization: `Bearer ${authToken}`,
        authToken,
      },
    }
  );
};
export const dbCurrentUser = async authToken => {
  return await axiosPublic.post(
    `/v1/current-user`,
    {},
    {
      withCredentials: true,
      headers: {
        authToken,
      },
    }
  );
};
export const dbCurrentAdmin = async authToken => {
  return await axiosPublic.post(
    `/v1/current-admin`,
    {},
    {
      withCredentials: true,
      headers: {
        authToken,
      },
    }
  );
};
