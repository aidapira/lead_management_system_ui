import React, { useState } from "react";
import axios from "axios";

const InquiryForm = ({ onInquirySubmit }) => {
  const [leadId, setLeadId] = useState("");
  const [inquiry, setInquiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axios.post(`http://localhost:5001/leads/${leadId}/inquiry`, {
        message: inquiry,
      });

      // Call the parent function to update lead scores
      onInquirySubmit(response.data.updatedLead);
      setLeadId("");
      setInquiry("");
      alert("Inquiry submitted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit inquiry.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Submit Inquiry</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="leadId">
            Lead ID
          </label>
          <input
            id="leadId"
            type="text"
            value={leadId}
            onChange={(e) => setLeadId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="inquiry">
            Inquiry
          </label>
          <textarea
            id="inquiry"
            value={inquiry}
            onChange={(e) => setInquiry(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
