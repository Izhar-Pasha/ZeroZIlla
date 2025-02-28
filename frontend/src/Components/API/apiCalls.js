import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

// Automatically attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token retrieved successfully:", token);
    } else {
      console.warn("Token is missing in localStorage!");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// User Registration
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/register", userData);
    return response.data;
  } catch (error) {
    console.error(
      "Error Registering User:",
      error.response?.data || error.message
    );
    alert(error.response?.data?.message || "Registration failed");
  }
};

// User Login
export const loginUser = async (loginData) => {
  try {
    const response = await API.post("/login", loginData);
    const token = response.data.token;
    localStorage.setItem("authToken", token);
    console.log("Token stored:", token);
    return response.data;
  } catch (error) {
    console.error("Error logging User:", error.response?.data || error.message);
    alert(error.response?.data?.message || "Login failed");
  }
};

// Create Agency
export const newAgency = async (agencyData) => {
  try {
    const response = await API.post("/CreateAgency", agencyData);
    return response.data;
  } catch (error) {
    console.error(
      "Error Creating Agency:",
      error.response?.data || error.message
    );
    alert(error.response?.data?.message || "Failed to create agency");
  }
};

// Fetch single client by ID
export const getClientById = async (clientId) => {
  try {
    const response = await API.get(`/Clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error Fetching Client:",
      error.response?.data || error.message
    );
  }
};

// Update client
export const updateClient = async (clientId, clientData) => {
  try {
    const response = await API.put(`/updateClient/${clientId}`, clientData);
    return response.data;
  } catch (error) {
    console.error(
      "Error Updating Client:",
      error.response?.data || error.message
    );
    alert(error.response?.data?.message || "Failed to update client");
  }
};
// Fetch All Agencies
export const getAgency = async () => {
  try {
    const response = await API.get("/AllAgency");
    return response.data;
  } catch (error) {
    console.error(
      "Error Fetching Agencies:",
      error.response?.data || error.message
    );
    alert(error.response?.data?.message || "Failed to fetch agencies");
  }
};

// Fetch All Clients
export const getClients = async () => {
  try {
    const response = await API.get("/AllClients");
    return response.data;
  } catch (error) {
    console.error(
      "Error Fetching Clients:",
      error.response?.data || error.message
    );
    alert(error.response?.data?.message || "Failed to fetch agencies");
  }
};

// Fetch Top Client
export const getTopClient = async () => {
  try {
    const response = await API.get("/topclient");
    console.log("respose:", response);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to get top clients:",
      error.response?.data || error.message
    );
    alert(error.response?.data?.message || "Failed to get top clients");
  }
};
