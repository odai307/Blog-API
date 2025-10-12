import './Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAuth } from '../utils/auth';
import { login } from '../utils/api/authAPI'


const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    // handleInput change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await login(formData.email, formData.password);

            // Save token and user to localStorage
            if (data.success) {
                const { token, user } = data;
                saveAuth(token, user);

                // check role and redirect
                if (user.role === 'admin') navigate('/');

                else setError('Access Denied Only admins can log in');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            console.error('Server error', err);
            setError(err.response?.data?.error || 'Server error');
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className='login-page'>
      <h2>Admin Login Page</h2>
      <form action="" onSubmit={handleSubmit} className='login-form'>
        <div>
            <label htmlFor="email">Email</label>
            <input 
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter Email'
                required
            />
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input 
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                placeholder='Enter Password'
                required
            />
        </div>

        {error && <p className='error'>{error}</p>}

        <button type='submit' disabled={loading}>
            {loading ? 'Logging in' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
