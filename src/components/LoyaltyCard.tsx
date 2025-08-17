import { motion } from 'framer-motion';
import { Gift, Star, Trophy } from 'lucide-react';
import { useState } from 'react';

interface LoyaltyCardProps {}

const LoyaltyCard = ({}: LoyaltyCardProps) => {
  const [stamps, setStamps] = useState(3); // Mock data: 3 stamps earned
  const [isRedeemed, setIsRedeemed] = useState(false);
  
  // Mock user data
  const user = {
    name: "Juampa",
    level: stamps >= 20 ? "Guld" : stamps >= 10 ? "Silver" : "Brons",
    totalLunches: 23,
    checkInDates: ['2025-08-12', '2025-08-13', '2025-08-15']
  };

  const maxStamps = 10;
  const progress = (stamps / maxStamps) * 100;
  const canRedeem = stamps >= maxStamps && !isRedeemed;

  const handleAddStamp = () => {
    if (stamps < maxStamps) {
      setStamps(prev => prev + 1);
    }
  };

  const handleRedeem = () => {
    if (canRedeem) {
      setIsRedeemed(true);
      setStamps(0); // Reset stamps after redemption
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Brons': return 'from-amber-600 to-amber-800';
      case 'Silver': return 'from-gray-400 to-gray-600';
      case 'Guld': return 'from-yellow-400 to-yellow-600';
      default: return 'from-amber-600 to-amber-800';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Brons': return '🥉';
      case 'Silver': return '🥈';
      case 'Guld': return '🥇';
      default: return '🥉';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6 bg-black text-white"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-display font-bold text-white mb-2">Stämpelkort</h1>
        <p className="text-white font-montserrat">Samla lunchstämplar och få en gratis lunch!</p>
      </div>

      {/* User Status Block */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`bg-gradient-to-r ${getLevelColor(user.level)} rounded-2xl p-6 text-white mb-6 shadow-lg`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getLevelIcon(user.level)}</span>
            <div>
              <h2 className="text-xl font-bold">Hej, {user.name}!</h2>
              <p className="text-sm opacity-90">Nivå: {user.level}</p>
            </div>
          </div>
          <Trophy className="w-8 h-8 text-yellow-300" />
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>{stamps} av {maxStamps} luncher</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="bg-yellow-300 h-3 rounded-full"
            />
          </div>
        </div>

        {/* Total Stats */}
        <div className="text-center text-sm opacity-90">
          <p>Totalt ätit: {user.totalLunches} luncher</p>
        </div>
      </motion.div>

      {/* Visual Stamp Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-black rounded-2xl p-6 mb-6 shadow-lg"
      >
        <h3 className="text-xl font-bold text-black mb-4 text-center font-montserrat">Ditt Stämpelkort</h3>
        
        {/* Stamp Grid */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {Array.from({ length: maxStamps }, (_, index) => {
            const stampNumber = index + 1;
            const isCompleted = stampNumber <= stamps;
            const isLastStamp = stampNumber === maxStamps;
            
            return (
              <motion.div
                key={stampNumber}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className={`
                  w-16 h-16 rounded-full border-2 flex items-center justify-center text-lg font-bold transition-all duration-300 cursor-pointer
                  ${isCompleted 
                    ? 'bg-red-600 text-white border-red-600 shadow-lg' 
                    : 'bg-white text-gray-400 border-gray-300 hover:border-red-300'
                  }
                  ${isLastStamp && isCompleted ? 'ring-4 ring-yellow-300' : ''}
                `}
                onClick={handleAddStamp}
              >
                {isLastStamp && isCompleted ? (
                  <Gift className="w-8 h-8 text-yellow-300" />
                ) : (
                  stampNumber
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Description */}
        <div className="text-center mb-4">
          <p className="text-gray-700 leading-relaxed font-montserrat">
            Ät 10 luncher och få en valfri Lunch utan kostnad.
          </p>
        </div>

        {/* Redeem Button */}
        {canRedeem && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={handleRedeem}
            className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Gift className="w-6 h-6" />
            <span>Lös in Gratis Lunch!</span>
          </motion.button>
        )}

        {/* Add Stamp Button */}
        {!canRedeem && stamps < maxStamps && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={handleAddStamp}
            className="w-full py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Star className="w-5 h-5" />
            <span>Lägg till Stämpel</span>
          </motion.button>
        )}

        {/* Reset Button */}
        {isRedeemed && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setIsRedeemed(false);
              setStamps(0);
            }}
            className="w-full py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-colors"
          >
            Starta om Stämpelkort
          </motion.button>
        )}
      </motion.div>

      {/* Check-in History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white border-2 border-black rounded-2xl p-6 mb-6"
      >
        <h3 className="text-lg font-bold text-black mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-red-600" />
          Senaste Incheckningar
        </h3>
        
        <div className="space-y-2">
          {user.checkInDates.map((date, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-black">Lunch #{index + 1}</span>
              <span className="text-sm text-gray-600">{date}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom Info */}
      <div className="text-center text-sm text-gray-500">
        <p>Ett stämpel per dag - samla 10 för en gratis lunch!</p>
        <p>Stämpelkortet återställs efter inlösen</p>
      </div>
    </motion.div>
  );
};

export default LoyaltyCard;
