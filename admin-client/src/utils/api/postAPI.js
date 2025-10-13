import getAuthHeader from "./getAuthHeader";
import { API_BASE_URL } from "./getAuthHeader";
import axios from "axios";

export const createPost = async (title, content, published) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/posts`, { title, content, published}, {
            headers: getAuthHeader(),
        });
        return response.data;

    } catch (err) {
        console.error('Error creating post', err);
        throw err;
    }
}


export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts`, {
            headers: getAuthHeader()
        });
        return response.data;
        
    } catch (err) {
        console.error('Error getting all posts', err);
        throw err;
    }
}

export const getAllPublishedPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/published`, {
            headers: getAuthHeader()
        });
        return response.data;
        
    } catch (err) {
        console.error('Error getting all published posts', err);
        throw err;
    }
}

export const getAllUnpublishedPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/unpublished`, {
            headers: getAuthHeader()
        });
        return response.data;
        
    } catch (err) {
        console.error('Error getting all unpublished posts', err);
        throw err;
    }
}

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`, {
            headers: getAuthHeader(),
        });
        return response.data;
        
    } catch (err) {
        console.error('Error getting post by id', err);
        throw err;
    }
}


export const updatePost = async (id, title, content, published) => {
    try {
         const response = await axios.put(`${API_BASE_URL}/posts/${id}`, { title, content, published }, {
            headers: getAuthHeader(),
        });
        return response.data
        
    } catch (err) {
        console.error('Error updating post', err);
        throw err;
    }
}


export const togglePublishPost = async (id, published) => {
    try {
         const response = await axios.patch(`${API_BASE_URL}/posts/${id}/publish`, { published }, {
            headers: getAuthHeader(),
        });
        return response.data;

    } catch (err) {
        console.error('Error updating post', err);
        throw err;
    }
}


export const deletePost = async (id) => {
     try {
         const response = await axios.delete(`${API_BASE_URL}/posts/${id}`, {
            headers: getAuthHeader()
        });
        return response.data;

    } catch (err) {
        console.error('Error updating post', err);
        throw err;
    }
}