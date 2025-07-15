import api from "./api";

// Create Razorpay order
export const createRazorpayOrder = async (amount) => {
  try {
    const response = await api.post("/payments/create-order", { amount });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
// Load Razorpay checkout script
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Verify payment
export const verifyPayment = async (paymentData) => {
  try {
    const response = await api.post("/payments/verify", paymentData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
