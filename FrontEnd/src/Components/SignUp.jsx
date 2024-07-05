import React, { useState } from 'react';
import Navbar from './LandingPage/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [fields, setFields] = useState("");
  const [role, setRole] = useState("student");
  const [errorMessages, setErrorMessages] = useState({});

  const validateForm = () => {
    const errors = {};
    if (username.length <= 6) errors.username = "Username must be longer than 6 characters";
    if (password.length <= 6) errors.password = "Password must be longer than 6 characters";
    if (!gender) errors.gender = "Gender is required";
    if (phone.length <= 7) errors.phone = "Phone number must be longer than 7 digits";

    return errors;
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setErrorMessages({});
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/authentication/register', {
        username,
        email,
        password,
        gender,
        phone,
        fields,
        role
      });

      setErrorMessages({});
      console.log('Registration successful!', response.data);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = {};
        error.response.data.errors.forEach(err => {
          errors[err.param] = err.msg;
        });
        setErrorMessages(errors);
      } else if (error.response && error.response.data && error.response.data.message) {
        setErrorMessages({ general: error.response.data.message });
      } else {
        setErrorMessages({ general: 'Failed to register. Please try again.' });
      }
      console.error('Failed to register:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md"></div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
            <form className="space-y-6" onSubmit={handleRegisterClick}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errorMessages.username ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errorMessages.username && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.username}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errorMessages.email ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errorMessages.email && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errorMessages.password ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errorMessages.password && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.password}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    onChange={(e) => setGender(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errorMessages.gender ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  >
                    <option value="">Select gender</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                  </select>
                  {errorMessages.gender && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.gender}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <div className="mt-1">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errorMessages.phone ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  />
                  {errorMessages.phone && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="fields" className="block text-sm font-medium text-gray-700">
                  Fields
                </label>
                <div className="mt-1">
                  <select
                    id="fields"
                    name="fields"
                    onChange={(e) => setFields(e.target.value)}
                    disabled={role === "instructor"}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errorMessages.fields ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                      role === "instructor" ? "bg-gray-200" : ""
                    }`}
                  >
                    <option value="">Select field</option>
                    <option value="Math">Math</option>
                    <option value="Economy">Economy</option>
                    <option value="Management">Management</option>
                    <option value="Science">Science</option>
                    <option value="History&Geography">History & Geography</option>
                    <option value="Art&Literature">Art & Literature</option>
                  </select>
                  {errorMessages.fields && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.fields}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="mt-1">
                  <select
                    id="role"
                    name="role"
                    onChange={(e) => setRole(e.target.value)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      errorMessages.role ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                  </select>
                  {errorMessages.role && (
                    <p className="text-red-500 text-sm mt-1">{errorMessages.role}</p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
              {errorMessages.general && (
                <div className="text-red-500 mt-4 text-sm">{errorMessages.general}</div>
              )}
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
