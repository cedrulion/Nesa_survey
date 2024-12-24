import React, { useState } from "react";
import axios from "axios";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      // Replace with your geocoding API
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=8e18b06fd85c4293b42c735d8b55328c`
      );
      return response.data.results[0]?.formatted || "Unknown Address";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Unknown Address";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get geolocation
      const fetchLocation = () =>
        new Promise((resolve, reject) => {
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

      const location = await fetchLocation();
      const address = await fetchAddress(location.latitude, location.longitude);

      // Include address in formData
      const dataToSubmit = { ...formData, address };

      // Send data to the server
      const response = await axios.post(
        "http://localhost:5000/api/surveys",
        dataToSubmit
      );
      console.log("Survey Submitted", response.data);
    } catch (error) {
      console.error(
        "Error submitting survey:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex items-center justify-center py-10">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg p-8">
        <img
          src={logo}
          alt="Logo"
          className="w-32 mx-auto mb-6 rounded-full shadow-md"
        />
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl border"
        >
          {/** Form Fields */}
          {[
            {
              id: "fullName",
              label: "Full Name",
              icon: <FaUser className="text-blue-500" />,
              type: "text",
              placeholder: "John Doe",
              value: formData.fullName,
            },
            {
              id: "email",
              label: "Email",
              icon: <FaEnvelope className="text-blue-500" />,
              type: "email",
              placeholder: "john.doe@example.com",
              value: formData.email,
            },
            {
              id: "phoneNumber",
              label: "Phone Number",
              icon: <FaPhoneAlt className="text-blue-500" />,
              type: "tel",
              placeholder: "123-456-7890",
              value: formData.phoneNumber,
            },
            {
              id: "dateOfBirth",
              label: "Date of Birth",
              icon: <FaBirthdayCake className="text-blue-500" />,
              type: "date",
              value: formData.dateOfBirth,
            },
            {
              id: "country",
              label: "Country",
              icon: <FaFlag className="text-blue-500" />,
              type: "text",
              placeholder: "Country",
              value: formData.country,
            },
            {
              id: "occupation",
              label: "Occupation",
              icon: <FaBriefcase className="text-blue-500" />,
              type: "text",
              placeholder: "Occupation",
              value: formData.occupation,
            },
            {
              id: "zipCode",
              label: "ZIP Code",
              icon: <FaHashtag className="text-blue-500" />,
              type: "text",
              placeholder: "12345",
              value: formData.zipCode,
            },
            {
              id: "education",
              label: "Education",
              icon: <FaUniversity className="text-blue-500" />,
              type: "text",
              placeholder: "Highest Degree",
              value: formData.education,
            },
            {
              id: "city",
              label: "City",
              icon: <FaCity className="text-blue-500" />,
              type: "text",
              placeholder: "City",
              value: formData.city,
            },
          ].map(({ id, label, icon, type, placeholder, value }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block font-medium text-gray-600 mb-1"
              >
                {icon} {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 transition-all hover:shadow-lg hover:border-blue-500"
                required
              />
            </div>
          ))}

          {/** Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block font-medium text-gray-600 mb-1"
            >
              <FaMale className="text-blue-500 inline-block mr-1" />
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 transition-all hover:shadow-lg hover:border-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/** Submit Button */}
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

export default Form;
