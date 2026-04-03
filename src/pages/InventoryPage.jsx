import { useState } from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Search } from 'lucide-react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const inventoryData = [
  { id: 1, item: 'Surgical Masks', stock: 1200, category: 'Consumables', lastUpdated: '2025-12-10' },
  { id: 2, item: 'Disposable Gloves', stock: 850, category: 'Consumables', lastUpdated: '2025-12-15' },
  { id: 3, item: 'Ventilator Units', stock: 12, category: 'Equipment', lastUpdated: '2025-12-08' },
  { id: 4, item: 'ECG Machines', stock: 5, category: 'Equipment', lastUpdated: '2025-12-05' },
  { id: 5, item: 'IV Drip Sets', stock: 430, category: 'Consumables', lastUpdated: '2025-12-13' },
];

const InventoryPage = () => {
  const [query, setQuery] = useState('');

  const filtered = inventoryData.filter((item) => item.item.toLowerCase().includes(query.toLowerCase()) || item.category.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar userRole="admin" />
      <div className="flex-1 overflow-auto">
        <Header />
        <main className="p-4 md:p-8">
          <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Inventory Control</h1>
            <p className="text-gray-600 mt-2">Track supply levels, alerts and restock needs in one place.</p>
          </motion.div>

          <div className="mb-6">
            <label className="relative block">
              <span className="sr-only">Search inventory</span>
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500"><Search className="w-5 h-5" /></span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search item or category"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </label>
          </div>

          <div className="overflow-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-left">
              <thead className="bg-blue-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">{row.item}</td>
                    <td className="px-4 py-3">{row.category}</td>
                    <td className={`px-4 py-3 font-semibold ${row.stock < 100 ? 'text-red-600' : 'text-green-600'}`}>{row.stock}</td>
                    <td className="px-4 py-3">{row.lastUpdated}</td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">No inventory items found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-blue-50 border border-blue-200 p-5 rounded-2xl"
          >
            <h2 className="text-xl font-bold text-blue-700 mb-2">Restock Alerts</h2>
            <p className="text-gray-600">Items with stock below 100 are flagged for priority restock.</p>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default InventoryPage;
