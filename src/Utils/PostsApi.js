import axios from "axios";

const getAllPosts = (url) => axios.get(url);

const getPostById = (url, id) => axios.get(`${url}/${id}`);

const updatePost = (url, id) => axios.put(`${url}/${id}`);

const deletePost = (url, id) => axios.delete(`${url}/${id}`);

export {
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
}