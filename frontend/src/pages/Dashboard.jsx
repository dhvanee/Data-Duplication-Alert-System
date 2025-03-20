<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
=======
import React, { useState, useEffect, useCallback } from 'react';
>>>>>>> 6c23f4688e0f6bfd5244de9ad3d627eaf174e91b
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
<<<<<<< HEAD
import { FileUp, FileDown, Search, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';
=======
import { Bar, Doughnut } from 'react-chartjs-2';
import { toast } from '../components/ui/use-toast';
import QuickActions from '../components/QuickActions';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders, handleApiError } from '../config/api';
import { Loader2 } from 'lucide-react';
>>>>>>> 6c23f4688e0f6bfd5244de9ad3d627eaf174e91b

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
<<<<<<< HEAD
    totalRecords: 475,
    duplicateRecords: 75,
    resolvedDuplicates: 30,
    lastUpdated: '2h ago'
=======
    totalRecords: 100,
    duplicateRecords: 20,
    resolvedDuplicates: 5,
    lastUpdated: new Date().toISOString()
>>>>>>> 6c23f4688e0f6bfd5244de9ad3d627eaf174e91b
  });
  const [monthlyData, setMonthlyData] = useState([65, 55, 80, 81, 56, 55, 40]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(30000);

<<<<<<< HEAD
  // Bar chart data
=======
  // Simplified fetch stats function
  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch(API_ENDPOINTS.STATS);
      
      if (!response.ok) {
        // Use sample data if API fails
        return;
      }

      const data = await response.json();
      
      if (data) {
        setStats({
          totalRecords: data.totalRecords || 100,
          duplicateRecords: data.duplicateRecords || 20,
          resolvedDuplicates: data.resolvedDuplicates || 5,
          lastUpdated: new Date().toISOString()
        });

        if (Array.isArray(data.monthlyStats)) {
          setMonthlyData(data.monthlyStats);
        }
      }

      setError(null);
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Just use sample data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Calculate distribution values with guaranteed non-negative numbers
  const uniqueRecords = Math.max(0, stats.totalRecords - stats.duplicateRecords);
  const potentialDuplicates = Math.max(0, stats.duplicateRecords - stats.resolvedDuplicates);
  const confirmedDuplicates = Math.max(0, stats.resolvedDuplicates);

  // Get last 7 months for the chart
  const getLastSevenMonths = () => {
    const months = [];
    const currentDate = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push(date.toLocaleString('default', { month: 'short' }));
    }
    return months;
  };

>>>>>>> 6c23f4688e0f6bfd5244de9ad3d627eaf174e91b
  const duplicateTrendsData = {
    labels: getLastSevenMonths(),
    datasets: [
      {
        label: 'Duplicates',
<<<<<<< HEAD
        data: [60, 55, 80, 81, 56, 55, 40],
=======
        data: monthlyData.length ? monthlyData : [65, 55, 80, 81, 56, 55, 40],
>>>>>>> 6c23f4688e0f6bfd5244de9ad3d627eaf174e91b
        backgroundColor: 'rgb(59, 130, 246)',
        borderRadius: 4,
      },
    ],
  };

<<<<<<< HEAD
=======
  const dataDistributionData = {
    labels: ['Unique Records', 'Potential Duplicates', 'Confirmed Duplicates'],
    datasets: [
      {
        data: [uniqueRecords || 75, potentialDuplicates || 15, confirmedDuplicates || 5],
        backgroundColor: [
          'rgb(59, 130, 246)',  // Blue for unique records
          'rgb(245, 158, 11)',  // Orange for potential duplicates
          'rgb(239, 68, 68)',   // Red for confirmed duplicates
        ],
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

>>>>>>> 6c23f4688e0f6bfd5244de9ad3d627eaf174e91b
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          stepSize: 20,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
<<<<<<< HEAD
    },
    plugins: {
      legend: {
        display: false,
=======
      y: {
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#111827',
          font: {
            family: "'Inter', sans-serif",
          },
          callback: function(value) {
            return value + (value === 1 ? ' record' : ' records');
          }
        },
        beginAtZero: true,
>>>>>>> 6c23f4688e0f6bfd5244de9ad3d627eaf174e91b
      },
    },
  };

  // Doughnut chart data
  const dataDistributionData = {
    labels: ['Unique Records', 'Potential Duplicates', 'Confirmed Duplicates'],
    datasets: [
      {
        data: [370, 75, 30],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(234, 179, 8)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const doughnutOptions = {
    cutout: '70%',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'center',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: '400'
          },
          color: '#4B5563',
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0) || 1;
            const percentage = Math.round((value / total) * 100);
            return `${context.label}: ${value} records (${percentage}%)`;
          }
        }
      }
    },
