import axios from "axios";

const getAllPosts = (url) => axios.get(url);

const getPostById = (url, id) => axios.get(`${url}/${id}`);

const getPostByUserId = (url, userId) => axios.get(`${url}?userId=${userId}`);

const updatePost = (url, id, data) => axios.put(`${url}/${id}`, data);

const deletePost = (url, id) => axios.delete(`${url}/${id}`);

const addPost = (url, obj) => axios.post(url, obj);

export {
    getAllPosts,
    getPostById,
    getPostByUserId,
    updatePost,
    deletePost,
    addPost
}