import api from "./axios";

// ✅ Create Goal
export const createGoal = async (data: any) => {
  try {
    const res = await api.post("/goals/create-goal", data);
    return res.data;
  } catch {
    return { success: false, message: "Failed to create goal" };
  }
};

// ✅ Get Current User Goal
export const getGoal = async () => {
  try {
    const res = await api.get("/goals/my-goal");
    return res.data;
  } catch {
    return { success: false, message: "Failed to fetch goal" };
  }
};

export const getGoalById = async (id: string) => {
  try {
    const res = await api.get(`/goals/get-goal/${id}`);
    return res.data;
  } catch {
    return { success: false, message: "Failed to fetch goal" };
  }
};
// ✅ Update Goal
export const updateGoal = async (id: string, data: any) => {
  try {
    const res = await api.put(`/goals/update-goal/${id}`, data);
    return res.data;
  } catch {
    return { success: false, message: "Failed to update goal" };
  }
};

// ✅ Delete Goal
export const deleteGoal = async (id: string) => {
  try {
    const res = await api.delete(`/goals/delete-goal/${id}`);
    return res.data;
  } catch {
    return { success: false, message: "Failed to delete goal" };
  }
};


export const updateWeight = async (data: any) => {
  try {
    const res = await api.patch("/goals/update-weight", data);
    return res.data;
  } catch {
    return { success: false, message: "Failed to update weight" };
  }
};