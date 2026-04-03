import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp } from 'lucide-react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const slides = [
  { title: 'Appointments Trend', value: '13% increase', description: 'Last month showed a positive growth in booking rates.', icon: <TrendingUp className="w-6 h-6" /> },
  { title: 'Patient Satisfaction', value: '94%', description: 'Overall satisfaction is high based on exit surveys.', icon: <PieChart className="w-6 h-6" /> },
  { title: 'Resource Utilization', value: '78%', description: 'Facility utilization remains efficient and stable.', icon: <BarChart3 className="w-6 h-6" /> },
];

const ReportsPage = () => {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % slides.length);
  const prev = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole="admin" />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-4 md:p-8">
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Analytics Reports</h1>
            <p className="text-gray-600 mt-2">Data-driven insights with interactive, responsive slide cards.</p>
          </motion.div>

          <section className="relative bg-white rounded-3xl p-6 md:p-10 shadow-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <button onClick={prev} className="text-blue-600 font-semibold hover:text-blue-800">Previous</button>
              <span className="text-sm text-gray-500">Slide {active + 1} of {slides.length}</span>
              <button onClick={next} className="text-blue-600 font-semibold hover:text-blue-800">Next</button>
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="rounded-2xl border border-blue-100 p-8 bg-gradient-to-r from-blue-50 via-white to-blue-50"
            >
              <div className="flex items-center gap-3 text-blue-700 mb-4">{slides[active].icon}<h2 className="text-2xl font-bold">{slides[active].title}</h2></div>
              <p className="text-4xl font-extrabold text-gray-900 mb-2">{slides[active].value}</p>
              <p className="text-gray-600">{slides[active].description}</p>
            </motion.div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  onClick={() => setActive(index)}
                  className={`rounded-lg py-2 text-sm ${active === index ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
