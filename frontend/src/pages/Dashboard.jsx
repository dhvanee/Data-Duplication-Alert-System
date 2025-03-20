import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
<<<<<<< HEAD
  const [selectedRange, setSelectedRange] = useState('7days');
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState({
    totalDuplicates: 0,
    resolved: 0,
    pending: 0
  });

  // Mock data for different time ranges
  const mockData = {
    '7days': {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [65, 55, 80, 81, 56, 55, 40],
      stats: {
        totalDuplicates: 2847,
        resolved: 1923,
        pending: 924,
        totalChange: '+12.5%',
        resolvedChange: '+8.2%',
        pendingChange: '-2.4%'
      }
    },
    'month': {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      values: [75, 65, 85, 70],
      stats: {
        totalDuplicates: 3256,
        resolved: 2150,
        pending: 1106,
        totalChange: '+15.2%',
        resolvedChange: '+10.5%',
        pendingChange: '-5.8%'
      }
    },
    'custom': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [45, 60, 75, 70, 85, 80],
      stats: {
        totalDuplicates: 4521,
        resolved: 3250,
        pending: 1271,
        totalChange: '+18.7%',
        resolvedChange: '+12.3%',
        pendingChange: '-8.2%'
      }
    }
=======
  const [stats, setStats] = useState({
    totalRecords: 0,
    duplicateRecords: 0,
    resolvedDuplicates: 0,
    lastUpdated: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/records/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const duplicateTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Duplicates',
        data: [65, 55, 80, 81, 56, 55, 40],
        backgroundColor: 'rgb(59, 130, 246)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
>>>>>>> 613ad7caadd552286172dfa29eed2c60d555e84f
  };

  useEffect(() => {
    // Update chart data when range changes
    const data = mockData[selectedRange];
    if (data) {
      setChartData({
        labels: data.labels,
        datasets: [
          {
            label: 'Duplicates',
            data: data.values,
            backgroundColor: 'rgb(59, 130, 246)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      });
      setStats(data.stats);
    }
  }, [selectedRange]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgb(255, 255, 255)',
        titleColor: 'rgb(17, 24, 39)',
        bodyColor: 'rgb(17, 24, 39)',
        borderColor: 'rgb(229, 231, 235)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          title: (context) => context[0].label,
          label: (context) => `Duplicates: ${context.raw}`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#111827',
          font: {
            family: "'Inter', sans-serif",
          },
        },
      },
      y: {
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#111827',
          font: {
            family: "'Inter', sans-serif",
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back. Here's an overview of your data.</p>
        </div>

<<<<<<< HEAD
        {/* Date Range Selector */}
        <div className="mb-8 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedRange('7days')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRange === '7days'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setSelectedRange('month')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRange === 'month'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Last Month
            </button>
            <button
              onClick={() => setSelectedRange('custom')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedRange === 'custom'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Custom Range
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Total Duplicates</h3>
              <span className="text-green-500 text-sm">{mockData[selectedRange].stats.totalChange}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{stats.totalDuplicates.toLocaleString()}</p>
            <div className="mt-4 h-2 bg-gray-200 rounded">
              <div className="h-2 bg-blue-600 rounded" style={{ width: '75%' }}></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Resolved</h3>
              <span className="text-green-500 text-sm">{mockData[selectedRange].stats.resolvedChange}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{stats.resolved.toLocaleString()}</p>
            <div className="mt-4 h-2 bg-gray-200 rounded">
              <div className="h-2 bg-green-500 rounded" style={{ width: '65%' }}></div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-500 text-sm">Pending</h3>
              <span className="text-red-500 text-sm">{mockData[selectedRange].stats.pendingChange}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900 mt-2">{stats.pending.toLocaleString()}</p>
            <div className="mt-4 h-2 bg-gray-200 rounded">
              <div className="h-2 bg-yellow-500 rounded" style={{ width: '35%' }}></div>
=======
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Records</div>
                <div className="text-2xl font-semibold text-gray-900">{stats.totalRecords}</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600">Duplicate Records</div>
                <div className="text-2xl font-semibold text-gray-900">{stats.duplicateRecords}</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600">Resolved Duplicates</div>
                <div className="text-2xl font-semibold text-gray-900">{stats.resolvedDuplicates}</div>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-600">Last Updated</div>
                <div className="text-2xl font-semibold text-gray-900">
                  {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Never'}
                </div>
              </div>
>>>>>>> 613ad7caadd552286172dfa29eed2c60d555e84f
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Duplicate Trends</h2>
            <div className="h-[300px]">
              {chartData && <Bar data={chartData} options={chartOptions} />}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribution</h2>
            <div className="h-[300px]">
              <Doughnut
                data={{
                  labels: ['Unique Records', 'Potential Duplicates', 'Confirmed Duplicates'],
                  datasets: [{
                    data: [84, 11, 5],
                    backgroundColor: [
                      'rgb(59, 130, 246)',
                      'rgb(245, 158, 11)',
                      'rgb(239, 68, 68)',
                    ],
                    borderWidth: 0,
                  }],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        padding: 20,
                        usePointStyle: true,
                      },
                    },
                  },
                  cutout: '70%',
                }}
              />
            </div>
          </div>
        </div>

        <footer className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-xl font-semibold text-gray-900">DDAS</span>
              </div>
              <p className="text-gray-600 text-sm">Eliminate duplicate data and optimize storage with our intuitive data management solution.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">How it works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-gray-900">About us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@ddas.com" className="text-gray-600 hover:text-gray-900">info@ddas.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+1(234)567-890" className="text-gray-600 hover:text-gray-900">+1 (234) 567-890</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <a href="#" className="text-gray-600 hover:text-gray-900">Live chat</a>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard; 
