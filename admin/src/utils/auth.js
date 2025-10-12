
export const saveAuth = (token, user) => {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (err) {
    console.error('Error saving auth data:', err);
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem('token') || null;
  } catch (err) {
    console.error('Error reading token:', err);
    return null;
  }
};

export const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error('Error reading user data:', err);
    return null;
  }
};

export const isAuthenticated = () => {
  try {
    return !!getToken();
  } catch {
    return false;
  }
};

export const isAdmin = () => {
  try {
    const user = getUser();
    return user && user.role === 'admin';
  } catch {
    return false;
  }
};

export const logout = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
     window.location.href = '/login'; // redirect to login page
  } catch (err) {
    console.error('Error during logout:', err);
  }
};
