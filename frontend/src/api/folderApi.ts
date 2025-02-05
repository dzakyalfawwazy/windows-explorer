import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllFolders = async () => {
  return axios.get(`${API_URL}/folders`);
};

export const getSubfolders = async (parentId: number) => {
  return axios.get(`${API_URL}/folders/${parentId}`);
};
