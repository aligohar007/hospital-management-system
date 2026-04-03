import { Link } from 'react-router-dom';
import { Menu, X, Bell, User, Phone } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

const Header = ({ isLanding = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold group-hover:bg-blue-700 transition">
              H
            </div>
            <span className="font-bold text-gray-900 text-lg hidden sm:inline">HealthHub</span>
          </Link>

          {/* Navigation */}
          {!isLanding && (
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition">Dashboard</Link>
              <Link to="/staff" className="text-gray-600 hover:text-blue-600 transition">Staff</Link>
              <Link to="/inventory" className="text-gray-600 hover:text-blue-600 transition">Inventory</Link>
              <Link to="/reports" className="text-gray-600 hover:text-blue-600 transition">Reports</Link>
            </nav>
          )}
          {isLanding && (
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition">About</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition">Testimonials</a>
            </nav>
          )}

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {!isLanding && (
              <>
                <button
                  onClick={() => setBellOpen(true)}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
                <button
                  onClick={() => setContactOpen(true)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
                >
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition">
                  <User className="w-5 h-5" />
                </button>
              </>
            )}

            {isLanding && (
              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Dashboard
                </motion.button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <Modal
          isOpen={bellOpen}
          onClose={() => setBellOpen(false)}
          title="Notifications"
        >
          <p className="text-gray-700">Please do this. Thanks!</p>
        </Modal>

        <Modal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          title="Contact List"
        >
          <ul className="space-y-3">
            <li className="rounded-lg p-3 bg-gray-50 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Support Team</h3>
              <p className="text-sm text-gray-600">support@healthhub.com</p>
              <p className="text-xs text-gray-500">Mon-Fri, 9am-6pm</p>
            </li>
            <li className="rounded-lg p-3 bg-gray-50 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Sales</h3>
              <p className="text-sm text-gray-600">sales@healthhub.com</p>
              <p className="text-xs text-gray-500">Mon-Fri, 9am-6pm</p>
            </li>
            <li className="rounded-lg p-3 bg-gray-50 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Emergency</h3>
              <p className="text-sm text-gray-600">+1 (123) 456-7890</p>
              <p className="text-xs text-gray-500">24/7 Hotline</p>
            </li>
          </ul>
        </Modal>

        {/* Mobile Navigation */}
        {menuOpen && isLanding && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4 flex flex-col gap-2"
          >
            <a href="#features" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">Features</a>
            <a href="#about" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">About</a>
            <a href="#testimonials" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded">Testimonials</a>
            <Link to="/dashboard" className="block">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Dashboard
              </button>
            </Link>
          </motion.nav>
        )}
      </div>
    </header>
  );
};

export default Header;
