import { motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import { Crown, Star, Gift, TrendingUp, Info } from 'lucide-react';

const LoyaltyCard = () => {
  const { data: loyalty, isLoading, error } = trpc.loyalty.getUserLoyalty.useQuery();
  const addStampMutation = trpc.loyalty.addStamp.useMutation();

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <p className="text-gray-500">Could not load loyalty data</p>
      </div>
    );
  }

  if (!loyalty) return null;

  // Mock membership level data - will be replaced with real data later
  const membershipLevel = {
    current: 'SILVER',
    next: 'GOLD',
    currentPoints: 2058,
    nextLevelPoints: 4499,
    progress: (2058 / 4499) * 100,
    benefits: [
      '10% wallet savings',
      'Free Zinfandel "The Clown" on your next purchase',
      'Exclusive offers'
    ]
  };

  const handleAddStamp = () => {
    addStampMutation.mutate({ email: 'user@example.com' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-display font-semibold text-black mb-2">
          Loyalty Card
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Collect stamps and get free products
        </p>
      </div>

      {/* Welcome Message */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-black">
          Welcome, {loyalty.userName || 'Member'}
        </h3>
      </div>

      {/* Membership Level Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Crown className="w-6 h-6 text-yellow-600" />
            <span className="text-2xl font-bold text-black">{membershipLevel.current}</span>
          </div>
          <div className="relative">
            <Info className="w-5 h-5 text-gray-400 cursor-pointer" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${membershipLevel.progress}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="bg-red-600 h-3 rounded-full"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{membershipLevel.currentPoints} points</span>
            <span>{membershipLevel.nextLevelPoints} points</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="text-sm text-gray-700 leading-relaxed">
          As a {membershipLevel.current.toLowerCase()} member you get {membershipLevel.benefits.join(', ')}. 
          Earn {membershipLevel.nextLevelPoints - membershipLevel.currentPoints} points to become a {membershipLevel.next} member.
        </div>
      </motion.div>

      {/* Stamp Card Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-6"
      >
        <h3 className="text-xl font-semibold text-black mb-4 text-center">
          My Loyalty Cards
        </h3>

        {/* Stamp Grid */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {Array.from({ length: 9 }, (_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
              className={`
                w-12 h-12 rounded-full border-2 border-black flex items-center justify-center text-sm font-bold cursor-pointer transition-all duration-300
                ${i < loyalty.stamps 
                  ? 'bg-red-600 text-white border-red-600 animate-stamp' 
                  : 'bg-white text-black hover:bg-gray-50'
                }
              `}
              onClick={() => i === loyalty.stamps && handleAddStamp()}
            >
              {i + 1}
            </motion.div>
          ))}
          
          {/* Reward Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="w-12 h-12 rounded-full border-2 border-black bg-black flex items-center justify-center"
          >
            <Gift className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Stamp Card Info */}
        <div className="text-center">
          <h4 className="text-lg font-semibold text-black mb-2">TODAY'S LUNCH</h4>
          <p className="text-sm text-gray-600 mb-4">
            Buy any lunch and get a stamp. Collect 7 stamps and get 1 lunch for free.
          </p>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {Array.from({ length: 7 }, (_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  index < loyalty.stamps
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'border-gray-300 bg-white'
                }`}
              >
                {index < loyalty.stamps ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="text-xs font-bold"
                  >
                    ✓
                  </motion.div>
                ) : (
                  <span className="text-xs text-gray-400">{index + 1}</span>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={handleAddStamp}
            disabled={loyalty.stamps >= 7}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              loyalty.stamps >= 7
                ? 'bg-green-600 text-white cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <span>{loyalty.stamps >= 7 ? 'Reward Unlocked!' : 'Add Stamp'}</span>
          </button>
        </div>
      </motion.div>

      {/* Special Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black">Your Special Benefits</h3>
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>

        {/* Benefits List */}
        <div className="space-y-3">
          {[
            'Free coffee on your birthday',
            'Exclusive wine tastings',
            'Preview of new dishes'
          ].map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">{benefit}</span>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-2 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          See Your Special Benefits
        </motion.button>
      </motion.div>

      {/* Bottom Info */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
        </div>
        <p className="text-sm text-gray-600">
          Collect stamps every time you visit Vibliotek
        </p>
      </div>
    </motion.div>
  );
};

export default LoyaltyCard;
