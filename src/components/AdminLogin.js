import React, { useState } from 'react';
import { FaKey, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../Assets/nesalogo.png';
import axios from 'axios';

const AdminLogin = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://surveybackend.netlify.app/api/login', loginData);
      toast.success('Login Successful! Redirecting to dashboard...', {
        position: 'top-right',
        autoClose: 3000,
      });

      // Wait for the toast to finish, then navigate
      setTimeout(() => {
        navigate('/dashboard'); // Replace '/dashboard' with the actual path of your dashboard
      }, 3000);
    } catch (error) {
      toast.error('Error logging in. Please check your credentials.', {
        position: 'top-right',
        autoClose: 3000,
      });
      console.error('Error logging in:', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="font-Roboto text-sky-500 min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <ToastContainer />
      <img src={logo} alt="Logo" className="h-20 mb-6 rounded-full" />
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleAdminSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block font-medium flex items-center space-x-2">
              <FaUserTie />
              <span>Username</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={loginData.username}
              onChange={handleAdminChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block font-medium flex items-center space-x-2">
              <FaKey />
              <span>Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleAdminChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
          <button
             type="submit"
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg transition-all hover:bg-blue-600 hover:shadow-lg focus:ring focus:ring-blue-400"
            >
            Submit
           </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
