import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    roll: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isRegister) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      localStorage.setItem("user", JSON.stringify(formData));
      alert("Registration successful! Please login.");
      setIsRegister(false);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
        alert("Login successful!");
        navigate("/home");
      } else {
        alert("Invalid credentials!");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side - Login/Register Form */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-md">
        <h1 className="text-2xl font-semibold mb-6">
          {isRegister ? "Create an Account" : "Welcome Back, Please Login"}
        </h1>

        <form className="w-full" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded mb-3"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="roll"
                placeholder="Roll Number"
                className="w-full p-2 border border-gray-300 rounded mb-3"
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded mb-3"
            onChange={handleChange}
            required
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-2 border border-gray-300 rounded mb-3"
              onChange={handleChange}
              required
            />
          )}

          <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-lg mb-3 hover:opacity-90">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <button
          className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account? Login" : "New user? Sign up"}
        </button>
      </div>

      {/* Right Side - Design Section */}
      <div className="w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 flex flex-col justify-center items-center text-white p-10">
        <h2 className="text-2xl font-semibold mb-4">How it works?</h2>
        <p className="text-center max-w-md mb-4">
          Create your free search profile and let us know your wishes for the perfect apartment.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
