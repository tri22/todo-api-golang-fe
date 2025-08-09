import { axiosInstance } from "./axiosInstance";



export const createTask=(creationData)=>{
    return axiosInstance.post(`/tasks/`,creationData);
}

export const getTaskById = (id) => {
    return axiosInstance.get(`/tasks/${id}`);
};

export const getAllTask=()=>{
    return axiosInstance.get(`/tasks/`);
}

export const updateTask=(id, updateData)=>{
    return axiosInstance.put(`/tasks/${id}`,updateData);
}

export const deleteTask=(id)=>{
    return axiosInstance.delete(`/tasks/${id}`);
}