import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Phone, Mail, MapPin } from 'lucide-react';

const Booking = () => {
  const serviceTypes = [
    {
      title: 'Lunch',
      description: 'Perfect for business meetings and casual dining',
      time: '11:30 - 14:00',
      price: 'From 135 KR'
    },
    {
      title: 'Dinner',
      description: 'Elegant evening dining experience',
      time: '17:00 - 22:00',
      price: 'From 149 KR'
    },
    {
      title: 'Private Events',
      description: 'Special occasions and group bookings',
      time: 'Available on request',
      price: 'Contact us'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto px-4 py-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-black mb-2">Boka Bord</h1>
        <p className="text-gray-600">Reserve your table at Vibliotek</p>
      </div>

      {/* Service Types */}
      <div className="space-y-4 mb-8">
        {serviceTypes.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-bold text-black">{service.title}</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">{service.time}</p>
                <p className="text-sm font-medium text-red-600">{service.price}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{service.description}</p>
            <button className="text-xs font-medium text-red-600 hover:text-red-700 transition-colors">
              Läs mer
            </button>
          </motion.div>
        ))}
      </div>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6"
      >
        <h3 className="text-lg font-bold text-black mb-4 text-center">Contact Information</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-700">+46 8 123 45 67</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-700">info@vibliotek.se</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="text-sm text-gray-700">Stockholm, Sweden</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="space-y-3"
      >
        <button className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">
          Book Table Online
        </button>
        
        <button className="w-full py-3 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors">
          Call to Book
        </button>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-6 text-center"
      >
        <p className="text-xs text-gray-500 leading-tight">
          RESERVATIONS ARE RECOMMENDED FOR GROUPS OF 6 OR MORE. <br />
          WE ACCEPT RESERVATIONS UP TO 30 DAYS IN ADVANCE.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Booking;
