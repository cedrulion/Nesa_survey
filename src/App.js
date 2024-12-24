// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';


function App() {
  return (
    <Router>
       <Routes>
       <Route  path="/" element={<Form/>} ></Route>
       <Route  path="/form" element={<Form/>} ></Route>
       <Route  path="/login" element={<AdminLogin/>} ></Route>
       <Route   path='/dashboard' element={<AdminDashboard/>}></Route>
        </Routes>
    </Router>
  );
}

export default App;
