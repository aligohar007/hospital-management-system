import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { Card, Input, Button, Modal, Badge } from '../components/common';
import { AppointmentTable } from '../components/dashboard';
import { APPOINTMENTS, DOCTORS, PATIENTS } from '../data/sampleData';
import { Plus, Calendar, Clock } from 'lucide-react';

const AppointmentManagementPage = () => {
  const [appointments, setAppointments] = useState(APPOINTMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: '',
    notes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const patient = PATIENTS.find(p => p.id === parseInt(formData.patientId));
    const doctor = DOCTORS.find(d => d.id === parseInt(formData.doctorId));

    if (patient && doctor) {
      const newAppointment = {
        id: appointments.length + 1,
        patientName: patient.name,
        doctorName: doctor.name,
        date: formData.date,
        time: formData.time,
        status: 'scheduled',
        type: formData.type,
      };
      setAppointments([...appointments, newAppointment]);
      setFormData({
        patientId: '',
        doctorId: '',
        date: '',
        time: '',
        type: '',
        notes: '',
      });
      setIsModalOpen(false);
    }
  };

  const filteredAppointments = appointments.filter(apt =>
    statusFilter === 'all' || apt.status === statusFilter
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole="admin" />

      <div className="flex-1 overflow-auto">
        <Header />

        <main className="p-4 md:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Appointment Management</h1>
                <p className="text-gray-600 mt-2">Manage and schedule patient appointments</p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 w-full md:w-auto"
              >
                <Plus className="w-5 h-5" />
                Schedule Appointment
              </Button>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'scheduled', 'pending', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    statusFilter === status
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total Appointments', value: appointments.length, color: 'blue' },
              { label: 'Scheduled', value: appointments.filter(a => a.status === 'scheduled').length, color: 'green' },
              { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length, color: 'purple' },
              { label: 'Cancelled', value: appointments.filter(a => a.status === 'cancelled').length, color: 'red' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-lg p-4 shadow-md border-l-4`}
                style={{ borderLeftColor: getColorHex(stat.color) }}
              >
                <p className="text-gray-600 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Appointments Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AppointmentTable appointments={filteredAppointments} />
          </motion.div>

          {/* Schedule Appointment Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Schedule New Appointment"
            size="lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Patient</label>
                  <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select Patient</option>
                    {PATIENTS.map(patient => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Doctor</label>
                  <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select Doctor</option>
                    {DOCTORS.map(doctor => (
                      <option key={doctor.id} value={doctor.id}>
                        Dr. {doctor.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Appointment Date"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />

                <Input
                  label="Appointment Time"
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Consultation">Consultation</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Checkup">Checkup</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Lab Test">Lab Test</option>
                  </select>
                </div>
              </div>

              <Input
                label="Notes"
                placeholder="Additional notes..."
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                as="textarea"
              />

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" className="flex-1">
                  Schedule Appointment
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Modal>
        </main>
      </div>
    </div>
  );
};

function getColorHex(color) {
  const colors = {
    blue: '#2563eb',
    green: '#16a34a',
    purple: '#9333ea',
    red: '#dc2626',
  };
  return colors[color] || colors.blue;
}

export default AppointmentManagementPage;
