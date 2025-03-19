import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useAuth } from "../hooks/use-auth";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const FileList = () => {
  const { toast } = useToast();

  const { token } = useAuth();

  const {
    data: files,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["/api/files"],
    queryFn: async () => {
      const response = await fetch("/api/files", {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      if (!response.ok) throw new Error("Failed to fetch files");
      return response.json();
    },
  });

  const handleDownload = async (fileId) => {
    try {
      const response = await fetch(`/api/files/${fileId}/download`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to download file');
      // Create a blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = files.find(f => f._id === fileId)?.fileName || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download file",
        variant: "destructive",
      });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Uploaded By</TableHead>
          <TableHead>Downloads</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files?.map((file) => (
          <TableRow key={file._id}>
            <TableCell>{file.fileName}</TableCell>
            <TableCell>{(file.fileSize / 1024).toFixed(2)} KB</TableCell>
            <TableCell>{file.fileType}</TableCell>
            <TableCell>{file.uploadedBy.username}</TableCell>
            <TableCell>{file.downloadCount}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDownload(file._id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default FileList;
