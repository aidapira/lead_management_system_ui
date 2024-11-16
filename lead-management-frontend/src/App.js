// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LeadsList from './components/LeadsList';
import InquiryForm from './components/InquiryForm';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leads" element={<LeadsList />} />
        <Route path="/inquiries" element={<InquiryForm />} />
      </Routes>
    </Router>
  );
}

export default App;
