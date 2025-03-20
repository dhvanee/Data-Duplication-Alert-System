import React, { useState } from 'react';

const DataManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const records = [
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '555-123-4567', city: 'New York', status: 'unique' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '555-987-6543', city: 'Los Angeles', status: 'unique' },
    { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', phone: '555-222-3333', city: 'Chicago', status: 'unique' },
    { id: 4, name: 'John Smith', email: 'john.smith2@example.com', phone: '555-444-5555', city: 'New York', status: 'potential_duplicate' },
    { id: 5, name: 'Sarah Williams', email: 'sarah.williams@example.com', phone: '555-777-8888', city: 'Miami', status: 'unique' },
    { id: 6, name: 'David Brown', email: 'david.brown@example.com', phone: '555-666-9999', city: 'Seattle', status: 'unique' },
    { id: 7, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '555-111-2222', city: 'Boston', status: 'unique' },
    { id: 8, name: 'Sarah Williams', email: 'sarah.w@example.com', phone: '555-333-4444', city: 'Miami', status: 'potential_duplicate' },
  ];

  const getStatusBadge = (status) => {
    if (status === 'unique') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <span className="w-1 h-1 mr-1.5 rounded-full bg-green-800"></span>
          Unique
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        <span className="w-1 h-1 mr-1.5 rounded-full bg-yellow-800"></span>
        Potential Duplicate
      </span>
    );
  };

  const filteredRecords = records.filter(record => {
    const searchLower = searchQuery.toLowerCase();
    return (
      record.name.toLowerCase().includes(searchLower) ||
      record.email.toLowerCase().includes(searchLower) ||
      record.phone.toLowerCase().includes(searchLower) ||
      record.city.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Data Management</h1>
          <p className="mt-1 text-sm text-gray-600">Manage your data records, import new data, and identify duplicates.</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="w-full sm:max-w-xs">
            <div className="relative">
              <input
                type="text"
                placeholder="Search records..."
                className="block w-full rounded-md border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-200 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Import
            </button>
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-200 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Record
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(record.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-gray-600 hover:text-gray-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-700">
              Showing {filteredRecords.length} of {records.length} records
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement; 