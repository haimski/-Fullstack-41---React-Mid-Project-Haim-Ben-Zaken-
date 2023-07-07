import axios from "axios";

const getAllUsers = (url) => axios.get(url);

const getAllUsersById = (url, id) => axios.get(`${url}/${id}`);

const updateUser = (url, id, data) => axios.put(`${url}/${id}`, data);

const deleteUser = (url, id) => axios.delete(`${url}/${id}`);

const addUser = (url, obj) => axios.post(url, obj);

export {
    getAllUsers,
    getAllUsersById,
    updateUser,
    deleteUser
}