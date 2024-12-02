import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch leads from the backend
  const fetchLeads = async () => {
    try {
      const response = await axios.get("http://localhost:5001/leads");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  // Delete lead by ID and update the list
  const deleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;

    try {
      await axios.delete(`http://localhost:5001/leads/${leadId}`);
      // Dynamically remove the deleted lead from the list
      setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== leadId));
    } catch (error) {
      console.error("Error deleting lead:", error);
      alert("Failed to delete lead. Please try again.");
    }
  };

  // Sort leads by score
  const sortedLeads = [...leads].sort((a, b) =>
    sortAsc ? a.score - b.score : b.score - a.score
  );

  const updateLeadScore = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => (lead._id === updatedLead._id ? updatedLead : lead))
    );
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortAsc((prev) => !prev);
  };

  // Initial data fetch
  useEffect(() => {
    fetchLeads();
  }, []); // Run once on component mount

  // Handle updated lead from inquiries
  useEffect(() => {
    if (location.state?.updatedLead) {
      updateLeadScore(location.state.updatedLead);
    }
  }, [location.state?.updatedLead]); // Only runs when updatedLead changes



  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Lead Dashboard</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleSortOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort by Score ({sortAsc ? "Ascending" : "Descending"})
        </button>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/add-lead")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Lead
          </button>
          <button
            onClick={() => navigate("/inquiries")}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Inquiry
          </button>
        </div>
      </div>
      <table className="w-full border-collapse bg-white shadow-md rounded mt-4">
        <thead>
          <tr>
            <th className="border p-4 text-left">Name</th>
            <th className="border p-4 text-left">Email</th>
            <th className="border p-4 text-left">Score</th>
            <th className="border p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead) => (
            <tr
              key={lead._id}
              className={`border ${lead.score >= 75
                  ? "bg-green-100"
                  : lead.score >= 50
                    ? "bg-yellow-100"
                    : "bg-red-100"
                }`}
            >
              <td className="border p-4">{`${lead.name} - (${lead._id})`}</td>
              <td className="border p-4">{lead.email}</td>
              <td className="border p-4">{lead.score}</td>
              <td className="border p-4">
                {/* <button
                  onClick={() => navigate(`/edit-lead/${lead._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => deleteLead(lead._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsList;
