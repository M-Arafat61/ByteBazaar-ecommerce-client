import { axiosPublic } from "../hooks/useAxiosPublic";

export const createOrUpdateUser = async authToken => {
  return await axiosPublic.post(
    `/create-or-update-user`,
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
