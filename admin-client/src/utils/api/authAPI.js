import getAuthHeader from "./getAuthHeader";
import { API_BASE_URL } from "./getAuthHeader";
import axios from 'axios';


export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password
        })
        return response.data

    } catch (err) {
        console.error('Error logging in', err);
        throw err;
    }
}


export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
            headers: getAuthHeader()
        });
        
        return response.data;
    } catch (err) {
        console.error('Error getting current user', err);
        throw err;
    }
}