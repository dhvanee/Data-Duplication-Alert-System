import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from '../hooks/use-toast';
import { FileCard, CardContent } from '../components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { FileIcon, Clock, Search, User, Download, Eye, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatFileSize } from '@/lib/utils';

export default function HistoryPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch user download history
  const { data: downloads, isLoading, isError } = useQuery({
    queryKey: ['/api/user/downloads'],
    refetchOnWindowFocus: false,
  });
  
  // Function to handle file download
  const handleDownload = async (fileId) => {
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
    }
  };
  
  // Handle view file details
  const handleViewDetails = (fileId) => {
    toast({
      title: 'File Details',
      description: `Viewing details for file ID: ${fileId}`,
    });
  };
  
  // Filter downloads by search term
  const filteredDownloads = downloads?.filter((download) => 
    download.file?.fileName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-4 md:mb-0">Download History</h2>
        
        <div className="w-full md:w-64 relative">
          <Input
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
      </div>
      
      <FileCard>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : isError ? (
            <div className="text-center my-8 p-4 bg-red-50 text-red-700">
              Failed to load download history. Please try again.
            </div>
          ) : filteredDownloads?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Downloaded</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDownloads.map((download) => (
                  <TableRow key={download.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FileIcon className="h-4 w-4 mr-2 text-primary" />
                        <span className="truncate max-w-[200px]">{download.file?.fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{download.file?.fileType}</TableCell>
                    <TableCell>{formatFileSize(download.file?.fileSize || 0)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{formatDistanceToNow(new Date(download.downloadedAt), { addSuffix: true })}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleViewDetails(download.file?.id || 0)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDownload(download.file?.id || 0)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center my-8 p-4">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-2" />
              <h3 className="text-lg font-medium text-gray-700">No download history</h3>
              <p className="text-gray-500 mt-1">
                {searchTerm ? 'No results found for your search.' : 'You have not downloaded any files yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </FileCard>
    </div>
  );
}