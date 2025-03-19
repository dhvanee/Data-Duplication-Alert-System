import { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import { useToast } from '../hooks/use-toast';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { FileCard, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { DuplicateAlert } from '../components/ui/duplicate-alert';
import { Upload, Calendar, MapPin, AlertCircle } from 'lucide-react';

const uploadSchema = z.object({
  file: z.any().refine((file) => file?.length > 0, 'File is required'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  spatialDomain: z.string().optional(),
});

export default function UploadPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);
  const [duplicateData, setDuplicateData] = useState({
    exact: [],
    similar: [],
    similarByMetadata: []
  });
  const fileInputRef = useRef(null);
  
  const form = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      file: undefined,
      startDate: '',
      endDate: '',
      spatialDomain: '',
    },
  });
  
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      form.setValue('file', files);
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      form.setValue('file', files);
    }
  };
  
  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      
      if (!data.file || !data.file[0]) {
        toast({
          title: 'Error',
          description: 'Please select a file to upload',
          variant: 'destructive',
        });
        return;
      }
      
      // Create form data
      const formData = new FormData();
      formData.append('file', data.file[0]);
      
      // Add metadata if provided
      const metadata = {
        period: {
          startDate: data.startDate || undefined,
          endDate: data.endDate || undefined,
        },
        spatialDomain: data.spatialDomain || undefined,
      };
      
      formData.append('metadata', JSON.stringify(metadata));
      
      // Check for duplicates first
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      
      const checkResponse = await fetch('/api/files/check-duplicates', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!checkResponse.ok) {
        throw new Error('Failed to check for duplicates');
      }
      
      const duplicateCheck = await checkResponse.json();
      
      // If exact duplicates found, show alert and don't upload
      if (duplicateCheck.exact.length > 0) {
        setDuplicateData(duplicateCheck);
        setShowDuplicateAlert(true);
        return;
      }
      
      // If similar files found, also show alert but allow continuing
      if (duplicateCheck.similar.length > 0 || duplicateCheck.similarByMetadata.length > 0) {
        setDuplicateData(duplicateCheck);
        setShowDuplicateAlert(true);
        return;
      }
      
      // No duplicates found, proceed with upload
      await uploadFile(formData);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'An error occurred during upload',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const uploadFile = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Not authenticated');
      
      const uploadResponse = await fetch('/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file');
      }
      
      const result = await uploadResponse.json();
      
      toast({
        title: 'Success',
        description: 'File uploaded successfully',
      });
      
      // If similar files were detected after upload
      if (result.similarFiles) {
        toast({
          title: 'Notice',
          description: 'Similar files were detected in the system',
        });
      }
      
      // Redirect to files page
      setLocation('/files');
    } catch (error) {
      throw error;
    }
  };
  
  // Handle upload anyway after duplicate check
  const handleUploadAnyway = async () => {
    if (!selectedFile) return;
    
    try {
      setIsUploading(true);
      
      // Create form data
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      // Add metadata if provided
      const metadata = {
        period: {
          startDate: form.getValues('startDate') || undefined,
          endDate: form.getValues('endDate') || undefined,
        },
        spatialDomain: form.getValues('spatialDomain') || undefined,
      };
      
      formData.append('metadata', JSON.stringify(metadata));
      
      await uploadFile(formData);
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'An error occurred during upload',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
      setShowDuplicateAlert(false);
    }
  };
  
  // Handle view file details (placeholder)
  const handleViewFileDetails = (fileId) => {
    toast({
      title: 'File Details',
      description: `Viewing details for file ID: ${fileId}`,
    });
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
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Upload File</h2>
      
      <FileCard className="mb-6">
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>
            Upload a file to the system. We'll check for duplicates before saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <div 
                        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer 
                        ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input 
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        
                        <div className="flex flex-col items-center justify-center py-4">
                          <Upload className="h-12 w-12 text-gray-400 mb-2" />
                          {selectedFile ? (
                            <div>
                              <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                              <p className="text-xs text-gray-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                Drag and drop a file, or click to select
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                Supported formats: CSV, XLS, XLSX, PDF, TXT, ZIP, etc.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Metadata improves duplicate detection</p>
                    <p className="text-xs text-blue-600 mt-1">
                      Adding metadata helps the system identify similar files and reduces duplicate downloads.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-md font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Temporal Information
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs">
                            When the data begins
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs">
                            When the data ends
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-md font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Spatial Information
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="spatialDomain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Domain/Region</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Climate Research, North America" {...field} />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Subject domain or geographic region
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isUploading || !selectedFile}
              >
                {isUploading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Uploading...
                  </div>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </FileCard>
      
      {/* Duplicate Alert Modal */}
      <DuplicateAlert
        isOpen={showDuplicateAlert}
        onClose={() => setShowDuplicateAlert(false)}
        duplicates={duplicateData}
        onDownloadAnyway={handleUploadAnyway}
        onViewFile={handleViewFileDetails}
        onCompareFiles={handleCompareFiles}
      />
    </div>
  );
}