import React, { useState } from 'react';
import { 
  Upload,
  Download,
  Plus,
  Search,
  MoreVertical,
  FileSpreadsheet,
  File,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

const DataManagement = () => {
  const [records, setRecords] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@example.com', phone: '555-123-4567', city: 'New York', status: 'Unique' },
    { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '555-987-6543', city: 'Los Angeles', status: 'Unique' },
    { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', phone: '555-222-3333', city: 'Chicago', status: 'Unique' },
    { id: 4, name: 'John Smith', email: 'john.smith2@example.com', phone: '555-444-5555', city: 'New York', status: 'Potential Duplicate' },
    { id: 5, name: 'Sarah Williams', email: 'sarah.williams@example.com', phone: '555-777-8888', city: 'Miami', status: 'Unique' },
    { id: 6, name: 'David Brown', email: 'david.brown@example.com', phone: '555-666-9999', city: 'Seattle', status: 'Unique' },
    { id: 7, name: 'Emily Davis', email: 'emily.davis@example.com', phone: '555-111-2222', city: 'Boston', status: 'Unique' },
    { id: 8, name: 'Sarah Williams', email: 'sarah.w@example.com', phone: '555-333-4444', city: 'Miami', status: 'Potential Duplicate' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [newRecord, setNewRecord] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('border-blue-500');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-blue-500');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('border-blue-500');
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelection(files[0]);
    }
  };

  // Handle file selection
  const handleFileSelection = (file) => {
    if (file) {
      const fileType = file.name.split('.').pop().toLowerCase();
      const allowedTypes = ['csv', 'xlsx', 'xls', 'pdf'];
      
      if (!allowedTypes.includes(fileType)) {
        alert('Please upload a CSV, Excel, or PDF file');
        return;
      }
      
      setSelectedFile(file);
    }
  };

  // Handle file import
  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  // Process the imported file
  const processImportedFile = async () => {
    if (!selectedFile) return;

    const fileType = selectedFile.name.split('.').pop().toLowerCase();
    
    try {
      if (fileType === 'csv') {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const csvContent = event.target.result;
            const rows = csvContent.split('\n');
            const headers = rows[0].split(',');
            
            const newRecords = rows.slice(1)
              .filter(row => row.trim())
              .map((row, index) => {
                const values = row.split(',');
                const record = {};
                headers.forEach((header, i) => {
                  record[header.trim().toLowerCase()] = values[i]?.trim() || '';
                });
                record.id = records.length + index + 1;
                record.status = 'Pending';
                return record;
              });

            setRecords(prev => [...prev, ...newRecords]);
            setShowImportModal(false);
            setSelectedFile(null);
            alert('CSV file imported successfully!');
          } catch (error) {
            console.error('Error parsing CSV:', error);
            alert('Error parsing CSV file. Please check the file format.');
          }
        };
        reader.onerror = () => {
          alert('Error reading file. Please try again.');
        };
        reader.readAsText(selectedFile);
      } else if (fileType === 'xlsx' || fileType === 'xls') {
        alert('Excel file processing will be implemented soon. Please use CSV format for now.');
      } else if (fileType === 'pdf') {
        alert('PDF processing will be implemented soon. Please use CSV format for now.');
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
    }
  };

  // Handle export
  const handleExport = (format) => {
    const data = records.map(record => ({
      ID: record.id,
      Name: record.name,
      Email: record.email,
      Phone: record.phone,
      City: record.city,
      Status: record.status,
      ...(record.fileType && { FileType: record.fileType }),
      ...(record.size && { Size: record.size }),
      ...(record.lastModified && { LastModified: record.lastModified })
    }));

    if (format === 'csv') {
      const headers = ['ID', 'Name', 'Email', 'Phone', 'City', 'Status', 'FileType', 'Size', 'LastModified'];
      const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header] || '').join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data-export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const jsonContent = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data-export.json';
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'txt') {
      const textContent = data.map(record => 
        Object.entries(record)
          .map(([key, value]) => `${key}: ${value}`)
          .join('\n')
      ).join('\n\n---\n\n');

      const blob = new Blob([textContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data-export.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (format === 'html') {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Data Export</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Exported Data</h1>
          <table>
            <thead>
              <tr>
                ${Object.keys(data[0] || {}).map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(record => `
                <tr>
                  ${Object.values(record).map(value => `<td>${value}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
      `;

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data-export.html';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  // Handle add new record
  const handleAddRecord = (e) => {
    e.preventDefault();
    const newId = Math.max(...records.map(r => r.id)) + 1;
    setRecords([
      ...records,
      {
        id: newId,
        ...newRecord,
        status: 'Pending'
      }
    ]);
    setNewRecord({
      name: '',
      email: '',
      phone: '',
      city: '',
    });
    setShowAddModal(false);
  };

  // Filter records based on search query
  const filteredRecords = records.filter(record =>
    Object.values(record).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Handle edit record
  const handleEdit = (id) => {
    // Implement edit functionality
  };

  // Handle delete record
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  // Handle edit save
  const handleEditSave = (e) => {
    e.preventDefault();
    setRecords(prev => prev.map(record => 
      record.id === editingRecord.id ? editingRecord : record
    ));
    setShowEditModal(false);
    setEditingRecord(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Data Management</h1>
          <p className="text-sm text-gray-600">Manage your data records, import new data, and identify duplicates.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <File className="w-4 h-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('txt')}>
                <File className="w-4 h-4 mr-2" />
                Export as Text
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('html')}>
                <File className="w-4 h-4 mr-2" />
                Export as HTML
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CITY</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATUS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.status === 'Unique' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(record.id)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(record.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {filteredRecords.length} of {records.length} records
          </div>
        </div>
      </div>

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Record</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddRecord}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={newRecord.name}
                    onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    value={newRecord.email}
                    onChange={(e) => setNewRecord({ ...newRecord, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    required
                    value={newRecord.phone}
                    onChange={(e) => setNewRecord({ ...newRecord, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    required
                    value={newRecord.city}
                    onChange={(e) => setNewRecord({ ...newRecord, city: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Add Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Import Data</h2>
              <button onClick={() => setShowImportModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors duration-200 hover:border-blue-500"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.classList.add('border-blue-500');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.classList.remove('border-blue-500');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.currentTarget.classList.remove('border-blue-500');
                  const files = e.dataTransfer.files;
                  if (files.length) {
                    const file = files[0];
                    const fileType = file.name.split('.').pop().toLowerCase();
                    const allowedTypes = ['csv', 'xlsx', 'xls', 'pdf'];
                    if (allowedTypes.includes(fileType)) {
                      setSelectedFile(file);
                    } else {
                      alert('Please upload a CSV, Excel, or PDF file');
                    }
                  }
                }}
              >
                <input
                  type="file"
                  accept="*/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                    }
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                  <span className="text-xs text-gray-500">All file types are supported</span>
                </label>
              </div>
              {selectedFile && (
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <div className="flex items-center">
                    <FileSpreadsheet className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{selectedFile.name}</span>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!selectedFile) return;

                  // Create a record from the file metadata
                  const newRecord = {
                    id: records.length + 1,
                    name: selectedFile.name,
                    email: 'file@system.local',
                    phone: '-',
                    city: '-',
                    status: 'Imported',
                    fileType: selectedFile.type || 'application/octet-stream',
                    size: `${(selectedFile.size / 1024).toFixed(2)} KB`,
                    lastModified: new Date(selectedFile.lastModified).toLocaleDateString()
                  };

                  setRecords(prev => [...prev, newRecord]);
                  setShowImportModal(false);
                  setSelectedFile(null);
                  alert('File imported successfully!');
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!selectedFile}
              >
                Import Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Record</h2>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingRecord(null);
                }} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSave}>
              <div className="space-y-4">
                {editingRecord.fileType ? (
                  // For imported files
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">File Name</label>
                      <input
                        type="text"
                        value={editingRecord.name}
                        onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">File Type</label>
                      <input
                        type="text"
                        value={editingRecord.fileType}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Size</label>
                      <input
                        type="text"
                        value={editingRecord.size}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                      />
                    </div>
                  </>
                ) : (
                  // For manual records
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        required
                        value={editingRecord.name}
                        onChange={(e) => setEditingRecord({ ...editingRecord, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        required
                        value={editingRecord.email}
                        onChange={(e) => setEditingRecord({ ...editingRecord, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        required
                        value={editingRecord.phone}
                        onChange={(e) => setEditingRecord({ ...editingRecord, phone: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        required
                        value={editingRecord.city}
                        onChange={(e) => setEditingRecord({ ...editingRecord, city: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={editingRecord.status}
                    onChange={(e) => setEditingRecord({ ...editingRecord, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Unique">Unique</option>
                    <option value="Imported">Imported</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingRecord(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement; 