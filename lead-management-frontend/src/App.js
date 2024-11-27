// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LeadsList from './components/LeadsList';
import InquiryForm from './components/InquiryForm';
import LeadForm from "./components/LeadForm";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leads" element={<LeadsList />} />
        <Route path="/inquiries" element={<InquiryForm />} />
        <Route path="/add-lead" element={<LeadForm />} />
        <Route path="/edit-lead/:leadId" element={<LeadForm />} />
      </Routes>
    </Router>
  );
}

export default App;
