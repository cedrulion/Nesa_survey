import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye, FaCaretDown, FaFilePdf, FaFileExcel } from 'react-icons/fa';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import logo from '../Assets/nesalogo.png';
import SurveyDetails from './SurveyDetails';  
import { useNavigate } from 'react-router-dom'; 

const AdminDashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get('https://surveybackend.netlify.app/api/surveys');
      setSurveys(response.data);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    }
  };

  const fetchSurveyById = async (id) => {
    try {
      const response = await axios.get(`https://surveybackend.netlify.app/api/surveys/${id}`);
      setSelectedSurvey(response.data);
      setShowDetails(true);
    } catch (error) {
      console.error('Error fetching survey by ID:', error);
    }
  };

  const deleteSurvey = async (id) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      try {
        await axios.delete(`https://surveybackend.netlify.app/api/surveys/${id}`);
        fetchSurveys();
      } catch (error) {
        console.error('Error deleting survey:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const filterByDateRange = (surveys) => {
    if (!fromDate && !toDate) return surveys;
    return surveys.filter((survey) => {
      const surveyDate = new Date(survey.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;
      return (!from || surveyDate >= from) && (!to || surveyDate <= to);
    });
  };

  const filteredSurveys = filterByDateRange(
    surveys.filter((survey) =>
      survey.fullName.toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredSurveys.length / itemsPerPage);
  const displayedSurveys = filteredSurveys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Survey Data', 10, 10);
    filteredSurveys.forEach((survey, index) => {
      doc.text(
        `${index + 1}. Name: ${survey.fullName}, Email: ${survey.email}, Phone: ${survey.phoneNumber}`,
        10,
        20 + index * 10
      );
    });
    doc.save('surveys.pdf');
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSurveys);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Surveys');
    XLSX.writeFile(workbook, 'surveys.xlsx');
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <h1 className="text-xl font-bold text-gray-700 ml-2">Admin Dashboard</h1>
        </div>
        <div>
          <h1 className="text-xl font-bold text-sky-500 ml-2">  Survey   </h1>
        </div>
        <div className="flex items-center">
          <button
            className="border px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
            onClick={handleExportPDF}
          >
            <FaFilePdf className="inline mr-2" /> Export PDF
          </button>
          <button
            className="border px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 mx-2"
            onClick={handleExportExcel}
          >
            <FaFileExcel className="inline mr-2" /> Export Excel
          </button>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search surveys..."
            className="border border-gray-300 p-2 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center space-x-2 border px-4 py-2 rounded-md hover:bg-gray-200"
          >
            <FaCaretDown />
          </button>
          {dropdownOpen && (
            <div className="absolute right-5 mt-9 w-48 bg-white border rounded-md shadow-md">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Date Filter */}
      <div className="mt-4 flex space-x-4">
      <h1 className="text-xl font-bold text-gray-700 ml-2 pt-2">From</h1>
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <h1 className="text-xl font-bold text-gray-700 ml-2 pt-2">To</h1>
        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="mt-6 bg-white rounded-md shadow-md p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Full Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedSurveys.map((survey, index) => (
              <tr
                key={survey._id}
                className="text-center hover:bg-gray-100 transition duration-150"
              >
                <td className="py-2 px-4 border">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="py-2 px-4 border">{survey.fullName}</td>
                <td className="py-2 px-4 border">{survey.email}</td>
                <td className="py-2 px-4 border">{survey.phoneNumber}</td>
                <td className="py-2 px-4 border flex justify-center items-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => fetchSurveyById(survey._id)}
                  >
                    <FaEye />
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => deleteSurvey(survey._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 border rounded-md ${
              currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-700 text-white'
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 border rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-700 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Selected Survey Details */}
      {showDetails && (
        <SurveyDetails 
          selectedSurvey={selectedSurvey} 
          onClose={() => setShowDetails(false)} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;
