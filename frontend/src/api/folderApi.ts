import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllFolders = async () => {
  return axios.get(`${API_URL}/folders`);
};

export const getSubfolders = async (parentId: number) => {
  return axios.get(`${API_URL}/folders/${parentId}`);
};

export const createFolder = async (data: {
  name: string;
  parentId?: number;
}) => {
  return axios.post(`${API_URL}/folders`, data);
};

export const deleteFolder = async (id: number) => {
  // console.log(id);
  return axios.delete(`${API_URL}/folders/${id}`);
};

export const createFile = async (data: {
  name: string;
  extension?: string;
  folderId?: number;
}) => {
  // console.log(data);
  return axios.post(`${API_URL}/files`, data);
};

export const deleteFile = async (id: number) => {
  // console.log(id);
  return axios.delete(`${API_URL}/files/${id}`);
};
