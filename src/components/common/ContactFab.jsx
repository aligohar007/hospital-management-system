import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle } from 'lucide-react';

const ContactFab = () => {
  const [open, setOpen] = useState(false);

  const items = [
    {
      label: 'WhatsApp',
      href: 'https://wa.me/1234567890',
      icon: <MessageCircle className="w-5 h-5" />,
      bg: 'bg-green-500 hover:bg-green-600',
    },
    {
      label: 'Call',
      href: 'tel:+1234567890',
      icon: <Phone className="w-5 h-5" />,
      bg: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      label: 'Email',
      href: 'mailto:contact@example.com',
      icon: <Mail className="w-5 h-5" />,
      bg: 'bg-indigo-500 hover:bg-indigo-600',
    },
  ];

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              title={item.label}
              className={`${item.bg} text-white p-3 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
            >
              {item.icon}
            </a>
          ))}
        </motion.div>
      )}

      <motion.button
        type="button"
        onClick={() => setOpen((p) => !p)}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 p-0 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <div className="absolute inset-0 rounded-full animate-pulse-shadow"></div>
        <span className="relative z-10 text-xl font-bold">+</span>
      </motion.button>
    </div>
  );
};

export default ContactFab;
