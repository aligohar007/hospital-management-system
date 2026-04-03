import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import { Card, Input, Button, Modal } from '../components/common';
import { DoctorCard } from '../components/dashboard';
import { DOCTORS } from '../data/sampleData';
import { Plus } from 'lucide-react';

const DoctorManagementPage = () => {
  const [doctors, setDoctors] = useState(DOCTORS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
    email: '',
    experience: '',
    qualifications: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDoctor = {
      id: doctors.length + 1,
      ...formData,
      rating: 4.5,
      image: 'https://via.placeholder.com/100',
      available: true,
    };
    setDoctors([...doctors, newDoctor]);
    setFormData({
      name: '',
      specialty: '',
      phone: '',
      email: '',
      experience: '',
      qualifications: '',
    });
    setIsModalOpen(false);
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
              <p className="text-gray-600 mt-2">Manage and view all doctors in the hospital</p>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <Plus className="w-5 h-5" />
              Add New Doctor
            </Button>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Input
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>

          {/* Doctor Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
          >
            {filteredDoctors.map((doctor) => (
              <motion.div key={doctor.id} variants={itemVariants}>
                <DoctorCard {...doctor} />
              </motion.div>
            ))}
          </motion.div>

          {filteredDoctors.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No doctors found matching your search</p>
            </motion.div>
          )}

          {/* Add Doctor Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New Doctor"
            size="lg"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  placeholder="Dr. John Smith"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Specialty"
                  placeholder="Cardiologist"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  placeholder="doctor@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Years of Experience"
                  type="number"
                  placeholder="10"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                />
                <Input
                  label="Qualifications"
                  placeholder="MD, Board Certified"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button type="submit" className="flex-1">
                  Add Doctor
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

export default DoctorManagementPage;
