import React from 'react';

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-400">
            <div className="absolute -bottom-16 left-8 flex items-end space-x-6">
              <div className="w-32 h-32 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-400/10 border-4 border-[#0f172a] flex items-center justify-center">
                <svg className="w-16 h-16 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">John Anderson</h1>
                <p className="text-blue-200">System Administrator</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="mt-20 p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Personal Information */}
              <div className="lg:col-span-2 space-y-8">
                <section>
                  <h2 className="text-lg font-semibold text-white mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                      <p className="text-white">John Anderson</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Email</label>
                      <p className="text-white">john.anderson@ddas.com</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Role</label>
                      <p className="text-white">System Administrator</p>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">Department</label>
                      <p className="text-white">IT Operations</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {[
                      { action: 'Updated system settings', time: '2 hours ago' },
                      { action: 'Resolved duplicate records', time: '4 hours ago' },
                      { action: 'Imported new dataset', time: '1 day ago' },
                      { action: 'Modified matching rules', time: '2 days ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                          <span className="text-white">{activity.action}</span>
                        </div>
                        <span className="text-sm text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Settings & Stats */}
              <div className="space-y-8">
                <section>
                  <h2 className="text-lg font-semibold text-white mb-4">Account Settings</h2>
                  <div className="space-y-4">
                    <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors flex items-center justify-between">
                      <span>Change Password</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors flex items-center justify-between">
                      <span>Notification Settings</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    <button className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors flex items-center justify-between">
                      <span>Privacy Settings</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-4">Activity Stats</h2>
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Duplicates Resolved</span>
                        <span className="text-sm font-medium text-blue-400">89%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Data Quality Score</span>
                        <span className="text-sm font-medium text-blue-400">94%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Task Completion</span>
                        <span className="text-sm font-medium text-blue-400">78%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
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