const getAuthHeader = () => {
    const token = localStorage.getItem('token');

    return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

const API_BASE_URL = 'http://localhost:3000/api';



export default getAuthHeader;
export { API_BASE_URL };
