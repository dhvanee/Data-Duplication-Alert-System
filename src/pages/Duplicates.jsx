import React, { useState } from 'react';

const Duplicates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const duplicateSets = [
    {
      id: 1,
      name: 'John Smith',
      records: 2,
      similarity: 85,
      status: 'pending'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      records: 2,
      similarity: 78,
      status: 'pending'
    },
    {
      id: 3,
      name: 'Jane Doe',
      records: 2,
      similarity: 72,
      status: 'pending'
    }
  ];

  const selectedDuplicate = {
    record1: {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '555-123-4567',
      city: 'New York'
    },
    record2: {
      id: 4,
      name: 'John Smith',
      email: 'john.smith2@example.com',
      phone: '555-444-5555',
      city: 'New York'
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Duplicate Detection</h1>
          <p className="mt-1 text-sm text-gray-600">Identify and resolve duplicate records in your database.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Duplicate Sets */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-medium text-gray-900">Duplicate Sets</h2>
                <p className="mt-1 text-sm text-gray-600">{duplicateSets.length} potential duplicates identified</p>
              </div>

              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {['all', 'pending', 'resolved'].map((tab) => (
                    <button
                      key={tab}
                      className={`flex-1 px-4 py-2 text-sm font-medium text-center ${
                        selectedTab === tab
                          ? 'border-b-2 border-blue-500 text-blue-600'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="divide-y divide-gray-200">
                {duplicateSets.map((set) => (
                  <div
                    key={set.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-900">{set.name}</span>
                      <span className="text-sm text-gray-500">{set.similarity}% similar</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{set.records} records</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <button className="w-full inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Adjust Detection Settings
                </button>
              </div>
            </div>
          </div>

          {/* Duplicate Comparison */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-base font-medium text-gray-900">Duplicate Comparison</h2>
                <p className="mt-1 text-sm text-gray-600">Compare and resolve potential duplicate records</p>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Record 1</h3>
                    <dl className="space-y-3">
                      {Object.entries(selectedDuplicate.record1).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-xs font-medium text-gray-500 uppercase">{key}</dt>
                          <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Record 2</h3>
                    <dl className="space-y-3">
                      {Object.entries(selectedDuplicate.record2).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-xs font-medium text-gray-500 uppercase">{key}</dt>
                          <dd className="mt-1 text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 rounded-lg p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Recommended Action</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>These records appear to be duplicates. We recommend merging them into a single record, keeping the most detailed information from each.</p>
                      </div>
                      <div className="mt-2">
                        <div className="flex space-x-2 text-sm">
                          <span className="font-medium text-blue-800">Similarity Score:</span>
                          <span className="text-blue-700">85%</span>
                          <span className="text-blue-700">•</span>
                          <span className="text-blue-700">Comparing 2 records</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Not Duplicates
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                    Merge Records
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Duplicates; 