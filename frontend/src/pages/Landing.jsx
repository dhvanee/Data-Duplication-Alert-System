import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Shield,
  Database,
  ArrowRight,
  Play,
  LineChart,
  Settings,
  Users
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { motion } from 'framer-motion';

const Landing = () => {
  const features = [
    {
      icon: <Database className="w-8 h-8 text-blue-600" />,
      title: 'Smart Detection',
      description: 'Advanced algorithms identify duplicates with 99.9% accuracy using machine learning'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: 'Enterprise Security',
      description: 'Bank-grade encryption and compliance with industry security standards'
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: 'Real-time Processing',
      description: 'Process millions of records in seconds with our distributed architecture'
    }
  ];

  const stats = [
    { number: '99.9%', label: 'Accuracy Rate' },
    { number: '10M+', label: 'Records Processed' },
    { number: '500+', label: 'Enterprise Clients' },
    { number: '60%', label: 'Cost Reduction' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-[130deg] from-blue-900 via-blue-700 to-blue-600">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-transparent py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="relative">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
                  <span className="text-blue-600">Data Duplication</span>
                  <span className="block mt-2 text-blue-400">Alert System</span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center gap-4 mt-8"
              >
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/demo"
                  className="inline-flex items-center px-6 py-3 text-base font-medium border border-transparent rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Live Demo <Play className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative -mt-10 z-10 mb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl border border-blue-100 p-8 md:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <h4 className="text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 mb-2">
                    {stat.number}
                  </h4>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-4">
            Enterprise-grade features for
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400"> data quality</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive suite of tools helps you maintain data integrity
            and streamline your workflow with advanced technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
              className="bg-white rounded-xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-200"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl mb-6">
            Ready to transform your data?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join leading companies using our intelligent duplicate detection system
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 mb-4">
            © {new Date().getFullYear()} Data Duplication Alert System. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/sign-in" className="text-gray-500 hover:text-blue-600 transition-colors">
              <Users className="w-5 h-5" />
            </Link>
            <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
              <Settings className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 