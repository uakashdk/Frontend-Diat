import api from "./axios";

// 🔥 Helper to extract error message
const handleError = (err: any, defaultMsg: string) => {
  const message =
    err?.response?.data?.message || defaultMsg;
  throw new Error(message);
};

// 🔥 GET PROFILE
export const getProfile = async () => {
  try {
    const res = await api.get("/admin/profile");

    // ✅ Return only actual data (clean)
    return res.data.data;

  } catch (err: any) {
    handleError(err, "Failed to fetch profile");
  }
};

// 🔥 UPDATE PROFILE
export const updateProfile = async (
  profileData: Record<string, unknown>
) => {
  try {
    const res = await api.put("/admin/update-profile", profileData);

    return {
      message: res.data.message,
      data: res.data.data,
    };

  } catch (err: any) {
    handleError(err, "Failed to update profile");
  }
};