<<<<<<< HEAD
  };

  const handleUploadClick = () => {
    // Create a hidden file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        // Here you would typically handle the file upload
        toast({
          title: "Upload Started",
          description: `Uploading ${file.name}...`,
          duration: 3000,
        });
        // Navigate to data management page
        navigate('/data');
      }
    };
    input.click();
  };

  const handleExportClick = () => {
    toast({
      title: "Export Started",
      description: "Preparing your report for download...",
      duration: 3000,
    });
    // Here you would typically handle the export logic
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#'; // Replace with actual export URL
      link.download = 'duplicate-report.xlsx';
      link.click();
    }, 1000);
  };

  const handleReviewClick = () => {
    navigate('/duplicates');
  };

  const handleManageClick = () => {
    navigate('/data');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Demo User. Here's an overview of your data.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <h3 className="text-2xl font-semibold">{stats.totalRecords}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Search className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Duplicate Records</p>
              <h3 className="text-2xl font-semibold">{stats.duplicateRecords}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <Settings className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved Duplicates</p>
              <h3 className="text-2xl font-semibold">{stats.resolvedDuplicates}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <FileDown className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Last Updated</p>
              <h3 className="text-2xl font-semibold">{stats.lastUpdated}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Duplicates</h3>
          <div className="h-80">
            <Bar data={duplicateTrendsData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-4">Data Distribution</h3>
          <div className="flex justify-center items-center h-80">
            <div className="w-[300px] h-[300px] -mt-10">
              <Doughnut data={dataDistributionData} options={doughnutOptions} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <button
            onClick={handleUploadClick}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              <FileUp className="h-6 w-6 text-blue-500 mb-2" />
              <h4 className="font-medium">Upload Data</h4>
              <p className="text-sm text-gray-600">Import CSV or Excel</p>
            </div>
          </button>

          <button
            onClick={handleExportClick}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              <FileDown className="h-6 w-6 text-green-500 mb-2" />
              <h4 className="font-medium">Export Report</h4>
              <p className="text-sm text-gray-600">Download as Excel</p>
            </div>
          </button>

          <button
            onClick={handleReviewClick}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              <Search className="h-6 w-6 text-yellow-500 mb-2" />
              <h4 className="font-medium">Review Duplicates</h4>
              <p className="text-sm text-gray-600">45 duplicates found</p>
            </div>
          </button>

          <button
            onClick={handleManageClick}
            className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              <Settings className="h-6 w-6 text-purple-500 mb-2" />
              <h4 className="font-medium">Manage Data</h4>
              <p className="text-sm text-gray-600">View and edit records</p>
            </div>
          </button>
        </div>
=======
    cutout: '65%',
    animation: {
      animateRotate: true,
      animateScale: true
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="ml-2 text-lg text-gray-700">Loading dashboard...</span>
>>>>>>> 6c23f4688e0f6bfd5244de9ad3d627eaf174e91b
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => {
            setIsLoading(true);
            fetchStats();
          }}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Quick Actions Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <QuickActions stats={stats} />
      </section>

      {/* Statistics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Records</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalRecords.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleString() : 'Never'}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Duplicate Records</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.duplicateRecords.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">
            {((stats.duplicateRecords / stats.totalRecords) * 100).toFixed(1)}% of total records
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Resolved Duplicates</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.resolvedDuplicates.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-2">
            {((stats.resolvedDuplicates / stats.duplicateRecords) * 100).toFixed(1)}% resolution rate
          </p>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-4">Monthly Duplicates</h3>
          <div className="h-80">
            <Bar data={duplicateTrendsData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-4">Data Distribution</h3>
          <div className="h-80">
            <Doughnut data={dataDistributionData} options={doughnutOptions} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard; 
