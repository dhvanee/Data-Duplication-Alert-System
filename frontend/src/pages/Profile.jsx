import { useState, useEffect } from 'react';
import { toast } from '../components/ui/use-toast';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    duplicateAlerts: true,
    systemUpdates: true,
    activitySummary: false
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      // Ensure dates are properly parsed
      if (parsedUser.createdAt) {
        parsedUser.createdAt = new Date(parsedUser.createdAt);
      }
      if (parsedUser.lastLogin) {
        parsedUser.lastLogin = new Date(parsedUser.lastLogin);
      }
      setUser(parsedUser);
    }
    setIsLoading(false);
  }, []);

  const formatDate = (date) => {
    if (!date) return 'Not available';
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "New passwords do not match",
        duration: 3000,
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      toast({
        title: "Success",
        description: "Password changed successfully",
        duration: 3000,
      });
      setShowChangePassword(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to change password",
        duration: 3000,
      });
    }
  };

  const handleNotificationChange = async (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));

    try {
      const response = await fetch('http://localhost:5000/api/user/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          [setting]: !notificationSettings[setting]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update notification settings');
      }

      toast({
        title: "Success",
        description: "Notification settings updated",
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update notification settings",
        duration: 3000,
      });
      // Revert the change if the API call fails
      setNotificationSettings(prev => ({
        ...prev,
        [setting]: !prev[setting]
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
            <div className="absolute -bottom-16 left-8">
              <div className="flex items-center">
                <div className="h-32 w-32 rounded-full border-4 border-white bg-white shadow-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-blue-600">
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="mt-20 px-8 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Personal Info & Activity */}
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'User'}</h1>
                  <p className="text-gray-500">{user?.email || 'No email provided'}</p>
                </div>

                <section className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                      <p className="text-gray-900 font-medium">{user?.name || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                      <p className="text-gray-900 font-medium">{user?.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Account Created</label>
                      <p className="text-gray-900 font-medium">
                        {formatDate(user?.createdAt)}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-1">Last Login</label>
                      <p className="text-gray-900 font-medium">
                        {formatDate(user?.lastLogin)}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span className="text-gray-900">Logged in successfully</span>
                        </div>
                        <span className="text-sm text-gray-500">Just now</span>
                      </div>
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span className="text-gray-900">Profile updated</span>
                        </div>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column - Settings */}
              <div>
                <section className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <button
                        onClick={() => setShowChangePassword(!showChangePassword)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between shadow-sm"
                      >
                        <span className="font-medium">Change Password</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {showChangePassword && (
                        <form onSubmit={handlePasswordChange} className="mt-4 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
                          <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                              Current Password
                            </label>
                            <input
                              type="password"
                              id="currentPassword"
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                              New Password
                            </label>
                            <input
                              type="password"
                              id="newPassword"
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              id="confirmPassword"
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              required
                            />
                          </div>
                          <div className="flex justify-end space-x-3">
                            <button
                              type="button"
                              onClick={() => setShowChangePassword(false)}
                              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                            >
                              Change Password
                            </button>
                          </div>
                        </form>
                      )}

                      <button
                        onClick={() => setShowNotificationSettings(!showNotificationSettings)}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-between shadow-sm"
                      >
                        <span className="font-medium">Notification Settings</span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {showNotificationSettings && (
                        <div className="mt-4 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
                          <div className="space-y-4">
                            {[
                              {
                                id: 'emailNotifications',
                                title: 'Email Notifications',
                                description: 'Receive email updates about your account'
                              },
                              {
                                id: 'duplicateAlerts',
                                title: 'Duplicate Alerts',
                                description: 'Get notified when duplicates are found'
                              },
                              {
                                id: 'systemUpdates',
                                title: 'System Updates',
                                description: 'Stay informed about system changes'
                              },
                              {
                                id: 'activitySummary',
                                title: 'Activity Summary',
                                description: 'Weekly summary of your activity'
                              }
                            ].map((setting) => (
                              <div key={setting.id} className="flex items-center justify-between py-2">
                                <div>
                                  <h3 className="text-sm font-medium text-gray-900">{setting.title}</h3>
                                  <p className="text-sm text-gray-500">{setting.description}</p>
                                </div>
                                <button
                                  onClick={() => handleNotificationChange(setting.id)}
                                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    notificationSettings[setting.id] ? 'bg-blue-600' : 'bg-gray-200'
                                  }`}
                                >
                                  <span
                                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                      notificationSettings[setting.id] ? 'translate-x-5' : 'translate-x-0'
                                    }`}
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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