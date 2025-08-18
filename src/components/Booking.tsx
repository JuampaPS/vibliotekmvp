import { motion } from 'framer-motion';
import { Tag, Users, Calendar, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { id: 0, label: 'Typ', icon: Tag, active: true },
    { id: 1, label: 'Gäster', icon: Users, active: false },
    { id: 2, label: 'Datum', icon: Calendar, active: false },
    { id: 3, label: 'Tid', icon: Clock, active: false },
    { id: 4, label: 'Bekräfta', icon: CheckCircle, active: false }
  ];

  const bookingOptions = [
    {
      title: 'À la carte',
      description: 'Available for 1 to 8 guests. Seating 2,5 hours. Payment by card or swish. No cash. 2 cards max. Monday - Friday from 14.30....',
      hasReadMore: true
    },
    {
      title: 'Lunch',
      description: 'DAGENS LUNCH SERVERAS VARDAGAR 11:30-14:30 (sallad och kaffe ingår alltid). Pris 139:-...',
      hasReadMore: true
    },
    {
      title: 'Just Drinks',
      description: '',
      hasReadMore: false
    },
    {
      title: 'LOCO Mondays',
      description: '',
      hasReadMore: false
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white text-black min-h-screen"
    >
      {/* Header */}
      <div className="px-4 py-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Vibliotek - Malmö</h1>
          <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs">🇸🇪</span>
          </div>
        </div>
      </div>

      {/* Navigation Steps */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step.id === currentStep ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                <step.icon className="w-5 h-5" />
              </div>
              <span className={`text-xs font-medium ${
                step.id === currentStep ? 'text-red-600' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold text-center mb-8">Välj typ</h2>
        
        <div className="space-y-4">
          {bookingOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border-2 border-gray-200 rounded-lg p-4 shadow-sm hover:border-red-300 transition-colors cursor-pointer"
            >
              <h3 className="text-lg font-bold text-black mb-2">{option.title}</h3>
              {option.description && (
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {option.description}
                </p>
              )}
              {option.hasReadMore && (
                <button className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
                  Läs mer
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Information */}
      <div className="px-4 py-6 bg-gray-50 mt-8">
        <div className="space-y-4 text-sm text-gray-700">
          <p className="text-center font-medium">
            VI ÄLSKAR DROP-IN SÅ TVEKA INTE ATT IMPROVISERA OCH KOM I ALLA FALL OM VI HAR STÄNGT BOKNINGARNA FÖR DAGEN!
          </p>
          
          <p className="text-center">
            Varje bokning kan betalas med maximalt 2 kreditkort. Vi accepterar alla kreditkort inklusive Amex.
          </p>
          
          <p className="text-center">
            Vi tar inga bokningar på uteserveringen
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Booking;
