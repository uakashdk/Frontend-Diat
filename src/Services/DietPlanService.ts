import api from "./axios";


export const createMealPlan = async (data: any) => {
  try {
     const response = await api.post("/diets/create-diets", data);
  return response.data;
  } catch (error) {
    return { success: false, message: "Failed to create meal plan" };
  }
};

export const getAllMealPlans = async () => {
  try {
    const response = await api.get("/diets/get-all-diets");
    return response.data;
  }
    catch (error) {
    return { success: false, message: "Failed to fetch meal plans" };
    }
};


export const getMealPlan = async (userId: string) => {
  try {
    const response = await api.get(`/diets/get-diets/${userId}`);
    return response.data;
  }
    catch (error) { 
    return { success: false, message: "Failed to fetch meal plan" };
    }   
};

export const updateMealPlan = async (planId: string, data: any) => {
  try {
    const response = await api.put(`/diets/update-diets/${planId}`, data);
    return response.data;
  } catch (error) {
    return { success: false, message: "Failed to update meal plan" };
  }
};

export const deleteMealPlan = async (planId: string) => {
  try {
    const response = await api.delete(`/diets/delete-diets/${planId}`);
    return response.data;
  } catch (error) {
    return { success: false, message: "Failed to delete meal plan" };
  }
};

