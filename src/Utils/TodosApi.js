import axios from "axios";

const getAllTodos = (url) => axios.get(url);

const getTodoById = (url, id) => axios.get(`${url}/${id}`);

const getTodoByUserId = (url, userId) => axios.get(`${url}?userId=${userId}`);

const updateTodo = (url, id, data) => axios.put(`${url}/${id}`, data);

const deleteTodo = (url, id) => axios.delete(`${url}/${id}`);

const addTodo = (url, obj) => axios.post(url, obj);

export {
    getAllTodos,
    getTodoById,
    getTodoByUserId,
    updateTodo,
    deleteTodo,
    addTodo
}