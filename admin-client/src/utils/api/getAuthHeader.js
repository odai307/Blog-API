const getAuthHeader = () => {
    const token = localStorage.getItem('token');

    return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// const API_BASE_URL = 'http://localhost:3000/api';
// const API_BASE_URL = 'https://blog-api-chms.onrender.com/api';
const API_BASE_URL = import.meta.env.VITE_API_URL;




export default getAuthHeader;
export { API_BASE_URL };
