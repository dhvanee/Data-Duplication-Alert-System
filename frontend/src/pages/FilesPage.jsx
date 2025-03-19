import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { FileCard } from '../components/ui/card';
import { DuplicateAlert } from '../components/ui/duplicate-alert';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Upload, Search, SortDesc, Filter, Calendar, FileType } from 'lucide-react';

export default function FilesPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [duplicateData, setDuplicateData] = useState({
    exact: [],
    similar: [],
    similarByMetadata: []
  });
  const [downloadingFileId, setDownloadingFileId] = useState(null);
  
  // Fetch files
  const { data: files, isLoading, isError } = useQuery({
    queryKey: ['/api/files'],
    refetchOnWindowFocus: false,
  });
  
  // Handle file download
  const handleDownload = async (fileId) => {
    try {
      // Check for duplicates first
      setDownloadingFileId(fileId);
      
      // This would typically be a backend check to see if the user has downloaded similar files
      // Here we're simulating it with a frontend check
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      
      // Make API call to check for duplicates in download history
      const res = await fetch(`/api/files/${fileId}/check-duplicates`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to check for duplicates');
      
      const duplicateCheck = await res.json();
      
      // If duplicates found, show alert
      if (
        duplicateCheck.exact.length > 0 ||
        duplicateCheck.similar.length > 0 ||
        duplicateCheck.similarByMetadata.length > 0
      ) {
        setDuplicateData(duplicateCheck);
        setShowDuplicateAlert(true);
        return;
      }
      
      // No duplicates found, proceed with download
      downloadFile(fileId);
    } catch (error) {
      console.error('Error checking duplicates:', error);
      toast({
        title: 'Error',
        description: 'Failed to check for duplicate files',
        variant: 'destructive',
      });
    }
  };
  
  // Function to download file
  const downloadFile = async (fileId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      
      // Initiate file download
      window.location.href = `/api/files/${fileId}/download?token=${token}`;
      
      toast({
        title: 'Success',
        description: 'File download started',
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: 'Error',
        description: 'Failed to download file',
        variant: 'destructive',
      });
    } finally {
      setShowDuplicateAlert(false);
      setDownloadingFileId(null);
    }
  };
  
  // Handle view file details
  const handleViewDetails = (fileId) => {
    toast({
      title: 'File Details',
      description: `Viewing details for file ID: ${fileId}`,
    });
  };
  
  // Filter files by search term
  const filteredFiles = files?.filter((file) => 
    file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle download anyway
  const handleDownloadAnyway = () => {
    if (downloadingFileId) {
      downloadFile(downloadingFileId);
    }
  };
  
  // Handle compare files (placeholder)
  const handleCompareFiles = (fileId1, fileId2) => {
    toast({
      title: 'Compare Files',
      description: `Comparing files ${fileId1} and ${fileId2}`,
    });
  };
  
  return (
    <div className="p-4 md:p-6">
      {/* Header with search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-4 md:mb-0">Files</h2>
        
        <div className="w-full md:w-64 relative">
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant="outline" size="sm" className="rounded-full flex items-center">
          <SortDesc className="h-4 w-4 mr-1" />
          <span>Sort</span>
        </Button>
        <Button variant="outline" size="sm" className="rounded-full flex items-center">
          <Filter className="h-4 w-4 mr-1" />
          <span>Filter</span>
        </Button>
        <Button variant="outline" size="sm" className="rounded-full flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Date Range</span>
        </Button>
        <Button variant="outline" size="sm" className="rounded-full flex items-center">
          <FileType className="h-4 w-4 mr-1" />
          <span>File Type</span>
        </Button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="text-center my-8 p-4 bg-red-50 text-red-700 rounded-lg">
          Failed to load files. Please try again.
        </div>
      )}

      {/* File Grid */}
      {!isLoading && !isError && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFiles?.length > 0 ? (
            filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onDownload={handleDownload}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <div className="col-span-full text-center my-8 p-4 bg-gray-50 text-gray-500 rounded-lg">
              No files found. {searchTerm ? 'Try a different search term.' : 'Upload some files to get started.'}
            </div>
          )}
        </div>
      )}
      
      {/* Upload Button (Floating) */}
      <Link href="/upload">
        <Button 
          className="fixed bottom-16 md:bottom-6 right-6 bg-primary hover:bg-primary-dark text-white p-4 h-auto w-auto rounded-full shadow-lg"
          size="icon"
        >
          <Upload className="h-6 w-6" />
        </Button>
      </Link>
      
      {/* Duplicate Alert Modal */}
      <DuplicateAlert
        isOpen={showDuplicateAlert}
        onClose={() => setShowDuplicateAlert(false)}
        duplicates={duplicateData}
        onDownloadAnyway={handleDownloadAnyway}
        onViewFile={handleViewDetails}
        onCompareFiles={handleCompareFiles}
      />
    </div>
  );
}