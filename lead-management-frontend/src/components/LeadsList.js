import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LeadsList = () => {
  // Example leads data, which would eventually come from an API.
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', score: 45 },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', score: 60 },
    { id: 3, name: 'Mike Johnson', email: 'mikejohnson@example.com', score: 30 },
  ]);
  const [sortAsc, setSortAsc] = useState(true);

  // Sort leads by score when sortAsc state changes
  const sortedLeads = [...leads].sort((a, b) =>
    sortAsc ? a.score - b.score : b.score - a.score
  );

  const toggleSortOrder = () => setSortAsc(!sortAsc);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Leads List</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleSortOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort by Score ({sortAsc ? 'Ascending' : 'Descending'})
        </button>
        <Link to="/inquiries" className="bg-green-500 text-white px-4 py-2 rounded">
            Submit Inquiry
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b">Name</th>
            <th className="px-4 py-2 text-left border-b">Email</th>
            <th className="px-4 py-2 text-left border-b">Score</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedLeads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{lead.name}</td>
              <td className="px-4 py-2 border-b">{lead.email}</td>
              <td className="px-4 py-2 border-b">{lead.score}</td>
              <td className="px-4 py-2 border-b">
                <button className="bg-green-500 text-white px-3 py-1 rounded mr-2">
                  View
                </button>
                <button className="bg-gray-500 text-white px-3 py-1 rounded">
                  Edit
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
