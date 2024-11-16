import React, { useState } from 'react';

const InquiryForm = () => {
  // Sample leads data (replace with API fetch when backend is ready)
  const leads = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
  ];

  const [selectedLead, setSelectedLead] = useState('');
  const [message, setMessage] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!selectedLead) validationErrors.lead = 'Please select a lead.';
    if (!message) validationErrors.message = 'Message content is required.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset form and show confirmation
    setErrors({});
    setConfirmation('Inquiry submitted successfully!');
    setSelectedLead('');
    setMessage('');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Submit an Inquiry</h2>
      {confirmation && (
        <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">
          {confirmation}
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <div className="mb-4">
          <label htmlFor="lead" className="block text-gray-700 font-semibold mb-2">
            Select Lead:
          </label>
          <select
            id="lead"
            value={selectedLead}
            onChange={(e) => setSelectedLead(e.target.value)}
            className={`w-full p-2 border rounded ${
              errors.lead ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- Select a Lead --</option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id}>
                {lead.name}
              </option>
            ))}
          </select>
          {errors.lead && (
            <p className="text-red-500 text-sm mt-1">{errors.lead}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className={`w-full p-2 border rounded ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default InquiryForm;
