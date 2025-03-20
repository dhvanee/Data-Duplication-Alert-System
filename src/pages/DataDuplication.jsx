import React, { useState } from 'react';
import {
  Search,
  Filter,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { cn } from "../lib/utils";

const DataDuplication = () => {
  const [duplicates, setDuplicates] = useState([
    {
      id: 1,
      matchPercentage: 95,
      timestamp: '2024-01-15 14:30',
      records: [
        {
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main St, New York, NY 10001',
          created: '2024-01-10'
        },
        {
          name: 'John A Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          address: '123 Main Street, New York, NY 10001',
          created: '2024-01-12'
        }
      ]
    },
    {
      id: 2,
      matchPercentage: 87,
      timestamp: '2024-01-15 13:45',
      records: [
        {
          name: 'Sarah Johnson',
          email: 'sarah.j@company.com',
          phone: '+1 (555) 987-6543',
          address: '456 Park Ave, Boston, MA 02108',
          created: '2024-01-08'
        },
        {
          name: 'Sarah Johnson',
          email: 'sarah.johnson@company.com',
          phone: '+1 (555) 987-6543',
          address: '456 Park Avenue, Boston, MA 02108',
          created: '2024-01-14'
        }
      ]
    }
  ]);

  const [sortBy, setSortBy] = useState('matchConfidence');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedGroups, setExpandedGroups] = useState(new Set());

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle filter
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  // Handle sort
  const handleSort = (key) => {
    setSortBy(key);
  };

  // Handle group expansion
  const toggleGroup = (id) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Handle merge
  const handleMerge = (duplicateId) => {
    setDuplicates(duplicates.filter(d => d.id !== duplicateId));
  };

  // Handle ignore
  const handleIgnore = (duplicateId) => {
    setDuplicates(duplicates.filter(d => d.id !== duplicateId));
  };

  // Handle delete
  const handleDelete = (duplicateId) => {
    if (window.confirm('Are you sure you want to delete this duplicate group?')) {
      setDuplicates(duplicates.filter(d => d.id !== duplicateId));
    }
  };

  // Handle configure rules
  const handleConfigureRules = () => {
    // Implement configure rules functionality
  };

  // Filter duplicates
  const filteredDuplicates = duplicates.filter(duplicate => 
    duplicate.records.some(record => 
      Object.values(record).some(value => 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Duplicate Detection</h1>
        <button
          onClick={handleConfigureRules}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Configure Rules
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="flex-1">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="matchConfidence">Sort by Match Confidence</option>
                <option value="timestamp">Sort by Date</option>
              </select>
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredDuplicates.map((duplicate) => (
            <div key={duplicate.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    duplicate.matchPercentage >= 90 
                      ? 'bg-red-100 text-red-800'
                      : duplicate.matchPercentage >= 80
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  )}>
                    {duplicate.matchPercentage}% Match
                  </span>
                  <span className="text-sm text-gray-500">{duplicate.timestamp}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMerge(duplicate.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Merge
                  </button>
                  <button
                    onClick={() => handleIgnore(duplicate.id)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Ignore
                  </button>
                  <button
                    onClick={() => handleDelete(duplicate.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {duplicate.records.map((record, index) => (
                  <div 
                    key={index}
                    className={cn(
                      'p-4 rounded-lg',
                      index === 0 ? 'bg-yellow-50' : 'bg-yellow-50'
                    )}
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-500">Name</label>
                        <div className="font-medium">{record.name}</div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Email</label>
                        <div className="font-medium">{record.email}</div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Phone</label>
                        <div className="font-medium">{record.phone}</div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Address</label>
                        <div className="font-medium">{record.address}</div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Created</label>
                        <div className="font-medium">{record.created}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataDuplication; 