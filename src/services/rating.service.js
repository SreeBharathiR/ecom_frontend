import api from "./api";

// Add rating
export const addRating = async (ratingData) => {
  try {
    const response = await api.post("/ratings", ratingData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Get order ratings
export const getOrderRatings = async (orderId) => {
  try {
    const response = await api.get(`/ratings/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
