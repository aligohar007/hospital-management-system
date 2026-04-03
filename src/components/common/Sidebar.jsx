import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Stethoscope, Calendar, Settings, LogOut, Menu, X, ClipboardList, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Sidebar = ({ userRole = 'admin' }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = {
    admin: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: Users, label: 'Patients', href: '/patients' },
      { icon: Stethoscope, label: 'Doctors', href: '/doctors' },
      { icon: Calendar, label: 'Appointments', href: '/appointments' },
      { icon: Users, label: 'Staff', href: '/staff' },
      { icon: ClipboardList, label: 'Inventory', href: '/inventory' },
      { icon: BarChart3, label: 'Reports', href: '/reports' },
      { icon: Settings, label: 'Settings', href: '/settings' },
    ],
    doctor: [
      { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
      { icon: Users, label: 'My Patients', href: '/patients' },
      { icon: Calendar, label: 'My Schedule', href: '/appointments' },
      { icon: Settings, label: 'Profile', href: '/settings' },
    ],
    patient: [
      { icon: LayoutDashboard,
         label: 'Dashboard',
          href: '/dashboard' 
        },

      { icon: Calendar,
         label: 'My Appointments', 
         href: '/appointments' 
        },

      { icon: Settings, 
        label: 'Profile',
         href: '/settings'
         },
    ],
  };

  const items = menuItems[userRole] || menuItems.patient;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -288 }}
        className={`fixed md:sticky top-16 md:top-0 left-0 h-[calc(100vh-64px)] md:h-screen w-72 bg-gray-900 text-white overflow-y-auto z-40 transition-transform md:translate-x-0`}
      >
        <div className="p-6 space-y-8">
          {/* Hospital Info */}
          <div>
            <h2 className="text-2xl font-bold text-blue-400">HealthHub</h2>
            <p className="text-gray-400 text-sm mt-1">Hospital Management System</p>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all w-full">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden fixed bottom-6 right-6 md:hidden p-3 bg-blue-600 text-white rounded-full shadow-lg z-40"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </>
  );
};

export default Sidebar;
