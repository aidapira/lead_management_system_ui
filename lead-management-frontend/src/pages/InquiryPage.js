import React from "react";
import { useNavigate } from "react-router-dom";
import InquiryForm from "../components/InquiryForm";

const InquiryPage = () => {
  const navigate = useNavigate();

  const handleInquirySubmit = (updatedLead) => {
    // Navigate back to LeadsList after submission, optionally passing updatedLead
    navigate("/leads", { state: { updatedLead } });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Submit Inquiry</h2>
      <InquiryForm onInquirySubmit={handleInquirySubmit} />
      <button
        onClick={() => navigate("/leads")}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Back to Leads
      </button>
    </div>
  );
};

export default InquiryPage;
