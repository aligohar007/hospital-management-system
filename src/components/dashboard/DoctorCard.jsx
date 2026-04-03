import { motion } from 'framer-motion';
import Card from '../common/Card';
import Badge from '../common/Badge';
import { Mail, Phone, Star } from 'lucide-react';

const DoctorCard = ({ name, specialty, rating, phone, email, image, available = true }) => {
  return (
    <Card className="text-center">
      <div className="mb-4">
        <img 
          src={image || 'https://via.placeholder.com/100'} 
          alt={name} 
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-blue-100"
        />
      </div>
      
      <h3 className="text-lg font-bold text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600 mt-1">{specialty}</p>

      <div className="flex items-center justify-center gap-1 mt-3 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">({rating})</span>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          <span className="truncate">{email}</span>
        </div>
      </div>

      <Badge variant={available ? 'success' : 'danger'}>
        {available ? 'Available' : 'Busy'}
      </Badge>
    </Card>
  );
};

export default DoctorCard;
