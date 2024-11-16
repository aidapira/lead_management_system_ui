import React, { useState, useEffect } from 'react';

const LeadsList = () => {
  // Mock lead data
  const [leads, setLeads] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', score: 80 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', score: 50 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', score: 90 },
  ]);

  const [sortAsc, setSortAsc] = useState(true);

  // Mock score updates (Simulate real-time updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setLeads((prevLeads) =>
        prevLeads.map((lead) => ({
          ...lead,
          score: lead.score + Math.floor(Math.random() * 10 - 5), // Random score adjustment
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Sort leads by score
  const sortedLeads = [...leads].sort((a, b) =>
    sortAsc ? a.score - b.score : b.score - a.score
  );

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortAsc((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Lead Dashboard</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleSortOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sort by Score ({sortAsc ? 'Ascending' : 'Descending'})
        </button>
      </div>
      <table className="w-full border-collapse bg-white shadow-md rounded">
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
              key={lead.id}
              className={`border ${
                lead.score >= 75
                  ? 'bg-green-100'
                  : lead.score >= 50
                  ? 'bg-yellow-100'
                  : 'bg-red-100'
              }`}
            >
              <td className="border p-4">{lead.name}</td>
              <td className="border p-4">{lead.email}</td>
              <td className="border p-4">{lead.score}</td>
              <td className="border p-4">
                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                  View
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded">
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
