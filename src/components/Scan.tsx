import { motion } from 'framer-motion';
import { QrCode, Camera, Star, Gift, Zap } from 'lucide-react';

const Scan = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-semibold text-black mb-2">
          Scan
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Scan QR codes to get stamps, points and exclusive offers
        </p>
      </div>

      {/* Scanner Interface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border-2 border-black rounded-lg p-8 mb-6 text-center"
      >
        {/* Scanner Frame */}
        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Scanner Border */}
          <div className="absolute inset-0 border-4 border-black rounded-lg">
            {/* Corner Indicators */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-red-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-red-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-red-500"></div>
          </div>
          
          {/* Scanner Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <QrCode className="w-24 h-24 text-gray-300" />
          </div>
          
          {/* Scanning Animation */}
          <motion.div
            animate={{ y: [0, 200, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1 bg-red-500 opacity-60"
          />
        </div>

        {/* Scan Instructions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-black">
            Scan QR Code
          </h3>
          <p className="text-sm text-gray-600">
            Point your camera at the QR code on your menu or in the restaurant
          </p>
        </div>

        {/* Scan Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 w-full py-3 px-6 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        >
          <Camera className="w-5 h-5" />
          <span>Start Scanning</span>
        </motion.button>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-black mb-4 text-center">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-300 transition-colors text-center"
          >
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-black">Add Stamp</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-300 transition-colors text-center"
          >
            <Gift className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-black">Activate Reward</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Recent Scans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-6"
      >
        <h3 className="text-lg font-semibold text-black mb-4">
          Recent Scans
        </h3>
        
        <div className="space-y-3">
          {[
            { time: '14:32', action: 'Stamp Added', points: '+10 points' },
            { time: '12:15', action: 'Reward Activated', points: 'Free Coffee' },
            { time: '09:45', action: 'QR Code Scanned', points: '+5 points' }
          ].map((scan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div>
                  <div className="text-sm font-medium text-black">{scan.action}</div>
                  <div className="text-xs text-gray-500">{scan.time}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-green-600">
                {scan.points}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white border-2 border-black rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-black mb-4 text-center">
          Tips for Best Results
        </h3>
        
        <div className="space-y-3">
          {[
            'Keep your phone steady when scanning',
            'Make sure the QR code is well lit',
            'Scan from about 15-20 cm distance',
            'Check that the code is not damaged'
          ].map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <Zap className="w-4 h-4 text-yellow-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Info */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
        </div>
        <p className="text-sm text-gray-600">
          Scan every time you visit Vibliotek to maximize your rewards
        </p>
      </div>
    </motion.div>
  );
};

export default Scan;
