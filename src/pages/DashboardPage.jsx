import { motion } from 'framer-motion';
import { Users, Stethoscope, Calendar, Activity } from 'lucide-react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { StatCard, PatientTable, AppointmentTable } from '../components/dashboard';
import { PATIENTS, APPOINTMENTS } from '../data/sampleData';

const DashboardPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const stats = [
    { icon: Users, label: 'Total Patients', value: '1,234', change: 12, color: 'blue' },
    { icon: Stethoscope, label: 'Total Doctors', value: '45', change: 5, color: 'green' },
    { icon: Calendar, label: 'Appointments Today', value: '18', change: -3, color: 'purple' },
    { icon: Activity, label: 'Active Cases', value: '156', change: 8, color: 'orange' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar userRole="admin" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's your hospital overview.</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <StatCard {...stat} />
              </motion.div>
            ))}
          </motion.div>

          {/* Tables */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Appointments */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <AppointmentTable appointments={APPOINTMENTS} />
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                    Schedule Appointment
                  </button>
                  <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                    Add New Patient
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-semibold">
                    Add New Doctor
                  </button>
                  <button className="w-full px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold">
                    View Reports
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Patients Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <PatientTable patients={PATIENTS} />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
