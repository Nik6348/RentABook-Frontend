import { axiosInstance } from "./axiosConfig";

export const sendTokenToBackend = async (idToken) => {
  try {
    const response = await axiosInstance.post(
      "/auth",
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );
    console.log("User authenticated and stored in DB:", response.data);
  } catch (err) {
    console.log(`Failed to authenticate user: ${err.message} `);
  }
};
