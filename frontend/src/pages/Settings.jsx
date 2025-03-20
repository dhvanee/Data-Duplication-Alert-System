import React, { useState } from 'react';

const Settings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dailyReports, setDailyReports] = useState(false);
  const [matchingThreshold, setMatchingThreshold] = useState(80);
  const [nameWeight, setNameWeight] = useState(70);
  const [emailWeight, setEmailWeight] = useState(90);
  const [phoneWeight, setPhoneWeight] = useState(60);
  const [addressWeight, setAddressWeight] = useState(50);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-600">Configure your duplicate detection preferences and notification settings.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Duplicate Detection Settings */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-medium text-gray-900">Duplicate Detection Settings</h2>
              <p className="mt-1 text-sm text-gray-600">Adjust how the system identifies and handles duplicate records.</p>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-900">Matching Threshold</label>
                <p className="text-sm text-gray-600 mb-2">Records with similarity above this threshold will be flagged as potential duplicates.</p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={matchingThreshold}
                    onChange={(e) => setMatchingThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-900 min-w-[3rem]">{matchingThreshold}%</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-900">Field Weights</label>
                <p className="text-sm text-gray-600">Adjust the importance of each field in duplicate detection.</p>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-gray-600">Name</label>
                    <span className="text-sm text-gray-900">{nameWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={nameWeight}
                    onChange={(e) => setNameWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-gray-600">Email</label>
                    <span className="text-sm text-gray-900">{emailWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={emailWeight}
                    onChange={(e) => setEmailWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-gray-600">Phone</label>
                    <span className="text-sm text-gray-900">{phoneWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={phoneWeight}
                    onChange={(e) => setPhoneWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-gray-600">Address</label>
                    <span className="text-sm text-gray-900">{addressWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={addressWeight}
                    onChange={(e) => setAddressWeight(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-base font-medium text-gray-900">Notification Preferences</h2>
              <p className="mt-1 text-sm text-gray-600">Choose how you want to be notified about duplicate records.</p>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Email Notifications</label>
                  <p className="text-sm text-gray-600">Get notified when new duplicates are found.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      emailNotifications ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-900">Daily Reports</label>
                  <p className="text-sm text-gray-600">Receive a daily summary of duplicate activity.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setDailyReports(!dailyReports)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    dailyReports ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      dailyReports ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 