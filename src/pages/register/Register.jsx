import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";

const Register = () => {
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    name: "",
    email: "",
    department: "",
    registrationNo: "",
    session: "",
    hall: "",
    password: "",
    profilePic: null,
  });
  const [fieldErrors, setFieldErrors] = useState({
    userId: "",
    username: "",
    name: "",
    email: "",
    department: "",
    registrationNo: "",
    session: "",
    hall: "",
    password: "",
  });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFieldErrors({
      ...fieldErrors,
      [name]: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePic: file,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    const emptyFields = Object.entries(formData).some(([key, value]) => {
      if (value === "") {
        setFieldErrors({
          ...fieldErrors,
          [key]: "Please fill in this field.",
        });
        return true;
      }
      return false;
    });

   if (!emptyFields) {
      // Your logic to handle form submission goes here
      window.alert("Registration Successful!");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>DUconnect</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
            />
            {fieldErrors.userId && (
              <p className="error">{fieldErrors.userId}</p>
            )}
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {fieldErrors.username && (
              <p className="error">{fieldErrors.username}</p>
            )}
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {fieldErrors.name && (
              <p className="error">{fieldErrors.name}</p>
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {fieldErrors.email && (
              <p className="error">{fieldErrors.email}</p>
            )}
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="IIT">IIT</option>
              <option value="Pharmacy">Pharmacy</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Math">Math</option>
              <option value="Applied Physics">Applied Physics</option>
            </select>
            {fieldErrors.department && (
              <p className="error">{fieldErrors.department}</p>
            )}
            <input
              type="text"
              placeholder="Registration No"
              name="registrationNo"
              value={formData.registrationNo}
              onChange={handleChange}
            />
            {fieldErrors.registrationNo && (
              <p className="error">{fieldErrors.registrationNo}</p>
            )}
            <input
              type="text"
              placeholder="Session"
              name="session"
              value={formData.session}
              onChange={handleChange}
            />
            {fieldErrors.session && (
              <p className="error">{fieldErrors.session}</p>
            )}
            <select
              name="hall"
              value={formData.hall}
              onChange={handleChange}
            >
              <option value="">Select Hall</option>
              <option value="IH">IH</option>
              <option value="SH">SH</option>
              <option value="FH">FH</option>
              <option value="SM">SM</option>
              <option value="JN">JN</option>
              <option value="HJ">HJ</option>
              <option value="KL">KL</option>
              <option value="SK">SK</option>
            </select>
            {fieldErrors.hall && (
              <p className="error">{fieldErrors.hall}</p>
            )}
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {fieldErrors.password && (
              <p className="error">{fieldErrors.password}</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="profilePic"
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
      {showSuccessPopup && (
        <div className="success-popup">
          <p></p>
        </div>
      )}
    </div>
  );
};

export default Register;
