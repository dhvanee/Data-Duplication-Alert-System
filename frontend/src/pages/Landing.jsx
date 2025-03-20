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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0066ff0a_1px,transparent_1px),linear-gradient(to_bottom,#0066ff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
        <div className="relative">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl text-center mx-auto">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8"
              >
                <h1 className="font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl mb-6">
                  Data Duplication
                  <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">Alert System</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Transform your data management with AI-powered duplicate detection.
                  Clean, accurate, and efficient data processing for modern enterprises.
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="flex gap-4 justify-center"
              >
                <Link to="/sign-up">
                  <Button size="lg" className="inline-flex items-center gap-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 text-lg px-8 py-6">
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/sign-in">
                  <Button variant="outline" size="lg" className="inline-flex items-center gap-x-2 text-lg px-8 py-6 hover:bg-blue-50 border-2 border-blue-200">
                    Live Demo
                    <Play className="w-5 h-5" />
                  </Button>
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
          <Link to="/sign-up">
            <Button size="lg" className="inline-flex items-center gap-x-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-lg hover:shadow-xl transition-all duration-200 text-lg px-8 py-6">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
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