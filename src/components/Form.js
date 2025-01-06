import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaBirthdayCake,
  FaMale,
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

  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryNames = response.data.map((country) => country.name.common);
        setCountries(countryNames.sort());
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

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
        return value ? "" : "Please select a country.";
      case "occupation":
        return value.length >= 2
          ? ""
          : "Occupation must be at least 2 characters.";
      case "education":
        return value ? "" : "Please select your education level.";
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
      const response = await axios.post("http://localhost:5000/api/surveys", formData);
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
          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">
              <FaUser className="inline-block mr-1" /> Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full px-4 py-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">
              <FaEnvelope className="inline-block mr-1" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium mb-1">
              <FaPhoneAlt className="inline-block mr-1" /> Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-4 py-2 border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block font-medium mb-1">
              <FaBirthdayCake className="inline-block mr-1" /> Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.dateOfBirth ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium mb-1">
              <FaMale className="inline-block mr-1" /> Gender
            </label>
            <select
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
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="block font-medium mb-1">
              <FaFlag className="inline-block mr-1" /> Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.country ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            >
              <option value="">Select a Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
          </div>

          {/* Occupation */}
          <div>
            <label className="block font-medium mb-1">
              <FaBriefcase className="inline-block mr-1" /> Occupation
            </label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Enter your occupation"
              className={`w-full px-4 py-2 border ${
                errors.occupation ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.occupation && (
              <p className="text-red-500 text-sm">{errors.occupation}</p>
            )}
          </div>

          {/* ZIP Code */}
          <div>
            <label className="block font-medium mb-1">
              <FaHashtag className="inline-block mr-1" /> ZIP Code
            </label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              placeholder="Enter your ZIP Code"
              className={`w-full px-4 py-2 border ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.zipCode && <p className="text-red-500 text-sm">{errors.zipCode}</p>}
          </div>

          {/* Education Level */}
          <div>
            <label className="block font-medium mb-1">
              <FaUniversity className="inline-block mr-1" /> Education Level
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.education ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            >
              <option value="">Select Education Level</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
            {errors.education && (
              <p className="text-red-500 text-sm">{errors.education}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block font-medium mb-1">
              <FaCity className="inline-block mr-1" /> City
              </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter your City"
              className={`w-full px-4 py-2 border ${
                errors.zipCode ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
            />
            {errors.city && (<p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div>
          </div>
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
          <div className="col-span-1 md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
