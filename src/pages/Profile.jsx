import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-500">
            <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
              <div className="w-32 h-32 rounded-lg bg-white shadow-lg border-4 border-white flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">John Anderson</h1>
                <p className="text-blue-100">System Administrator</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="mt-20 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-900">John Anderson</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-gray-900">john.anderson@ddas.com</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Role</label>
                      <p className="text-gray-900">System Administrator</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                      <p className="text-gray-900">IT Operations</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      {[
                        { action: 'Updated system settings', time: '2 hours ago' },
                        { action: 'Resolved duplicate records', time: '4 hours ago' },
                        { action: 'Imported new dataset', time: '1 day ago' },
                        { action: 'Modified matching rules', time: '2 days ago' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                            <span className="text-gray-900">{activity.action}</span>
                          </div>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>

              {/* Settings & Stats */}
              <div className="space-y-8">
                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <button className="w-full px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-900 text-sm transition-colors flex items-center justify-between shadow-sm">
                        <span>Change Password</span>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="w-full px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-900 text-sm transition-colors flex items-center justify-between shadow-sm">
                        <span>Notification Settings</span>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                      <button className="w-full px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-900 text-sm transition-colors flex items-center justify-between shadow-sm">
                        <span>Privacy Settings</span>
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Stats</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Duplicates Resolved</span>
                          <span className="text-sm font-medium text-blue-600">89%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: '89%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Data Quality Score</span>
                          <span className="text-sm font-medium text-blue-600">94%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-500">Task Completion</span>
                          <span className="text-sm font-medium text-blue-600">78%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 