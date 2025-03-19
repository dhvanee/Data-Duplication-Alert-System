import React, { useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Upload } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const DownloadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const { token } = useAuth();
  const { toast } = useToast();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      toast({
        title: "Success",
        description: "File uploaded successfully"
      });
      
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
      
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file">Upload File</Label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>
        <Button type="submit" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload
        </Button>
      </form>
    </Card>
  );
};

export default DownloadForm;
