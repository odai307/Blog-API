const API_BASE_URL = 'http://localhost:3000/api';
import axios from 'axios';


const headers = {
    'Accept': 'application/json',
  'Content-Type': 'application/json'
}


// Fetch all public posts
export const getAllPublishedPosts = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/published`, { headers});
        return response.data;
    } catch (err) {
        console.error('Error getting all published posts', err);
        const message = err.response?.data?.error;
        return { success: false, error: message || 'Failed to load posts'}
    }
}

export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`, { headers });
        return response.data;
    } catch (err) {
        console.error('Error getting post', err);
        const message = err.response?.data?.error;
        return { success: false, error: message || 'Failed to load posts'}
    }
}


