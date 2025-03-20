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
  ArrowUpDown,
  Download,
  Upload,
  Trash2,
  FileText,
  PieChart
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
import { toast } from "../components/ui/use-toast";
import { Skeleton } from "../components/ui/skeleton";
import { cn } from "../lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

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

  // New state for additional functionality
  const [selectedDuplicates, setSelectedDuplicates] = useState(new Set());
  const [filterCriteria, setFilterCriteria] = useState({
    confidence: 'all', // all, high, medium, low
    dateRange: 'all', // all, today, week, month
    status: 'all', // all, pending, resolved, ignored
  });
  const [showStats, setShowStats] = useState(false);
  const [view, setView] = useState('list'); // list, grid
  
  // Statistics calculation
  const stats = {
    total: duplicates.length,
    highConfidence: duplicates.filter(d => d.matchPercentage >= 90).length,
    mediumConfidence: duplicates.filter(d => d.matchPercentage >= 70 && d.matchPercentage < 90).length,
    lowConfidence: duplicates.filter(d => d.matchPercentage < 70).length,
  };

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

  // Bulk actions
  const handleBulkAction = (action) => {
    setLoading(true);
    const selectedIds = Array.from(selectedDuplicates);
    
    setTimeout(() => {
      switch (action) {
        case 'merge':
          setDuplicates(prev => prev.filter(d => !selectedIds.includes(d.id)));
          toast({
            title: "Bulk Merge Complete",
            description: `Successfully merged ${selectedIds.length} duplicate groups.`,
          });
          break;
        case 'ignore':
          setDuplicates(prev => prev.filter(d => !selectedIds.includes(d.id)));
          toast({
            title: "Bulk Ignore Complete",
            description: `Ignored ${selectedIds.length} duplicate groups.`,
          });
          break;
        case 'delete':
          setDuplicates(prev => prev.filter(d => !selectedIds.includes(d.id)));
          toast({
            title: "Bulk Delete Complete",
            description: `Deleted ${selectedIds.length} duplicate groups.`,
            variant: "destructive",
          });
          break;
      }
      setSelectedDuplicates(new Set());
      setLoading(false);
    }, 1000);
  };

  // Export functionality
  const handleExport = (format) => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Duplicates exported as ${format.toUpperCase()}.`,
      });
      setLoading(false);
    }, 1000);
  };

  // Apply filters
  const applyFilters = (duplicates) => {
    let filtered = [...duplicates];
    
    // Confidence filter
    if (filterCriteria.confidence !== 'all') {
      filtered = filtered.filter(d => {
        switch (filterCriteria.confidence) {
          case 'high':
            return d.matchPercentage >= 90;
          case 'medium':
            return d.matchPercentage >= 70 && d.matchPercentage < 90;
          case 'low':
            return d.matchPercentage < 70;
          default:
            return true;
        }
      });
    }

    // Date range filter
    if (filterCriteria.dateRange !== 'all') {
      const now = new Date();
      filtered = filtered.filter(d => {
        const date = new Date(d.timestamp);
        switch (filterCriteria.dateRange) {
          case 'today':
            return date.toDateString() === now.toDateString();
          case 'week':
            const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
            return date >= weekAgo;
          case 'month':
            const monthAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
            return date >= monthAgo;
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  // Render statistics
  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Duplicates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">High Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.highConfidence}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Medium Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{stats.mediumConfidence}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Low Confidence</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{stats.lowConfidence}</div>
        </CardContent>
      </Card>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-10" />
            </div>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-32" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-24" />
                      <Skeleton className="h-9 w-20" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <Skeleton className="h-48" />
                    <Skeleton className="h-48" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
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
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-2"
          >
            <PieChart className="w-4 h-4" />
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                <FileText className="w-4 h-4 mr-2" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('json')}>
                <FileText className="w-4 h-4 mr-2" />
                Export as JSON
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            onClick={handleConfigureRules}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Settings2 className="w-4 h-4" />
            Configure Rules
          </Button>
        </div>
      </div>

      {showStats && renderStats()}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-wrap gap-4 items-center">
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
            
            <Select 
              value={filterCriteria.confidence}
              onValueChange={(value) => setFilterCriteria(prev => ({ ...prev, confidence: value }))}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Confidence" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Confidence</SelectItem>
                <SelectItem value="high">High (≥90%)</SelectItem>
                <SelectItem value="medium">Medium (70-89%)</SelectItem>
                <SelectItem value="low">Low (&lt;70%)</SelectItem>
              </SelectContent>
            </Select>

            <Select 
              value={filterCriteria.dateRange}
              onValueChange={(value) => setFilterCriteria(prev => ({ ...prev, dateRange: value }))}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
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

          {selectedDuplicates.size > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {selectedDuplicates.size} items selected
                </span>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleBulkAction('merge')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Merge Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('ignore')}
                >
                  Ignore Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('delete')}
                  className="text-red-600 hover:text-red-700"
                >
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
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
            applyFilters(filteredDuplicates).map((duplicate) => (
              <div key={duplicate.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={selectedDuplicates.has(duplicate.id)}
                      onChange={(e) => {
                        const newSelected = new Set(selectedDuplicates);
                        if (e.target.checked) {
                          newSelected.add(duplicate.id);
                        } else {
                          newSelected.delete(duplicate.id);
                        }
                        setSelectedDuplicates(newSelected);
                      }}
                      className="h-4 w-4 text-blue-600 rounded border-gray-300"
                    />
                    <span className={cn(
                      'px-3 py-1 rounded-full text-sm font-medium',
                      duplicate.matchPercentage >= 90 
                        ? 'bg-red-100 text-red-800'
                        : duplicate.matchPercentage >= 70
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
                        <DropdownMenuItem onClick={() => handleExport('csv')}>
                          Export Group
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
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

const RecordDetails = ({ record }) => (
  <div className="space-y-2">
    <div>
      <span className="font-medium">Name:</span> {record.name}
    </div>
    <div>
      <span className="font-medium">Email:</span> {record.email}
    </div>
    <div>
      <span className="font-medium">Phone:</span> {record.phone || 'N/A'}
    </div>
    <div>
      <span className="font-medium">Address:</span> {record.address || 'N/A'}
    </div>
    <div>
      <span className="font-medium">Created:</span>{' '}
      {new Date(record.createdAt).toLocaleDateString()}
    </div>
  </div>
);

export default DataDuplication; 