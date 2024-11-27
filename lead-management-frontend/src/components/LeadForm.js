import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const LeadForm = () => {
  const [lead, setLead] = useState({ name: "", email: "", phone: 0, status: 'New' });
  const navigate = useNavigate();
  const { leadId } = useParams();

  // Fetch lead details for editing
  useEffect(() => {
    if (leadId) {
      axios
        .get(`http://localhost:5001/leads/${leadId}`)
        .then((response) => setLead(response.data))
        .catch((error) => console.error("Error fetching lead:", error));
    }
  }, [leadId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (leadId) {
        await axios.put(`http://localhost:5001/leads/${leadId}`, lead);
      } else {
        console.log(lead)
        await axios.post("http://localhost:5001/leads", lead);
      }
      navigate("/leads"); // Redirect to leads list after saving
    } catch (error) {
      console.error("Error saving lead:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {leadId ? "Edit Lead" : "Add Lead"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={lead.name}
            onChange={(e) => setLead({ ...lead, name: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            value={lead.email}
            onChange={(e) => setLead({ ...lead, email: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Phone</label>
          <input
            type="text"
            value={lead.phone}
            onChange={(e) => setLead({ ...lead, phone: Number(e.target.value) })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Status</label>
          <input
            type="text"
            value={lead.status}
            onChange={(e) => setLead({ ...lead, status: e.target.value })}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Lead
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
