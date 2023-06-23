import axios from "axios";

const getAllTasks = (url) => axios.get(url);

const getTaskById = (url, id) => axios.get(`${url}/${id}`);

const updateTask = (url, id) => axios.put(`${url}/${id}`);

const deleteTask = (url, id) => axios.delete(`${url}/${id}`);

export {
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}