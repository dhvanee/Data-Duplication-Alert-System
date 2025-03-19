import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useToast } from '../hooks/use-toast';
import { FileCard, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Upload,
  Download,
  FileText,
  AlertTriangle,
  ChevronRight,
  Calendar,
  HardDrive,
  BarChart3,
  Users
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatFileSize } from '@/lib/utils';

export default function HomePage() {
  const { toast } = useToast();
  
  // Fetch files
  const { data: files, isLoading: filesLoading, isError: filesError } = useQuery({
    queryKey: ['/api/files'],
    refetchOnWindowFocus: false,
  });
  
  // Fetch download history
  const { data: downloads, isLoading: downloadsLoading, isError: downloadsError } = useQuery({
    queryKey: ['/api/user/downloads'],
    refetchOnWindowFocus: false,
  });
  
  // Calculate statistics
  const totalFiles = files?.length || 0;
  const totalDownloads = downloads?.length || 0;
  
  // Calculate storage used
  const storageUsed = files?.reduce((total, file) => {
    return total + (file.fileSize || 0);
  }, 0) || 0;
  
  // Get recent downloads
  const recentDownloads = downloads?.slice(0, 3) || [];
  
  // Calculate potential duplicates (simplified - in a real implementation this would come from the server)
  const potentialDuplicates = files?.filter((file, index, self) => {
    return self.findIndex((f) => f.fileType === file.fileType && f.id !== file.id) !== -1;
  })?.length || 0;
  
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-gray-800">Dashboard</h2>
        <p className="text-gray-500 mt-1">Welcome to the Data Download Duplication Alert System</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FileCard>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Files</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalFiles}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              From various departments and users
            </div>
          </CardContent>
        </FileCard>
        
        <FileCard>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatFileSize(storageUsed)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <HardDrive className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Total space consumed by all files
            </div>
          </CardContent>
        </FileCard>
        
        <FileCard>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Downloads</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{totalDownloads}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Download className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Files downloaded by users
            </div>
          </CardContent>
        </FileCard>
        
        <FileCard>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Potential Duplicates</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{potentialDuplicates}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              Files with similar content or metadata
            </div>
          </CardContent>
        </FileCard>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Overview */}
        <FileCard className="lg:col-span-2">
          <CardHeader>
            <CardTitle>DDAS Overview</CardTitle>
            <CardDescription>How the duplication alert system works</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">File Hashing</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    The system uses SHA-256 hashing to create a unique fingerprint for each file, 
                    allowing for exact duplicate detection regardless of filename.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Similarity Detection</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Beyond exact matches, the system analyzes file size, type, and metadata to 
                    identify potential duplicates that may have small differences.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Metadata Analysis</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Files with matching time periods, geographic regions, or subject domains
                    are flagged as potential duplicates, even if the content differs slightly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">User History</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    The system tracks download history to provide personalized alerts when a 
                    user tries to download a file similar to one they've already downloaded.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <BarChart3 className="h-4 w-4 mr-2" />
              View System Statistics
            </Button>
          </CardFooter>
        </FileCard>
        
        {/* Recent Downloads */}
        <FileCard>
          <CardHeader>
            <CardTitle>Recent Downloads</CardTitle>
            <CardDescription>Your latest file downloads</CardDescription>
          </CardHeader>
          <CardContent>
            {downloadsLoading ? (
              <div className="flex justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : downloadsError ? (
              <div className="py-6 text-center text-sm text-red-500">
                Failed to load download history
              </div>
            ) : recentDownloads.length > 0 ? (
              <div className="space-y-4">
                {recentDownloads.map((download) => (
                  <div key={download.id} className="flex items-center p-3 border rounded-lg">
                    <div className="bg-gray-100 p-2 rounded mr-3">
                      <FileText className="h-5 w-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {download.file?.fileName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(download.downloadedAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center text-sm text-gray-500">
                No download history available
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/history">
              <Button variant="outline" className="w-full">
                View All Downloads
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </FileCard>
      </div>
      
      {/* Quick Actions */}
      <div className="mt-6">
        <FileCard>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-medium text-gray-800">Ready to upload or find files?</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Upload new data or browse the file repository
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/files">
                  <Button variant="outline" className="min-w-[140px]">
                    <FileText className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button className="min-w-[140px] bg-primary hover:bg-primary-dark">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </FileCard>
      </div>
    </div>
  );
}