import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDuplicates } from '../services/dataService';
import { toast } from '../components/ui/use-toast';

const DataDuplication = () => {
  const [duplicates, setDuplicates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchDuplicates = async () => {
      try {
        const data = location.state?.duplicates || await getDuplicates();
        setDuplicates(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to fetch duplicates",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDuplicates();
  }, [location.state]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Review Duplicates</h1>
      
      {duplicates.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No duplicates found</h3>
          <p className="text-gray-500">Your data is clean and free of duplicates.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {duplicates.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-r pr-6">
                  <h3 className="font-semibold text-lg mb-4">Original Record</h3>
                  <RecordDetails record={item.original} />
                </div>
                <div className="pl-6">
                  <h3 className="font-semibold text-lg mb-4">Duplicate Record</h3>
                  <RecordDetails record={item.duplicate} />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDeleteDuplicate(item.duplicate._id)}
                >
                  Delete Duplicate
                </button>
                <button
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  onClick={() => handleMergeDuplicates(item)}
                >
                  Merge Records
                </button>
                <button
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  onClick={() => handleKeepBoth(item)}
                >
                  Keep Both
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
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