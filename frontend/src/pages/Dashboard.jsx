import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
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
import { FileUp, FileDown, Search, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/ui/use-toast';

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
    totalRecords: 475,
    duplicateRecords: 75,
    resolvedDuplicates: 30,
    lastUpdated: '2h ago'
  });

  // Bar chart data
  const duplicateTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Duplicates',
        data: [60, 55, 80, 81, 56, 55, 40],
        backgroundColor: 'rgb(59, 130, 246)',
        borderRadius: 4,
      },
    ],
  };

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
    },
    plugins: {
      legend: {
        display: false,
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
    },
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
      </div>
    </div>
  );
};

export default Dashboard; 
