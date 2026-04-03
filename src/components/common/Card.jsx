import { motion } from 'framer-motion';

const Card = ({ children, className = '', hoverable = true, ...props }) => {
  return (
    <motion.div
      whileHover={hoverable ? { y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' } : {}}
      className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
