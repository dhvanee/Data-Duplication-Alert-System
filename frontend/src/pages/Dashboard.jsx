import React, { useState, useEffect, useCallback } from 'react';
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
import { toast } from '../components/ui/use-toast';
import QuickActions from '../components/QuickActions';
import { API_BASE_URL, API_ENDPOINTS, getAuthHeaders, handleApiError } from '../config/api';
import { Loader2 } from 'lucide-react';

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
  const [stats, setStats] = useState({
    totalRecords: 100,
    duplicateRecords: 20,
    resolvedDuplicates: 5,
    lastUpdated: new Date().toISOString()
  });
  const [monthlyData, setMonthlyData] = useState([65, 55, 80, 81, 56, 55, 40]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState(30000);

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

  const duplicateTrendsData = {
    labels: getLastSevenMonths(),
    datasets: [
      {
        label: 'Duplicates',
        data: monthlyData.length ? monthlyData : [65, 55, 80, 81, 56, 55, 40],
        backgroundColor: 'rgb(59, 130, 246)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#111827',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
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
          callback: function(value) {
            return value + (value === 1 ? ' record' : ' records');
          }
        },
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#111827',
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          padding: 20,
          usePointStyle: true,
        },
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
