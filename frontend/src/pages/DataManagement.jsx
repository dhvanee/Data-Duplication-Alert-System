import React, { useState, useEffect } from 'react';
import { 
  Upload,
  Download,
  Plus,
  Search,
  MoreVertical,
  FileSpreadsheet,
  File,
  X,
  ChevronUp,
  ChevronDown,
  Settings
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import EditRecordForm from '../components/ui/EditRecordForm';
import Loading from '../components/ui/loading';
import { useToast } from '../hooks/use-toast';

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
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    email: true,
    phone: true,
    city: true,
    status: true
  });

  const { toast } = useToast();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Simulated loading effect
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Sorting function
  const handleSort = async (key) => {
    setIsSorting(true);
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setTimeout(() => setIsSorting(false), 300);
  };

  // Sort records
  const sortedRecords = React.useMemo(() => {
    if (!sortConfig.key) return records;

    return [...records].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [records, sortConfig]);

  // Filter records
  const filteredRecords = React.useMemo(() => {
    return sortedRecords.filter(record => {
      const matchesSearch = Object.values(record).some(value =>
        value.toString().toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [sortedRecords, debouncedSearch, statusFilter]);

  // Pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

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

  // Handle edit record
  const handleEdit = (id) => {
    const recordToEdit = records.find(record => record.id === id);
    setEditingRecord(recordToEdit);
  };

  // Handle delete record
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      setIsDeleting(true);
      try {
        setTimeout(() => {
          setRecords(records.filter(record => record.id !== id));
          toast({
            title: "Success",
            description: "Record deleted successfully",
            variant: "success",
          });
          setIsDeleting(false);
        }, 500);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete record",
          variant: "destructive",
        });
        setIsDeleting(false);
      }
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

  // Column visibility toggle
  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  // Render sort indicator
  const SortIndicator = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) {
      return <ChevronUp className="w-4 h-4 opacity-0 group-hover:opacity-50" />;
    }
    return (
      <div className={`transition-transform duration-200 ${isSorting ? 'animate-pulse' : ''}`}>
        {sortConfig.direction === 'asc' 
          ? <ChevronUp className="w-4 h-4" />
          : <ChevronDown className="w-4 h-4" />}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-solid rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
          <div className="mt-4 text-blue-600 text-center font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'NAME' },
    { key: 'email', label: 'EMAIL' },
    { key: 'phone', label: 'PHONE' },
    { key: 'city', label: 'CITY' },
    { key: 'status', label: 'STATUS' }
  ];

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

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Unique">Unique</option>
            <option value="Potential Duplicate">Potential Duplicate</option>
          </select>
          <select
            value={recordsPerPage}
            onChange={(e) => setRecordsPerPage(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
          </select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {columns.map(column => (
                <DropdownMenuItem
                  key={column.key}
                  onClick={() => toggleColumn(column.key)}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    checked={visibleColumns[column.key]}
                    onChange={() => {}}
                    className="rounded border-gray-300"
                  />
                  <span>{column.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {columns.map(column => (
                  visibleColumns[column.key] && (
                    <th
                      key={column.key}
                      onClick={() => handleSort(column.key)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
                    >
                      <div className="flex items-center">
                        {column.label}
                        <SortIndicator columnKey={column.key} />
                      </div>
                    </th>
                  )
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  {visibleColumns.id && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.id}</td>
                  )}
                  {visibleColumns.name && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                  )}
                  {visibleColumns.email && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.email}</td>
                  )}
                  {visibleColumns.phone && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.phone}</td>
                  )}
                  {visibleColumns.city && (
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.city}</td>
                  )}
                  {visibleColumns.status && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'Unique' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status}
                      </span>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-full">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleEdit(record.id)}
                          disabled={isDeleting}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(record.id)}
                          disabled={isDeleting}
                          className="text-red-600"
                        >
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
        
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} records
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex items-center space-x-1">
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const page = Math.min(Math.max(1, parseInt(e.target.value) || 1), totalPages);
                    setCurrentPage(page);
                  }}
                  className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                />
                <span className="text-gray-600">of {totalPages}</span>
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
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

      {editingRecord && (
        <EditRecordForm
          record={editingRecord}
          onSave={handleEditSave}
          onCancel={() => setEditingRecord(null)}
        />
      )}
    </div>
  );
};

export default DataManagement; 