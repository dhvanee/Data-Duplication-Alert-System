import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Progress } from '../../components/ui/progress';
import { Button } from '../../components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { formatFileSize } from "../../lib/utils";
import { AlertCircle, CheckCircle, Calendar, FileType, Download, Eye, GitCompare } from 'lucide-react';

export function DuplicateAlert({ 
  isOpen, 
  onClose, 
  duplicates, 
  onDownloadAnyway,
  onViewFile,
  onCompareFiles
}) {
  const [currentFile, setCurrentFile] = useState(null);
  
  const hasExactDuplicates = duplicates?.exact?.length > 0;
  const hasSimilarFiles = duplicates?.similar?.length > 0 || duplicates?.similarByMetadata?.length > 0;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex items-center flex-row">
          <span className="material-icons text-2xl text-accent mr-3">priority_high</span>
          <DialogTitle className="text-xl">
            Potential Duplicate File Alert
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto py-4">
          <div className="bg-amber-50 border-l-4 border-accent rounded-r-md p-4 mb-6">
            <p className="text-amber-800">
              We've detected potential duplicate or similar files in the system. Please review before downloading.
            </p>
          </div>
          
          {/* Exact Duplicates Section */}
          {hasExactDuplicates && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-700 mb-3">
                Duplicate Files (100% match)
              </h4>
              
              {duplicates.exact.map((file) => (
                <div key={file.id} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
                  <div className="flex items-start">
                    <span className="material-icons text-error mr-3">content_copy</span>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h5 className="font-medium text-gray-800">{file.fileName}</h5>
                        <span className="inline-flex items-center text-xs bg-red-100 text-red-800 rounded-full px-2 py-1">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Exact Match
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                        <div className="text-sm">
                          <span className="text-gray-500">Uploaded by:</span> 
                          <span className="text-gray-700">
                            {typeof file.uploadedBy === 'object' ? file.uploadedBy.username : 'Unknown'}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Date:</span> 
                          <span className="text-gray-700">
                            {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Size:</span> 
                          <span className="text-gray-700">{formatFileSize(file.fileSize)}</span>
                        </div>
                      </div>
                      
                      <div className="flex mt-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs mr-3 text-primary hover:text-primary-dark flex items-center"
                          onClick={() => onViewFile(file.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span>View File</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-primary hover:text-primary-dark flex items-center"
                          onClick={() => {
                            setCurrentFile(file);
                            onDownloadAnyway();
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          <span>Download Anyway</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Similar Files Section */}
          {hasSimilarFiles && (
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-3 mt-6">Similar Files</h4>
              
              {/* Size-similar files */}
              {duplicates.similar && duplicates.similar.map((file) => (
                <div key={file.id} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
                  <div className="flex items-start">
                    <span className="material-icons text-accent mr-3">find_in_page</span>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h5 className="font-medium text-gray-800">{file.fileName}</h5>
                        <div className="flex items-center flex-wrap">
                          {file.similarityReason?.map((reason, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-1 mr-2 mb-1"
                            >
                              <FileType className="h-3 w-3 mr-1" />
                              <span>{reason}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                        <div className="text-sm">
                          <span className="text-gray-500">Uploaded by:</span> 
                          <span className="text-gray-700">
                            {typeof file.uploadedBy === 'object' ? file.uploadedBy.username : 'Unknown'}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Date:</span> 
                          <span className="text-gray-700">
                            {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Size:</span> 
                          <span className="text-gray-700">{formatFileSize(file.fileSize)}</span>
                        </div>
                      </div>
                      
                      {/* Similarity Score */}
                      {file.similarityScore && (
                        <div className="mt-3">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Similarity Score:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                              <Progress value={file.similarityScore * 100} className="h-2" />
                            </div>
                            <span className="text-sm font-medium ml-2">
                              {Math.round(file.similarityScore * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex mt-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs mr-3 text-primary hover:text-primary-dark flex items-center"
                          onClick={() => {
                            if (currentFile) {
                              onCompareFiles(currentFile.id, file.id);
                            }
                          }}
                        >
                          <GitCompare className="h-4 w-4 mr-1" />
                          <span>Compare Files</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs mr-3 text-primary hover:text-primary-dark flex items-center"
                          onClick={() => onViewFile(file.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span>View File</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-primary hover:text-primary-dark flex items-center"
                          onClick={() => {
                            setCurrentFile(file);
                            onDownloadAnyway();
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          <span>Download Anyway</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Metadata-similar files */}
              {duplicates.similarByMetadata && duplicates.similarByMetadata.map((file) => (
                <div key={file.id} className="bg-white border rounded-lg p-4 mb-4 shadow-sm">
                  <div className="flex items-start">
                    <span className="material-icons text-accent mr-3">find_in_page</span>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <h5 className="font-medium text-gray-800">{file.fileName}</h5>
                        <div className="flex items-center flex-wrap">
                          {file.metadataMatches?.map((match, index) => (
                            <span 
                              key={index} 
                              className="inline-flex items-center text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-1 mr-2 mb-1"
                            >
                              <Calendar className="h-3 w-3 mr-1" />
                              <span>{match}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
                        <div className="text-sm">
                          <span className="text-gray-500">Uploaded by:</span> 
                          <span className="text-gray-700">
                            {typeof file.uploadedBy === 'object' ? file.uploadedBy.username : 'Unknown'}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Date:</span> 
                          <span className="text-gray-700">
                            {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Size:</span> 
                          <span className="text-gray-700">{formatFileSize(file.fileSize)}</span>
                        </div>
                      </div>
                      
                      {/* Metadata information */}
                      {file.metadata && (
                        <div className="mt-3 text-sm">
                          <span className="text-gray-500">Metadata Match:</span>
                          {file.metadata.period && (
                            <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                              Period: {file.metadata.period.startDate} to {file.metadata.period.endDate}
                            </span>
                          )}
                          {file.metadata.spatialDomain && (
                            <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-xs">
                              Domain: {file.metadata.spatialDomain}
                            </span>
                          )}
                        </div>
                      )}
                      
                      {/* Similarity Score */}
                      {file.similarityScore && (
                        <div className="mt-3">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-2">Similarity Score:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                              <Progress value={file.similarityScore * 100} className="h-2" />
                            </div>
                            <span className="text-sm font-medium ml-2">
                              {Math.round(file.similarityScore * 100)}%
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex mt-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs mr-3 text-primary hover:text-primary-dark flex items-center"
                          onClick={() => {
                            if (currentFile) {
                              onCompareFiles(currentFile.id, file.id);
                            }
                          }}
                        >
                          <GitCompare className="h-4 w-4 mr-1" />
                          <span>Compare Files</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs mr-3 text-primary hover:text-primary-dark flex items-center"
                          onClick={() => onViewFile(file.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          <span>View File</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-primary hover:text-primary-dark flex items-center"
                          onClick={() => {
                            setCurrentFile(file);
                            onDownloadAnyway();
                          }}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          <span>Download Anyway</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onDownloadAnyway}>
            Download Anyway
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}