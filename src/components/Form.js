import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaBirthdayCake,
  FaMale,
  FaFemale,
  FaFlag,
  FaBriefcase,
  FaHashtag,
  FaUniversity,
  FaCity,
} from "react-icons/fa";
import logo from "../Assets/nesalogo.png";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    country: "",
    occupation: "",
    zipCode: "",
    education: "",
    city: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.length >= 3
          ? ""
          : "Full Name must be at least 3 characters long.";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format.";
      case "phoneNumber":
        return /^(072|073|078|079)\d{7}$/.test(value)
          ? ""
          : "Phone number must be 10 digits starting with 072, 073, 078, or 079.";
      case "zipCode":
        return /^\d{5}$/.test(value)
          ? ""
          : "ZIP Code must be exactly 5 digits.";
      case "dateOfBirth":
        return value ? "" : "Date of Birth is required.";
      case "gender":
        return value ? "" : "Please select a gender.";
      case "country":
        return value.length >= 2
          ? ""
          : "Country must be at least 2 characters.";
      case "occupation":
        return value.length >= 2
          ? ""
          : "Occupation must be at least 2 characters.";
      case "education":
        return value.length >= 2
          ? ""
          : "Education must be at least 2 characters.";
      case "city":
        return value.length >= 2 ? "" : "City must be at least 2 characters.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const isFormValid = () =>
    Object.values(errors).every((error) => !error) &&
    Object.values(formData).every((field) => field);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast.error("Please fix the validation errors before submitting.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const location = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve({ latitude, longitude });
            },
            (error) => reject(error)
          );
        } else {
          reject(new Error("Geolocation is not supported by this browser."));
        }
      });

      const address = await fetchAddress(
        location.latitude,
        location.longitude
      );

      const dataToSubmit = { ...formData, address };

      const response = await axios.post(
        "http://localhost:5000/api/surveys",
        dataToSubmit
      );

      toast.success("Submitted Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      console.log("Survey Submitted", response.data);
    } catch (error) {
      toast.error("Error submitting the survey.", {
        position: "top-right",
        autoClose: 3000,
      });

      console.error(
        "Error submitting survey:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=8e18b06fd85c4293b42c735d8b55328c`
      );
      return response.data.results[0]?.formatted || "Unknown Address";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown Address";
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex items-center justify-center py-10">
      <ToastContainer />
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg p-8">
        <img
          src={logo}
          alt="Logo"
          className="w-32 mx-auto mb-6 rounded-full shadow-md"
        />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md"
        >
          {[
            { id: "fullName", label: "Full Name", icon: <FaUser /> },
            { id: "email", label: "Email", icon: <FaEnvelope /> },
            { id: "phoneNumber", label: "Phone", icon: <FaPhoneAlt /> },
            { id: "dateOfBirth", label: "Date of Birth", icon: <FaBirthdayCake /> },
            { id: "country", label: "Country", icon: <FaFlag /> },
            { id: "occupation", label: "Occupation", icon: <FaBriefcase /> },
            { id: "zipCode", label: "ZIP Code", icon: <FaHashtag /> },
            { id: "education", label: "Education", icon: <FaUniversity /> },
            { id: "city", label: "City", icon: <FaCity /> },
          ].map(({ id, label, icon }) => (
            <div key={id}>
              <label htmlFor={id} className="block font-medium mb-1">
                {icon} {label}
              </label>
              <input
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors[id] ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
              />
              {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
            </div>
          ))}
          <div>
          <FaMale className=" inline-block mr-1" />
            <label htmlFor="gender" className="block font-medium mb-1">
              Gender
            </label>
            
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
