import { motion } from 'framer-motion';
import { Users, Briefcase, ShieldCheck } from 'lucide-react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const staff = [
  { id: 1, name: 'Dr. Sarah Johnson', role: 'Chief Cardiologist', email: 'sarah.johnson@hospital.com', status: 'Active' },
  { id: 2, name: 'Nurse Mark Lee', role: 'Emergency Nurse', email: 'mark.lee@hospital.com', status: 'Active' },
  { id: 3, name: 'Dr. Michael Chen', role: 'Neurologist', email: 'michael.chen@hospital.com', status: 'Active' },
  { id: 4, name: 'Laura Kim', role: 'Lab Technician', email: 'laura.kim@hospital.com', status: 'On Leave' },
  { id: 5, name: 'Dr. Emily Rodriguez', role: 'Orthopedic Surgeon', email: 'emily.rodriguez@hospital.com', status: 'Active' },
];

const StaffPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole="admin" />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-4 md:p-8">
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Staff Management</h1>
            <p className="text-gray-600 mt-2">Manage hospital staff, roles, availability and team performance.</p>
          </motion.div>

          <motion.div animate={{ opacity: [0.8, 1, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} className="mb-8 p-6 rounded-2xl bg-white shadow-lg border border-blue-100">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-blue-600"><Users className="w-5 h-5" /> Total Staff</div>
              <div className="text-xl font-bold">{staff.length}</div>
              <div className="flex items-center gap-2 text-green-600"><ShieldCheck className="w-5 h-5" /> On Duty</div>
              <div className="text-xl font-bold">{staff.filter((member) => member.status === 'Active').length}</div>
              <div className="flex items-center gap-2 text-purple-600"><Briefcase className="w-5 h-5" /> On Leave</div>
              <div className="text-xl font-bold">{staff.filter((member) => member.status === 'On Leave').length}</div>
            </div>
          </motion.div>

          <section className="grid gap-5 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {staff.map((member) => (
              <motion.article key={member.id} whileHover={{ y: -5 }} className="bg-white rounded-2xl shadow-md border border-gray-200 p-5">
                <h2 className="text-xl font-bold text-gray-900">{member.name}</h2>
                <p className="text-blue-600 font-semibold">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.email}</p>
                <span className={`mt-4 inline-block px-3 py-1 rounded-full text-sm font-semibold ${member.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {member.status}
                </span>
              </motion.article>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default StaffPage;
