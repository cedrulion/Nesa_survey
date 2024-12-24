import React from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaTransgender, FaGlobe, FaBriefcase, FaSchool, FaCity } from 'react-icons/fa';

const SurveyDetails = ({ selectedSurvey, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-3xl p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-sky-500 mb-6 text-center">
          Survey Details
        </h2>

        {/* Details in three columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaUser className="text-sky-500" />
            <p>
              <strong>Full Name:</strong> {selectedSurvey.fullName}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaEnvelope className="text-sky-500" />
            <p>
              <strong>Email:</strong> {selectedSurvey.email}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaPhone className="text-sky-500" />
            <p>
              <strong>Phone Number:</strong> {selectedSurvey.phoneNumber}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaMapMarkerAlt className="text-sky-500" />
            <p>
              <strong>Address:</strong> {selectedSurvey.address}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaCalendar className="text-sky-500" />
            <p>
              <strong>Date of Birth:</strong> {selectedSurvey.dateOfBirth}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaTransgender className="text-sky-500" />
            <p>
              <strong>Gender:</strong> {selectedSurvey.gender}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaGlobe className="text-sky-500" />
            <p>
              <strong>Country:</strong> {selectedSurvey.country}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaBriefcase className="text-sky-500" />
            <p>
              <strong>Occupation:</strong> {selectedSurvey.occupation}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaMapMarkerAlt className="text-sky-500" />
            <p>
              <strong>Zip Code:</strong> {selectedSurvey.zipCode}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaSchool className="text-sky-500" />
            <p>
              <strong>Education:</strong> {selectedSurvey.education}
            </p>
          </div>
          <div className="flex items-center space-x-2 hover:bg-gray-100 p-3 rounded-md transition">
            <FaCity className="text-sky-500" />
            <p>
              <strong>City:</strong> {selectedSurvey.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
