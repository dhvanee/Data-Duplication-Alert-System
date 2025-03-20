import React, { useState, useEffect } from 'react';
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
  Settings2,
  ArrowUpDown
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
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Loading from "../components/ui/loading";
import { cn } from "../lib/utils";
import { useToast } from "../hooks/use-toast";

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
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
    // Simulate sorting delay
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
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
    setLoading(true);
    setTimeout(() => {
      setDuplicates(duplicates.filter(d => d.id !== duplicateId));
      setLoading(false);
      toast({
        title: "Records Merged",
        description: "The duplicate records have been successfully merged.",
      });
    }, 1000);
  };

  // Handle ignore
  const handleIgnore = (duplicateId) => {
    setLoading(true);
    setTimeout(() => {
      setDuplicates(duplicates.filter(d => d.id !== duplicateId));
      setLoading(false);
      toast({
        title: "Duplicates Ignored",
        description: "The duplicate records have been marked as ignored.",
      });
    }, 500);
  };

  // Handle delete
  const handleDelete = (duplicateId) => {
    if (window.confirm('Are you sure you want to delete this duplicate group?')) {
      setLoading(true);
      setTimeout(() => {
        setDuplicates(duplicates.filter(d => d.id !== duplicateId));
        setLoading(false);
        toast({
          title: "Records Deleted",
          description: "The duplicate records have been deleted.",
          variant: "destructive",
        });
      }, 500);
    }
  };

  // Handle configure rules
  const handleConfigureRules = () => {
    toast({
      title: "Configure Rules",
      description: "Opening duplicate detection rules configuration...",
    });
  };

  // Filter duplicates
  const filteredDuplicates = duplicates.filter(duplicate => 
    duplicate.records.some(record => 
      Object.values(record).some(value => 
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-gray-900">Duplicate Detection</h1>
          <p className="text-sm text-gray-500">
            Manage and resolve duplicate records in your database
          </p>
        </div>
        <Button
          onClick={handleConfigureRules}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Settings2 className="w-4 h-4" />
          Configure Rules
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4 items-center">
            <div className="flex-1 max-w-sm">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search records..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matchConfidence">Match Confidence</SelectItem>
                <SelectItem value="timestamp">Date Detected</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
              }}
              className="shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredDuplicates.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-900">No duplicates found</h3>
              <p className="mt-1 text-sm text-gray-500">
                All records are unique or have been resolved
              </p>
            </div>
          ) : (
            filteredDuplicates.map((duplicate) => (
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
                    <span className="text-sm text-gray-500">
                      Detected {duplicate.timestamp}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleMerge(duplicate.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Merge Records
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleIgnore(duplicate.id)}
                    >
                      Ignore
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(duplicate.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {duplicate.records.map((record, index) => (
                    <div 
                      key={index}
                      className={cn(
                        'p-4 rounded-lg border',
                        index === 0 
                          ? 'border-blue-200 bg-blue-50'
                          : 'border-gray-200 bg-gray-50'
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DataDuplication; 