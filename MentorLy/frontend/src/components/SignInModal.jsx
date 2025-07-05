import React, { useState, Fragment } from "react";

import axiosInstance from "../api/axios";
import { toast } from 'react-toastify';

const SocialLoginButton = () => (
  <Fragment>
    <button className="bg-blue-600 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <span className="mr-2">📘</span>
      <span>Continue with Facebook</span>
    </button>
    <button className="bg-red-500 text-white py-3 px-6 rounded w-full flex items-center justify-center mt-4">
      <span className="mr-2">🔍</span>
      <span>Continue with Google</span>
    </button>
  </Fragment>
);

const ProfileImageInput = ({ onImageChange }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      onImageChange(file); // Pass file to parent
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <label className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-indigo-500">
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm bg-gray-100">
            Click to Upload
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          required
        />
      </label>
      <span className="text-sm text-gray-600">Profile Picture</span>
    </div>
  );
};



const SignInModal = ({ isOpen, setIsOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    profilePic: null
  });

  if (!isOpen) return null;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axiosInstance.post('/auth/login', formData);
      // Assuming backend sends token like: { token: "..." }
      localStorage.setItem('token', res.data.token);
      const userData = JSON.stringify(res.data.user)
      localStorage.setItem('user', userData)
      toast.success(`Login successful! welcome ${userData.firstname} ${userData.lastname}`);
      onClose()
      setFormData({ email: "", password: "" });
      window.location.reload();

    } catch (err) {
      console.error('Login failed:', err);
      if (err.response?.data?.msg) {
        setError(err.response.data.msg);
        toast.error(err.response.data.msg);
      } else {
        setError('Something went wrong. Try again.');
      }
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Password and confirm password don't match");
      return;
    }

    if (!registerData.profilePic) {
      toast.error("Please upload a profile picture");
      return;
    }

    const formData = new FormData();
    formData.append("firstname", registerData.firstname);
    formData.append("lastname", registerData.lastname);
    formData.append("email", registerData.email);
    formData.append("password", registerData.password);
    formData.append("confirmPassword", registerData.confirmPassword);
    formData.append("role", registerData.role);
    formData.append("profilePic", registerData.profilePic); // ✅ append File here

    try {
      const res = await axiosInstance.post('/auth/register', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem('token', res.data.token);
      const userData = res.data.user
      localStorage.setItem('user', JSON.stringify(userData))
      toast.success('Registration successful!');
      handleClose();
      setRegisterData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: null,
        role: "student",
      });
      window.location.reload();

    } catch (err) {
      console.error('Registration failed:', err);
      const msg = err.response?.data?.msg || "Something went wrong. Try again.";
      setError(msg);
      toast.error(msg);
    }
  };


  const handleClose = () => {
    // Reset forms and state when closing
    setIsRegistering(false);
    setFormData({ email: "", password: "" });
    setRegisterData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: null,
      role: "student"
    });

    // Handle both prop patterns - setIsOpen from Homepage, onClose from Navbar
    if (setIsOpen) {
      setIsOpen(false);
    } else if (onClose) {
      onClose();
    }
  };

  const switchToRegister = () => {
    setIsRegistering(true);
  };

  const switchToLogin = () => {
    setIsRegistering(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-full max-w-md mx-auto bg-white bg-opacity-30 backdrop-blur-xl text-indigo-900 rounded-2xl p-8 shadow-xl border border-white border-opacity-20 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-2 right-4 text-white text-xl font-bold hover:text-red-500 transition-colors duration-200"
        >
          ×
        </button>

        {!isRegistering ? (
          // Login Form
          <>
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Log In</h2>
            <div className="space-y-4 text-white">
              <div>
                <label className="block mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">Password</label>
                <input
                  type="password"
                  required
                  className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center mb-2">
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm">Remember me</label>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-800 hover:bg-indigo-900 py-3 rounded-lg font-semibold text-white transition"
              >
                Log In
              </button>
            </div>

            <button className="w-full mt-4 text-sm text-white hover:underline">
              Forgot your password?
            </button>

            <div className="relative mt-8">
              <hr className="border-white border-opacity-30" />
              <span className="absolute px-2 bg-white bg-opacity-20 text-white text-sm left-1/2 -translate-x-1/2 -top-3">
                or
              </span>
            </div>

            <SocialLoginButton />

            <div className="text-center mt-6">
              <p className="text-sm text-white/60">Don't have an account?</p>
              <button
                onClick={switchToRegister}
                className="font-medium text-white hover:underline"
              >
                Create account
              </button>
            </div>
          </>
        ) : (
          // Registration Form
          <>
            <h2 className="text-3xl font-bold mb-8 text-center text-white">Create Account</h2>
            <div className="space-y-4 text-white">
              <ProfileImageInput
                onImageChange={(file) =>
                  setRegisterData({ ...registerData, profilePic: file })
                }
              />
              <div className="grid grid-cols-2 gap-4">

                <div>

                  <label className="block mb-2 text-sm">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
                    placeholder="First name"
                    value={registerData.firstname}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, firstname: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
                    placeholder="Last name"
                    value={registerData.lastname}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, lastname: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Role</label>
                <select
                  className="w-full p-3 rounded-lg bg-white bg-opacity-20 text-white focus:outline-none border border-white border-opacity-30"
                  value={registerData.role}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, role: e.target.value })
                  }
                >
                  <option value="student" className="text-gray-900">Student</option>
                  <option value="teacher" className="text-gray-900">Teacher</option>
                  <option value="parent" className="text-gray-900">Parent</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm">Password</label>
                <input
                  type="password"
                  required
                  className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, password: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-2 text-sm">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="w-full p-3 rounded-lg bg-white bg-opacity-20 placeholder-white text-white focus:outline-none border border-white border-opacity-30"
                  placeholder="Confirm your password"
                  value={registerData.confirmPassword}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, confirmPassword: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center mb-2">
                <input type="checkbox" id="terms" className="mr-2" required />
                <label htmlFor="terms" className="text-sm">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <button
                onClick={handleRegisterSubmit}
                className="w-full bg-indigo-800 hover:bg-indigo-900 py-3 rounded-lg font-semibold text-white transition"
              >
                Create Account
              </button>
            </div>

            <div className="relative mt-8">
              <hr className="border-white border-opacity-30" />
              <span className="absolute px-2 bg-white bg-opacity-20 text-white text-sm left-1/2 -translate-x-1/2 -top-3">
                or
              </span>
            </div>

            <SocialLoginButton />

            <div className="text-center mt-6">
              <p className="text-sm text-white/60">Already have an account?</p>
              <button
                onClick={switchToLogin}
                className="font-medium text-white hover:underline"
              >
                Sign in
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SignInModal;