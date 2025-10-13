import getAuthHeader from "./getAuthHeader";
import { API_BASE_URL } from "./getAuthHeader";
import axios from "axios";

export const getCommentsByPostId = async (postId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/comments/post/${postId}`, {
            headers: getAuthHeader(),
        });
        return response.data;

    } catch (err) {
        console.error('Error getting comments by post', err);
        throw err;
    }
}


export const deleteComment = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/comments/${id}`, {
            headers: getAuthHeader()
        });
        return response.data;
        
    } catch (err) {
        console.error('Error deleting comment', err);
        throw err;
    }
}