import { motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import { Gift, Calendar, MapPin, Clock, Star } from 'lucide-react';

const Rewards = () => {
  const { data: rewards, isLoading, error } = trpc.rewards.getActiveRewards.useQuery();

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <p className="text-gray-500">Could not load rewards</p>
      </div>
    );
  }

  // Ensure rewards is an array and has items
  if (!rewards || !Array.isArray(rewards) || rewards.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">No active rewards right now</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-display font-semibold text-black mb-2">
          Rewards & Offers
        </h2>
        <p className="text-gray-600">Exclusive offers for our members</p>
      </div>

      {/* Rewards grid */}
      <div className="space-y-4">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white border-2 border-black rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            {/* Reward header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-black">{reward.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${reward.type === 'welcome' ? 'bg-green-100 text-green-800' : ''}
                      ${reward.type === 'event' ? 'bg-blue-100 text-blue-800' : ''}
                      ${reward.type === 'loyalty' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {reward.type === 'welcome' && 'Welcome'}
                      {reward.type === 'event' && 'Event'}
                      {reward.type === 'loyalty' && 'Loyalty'}
                    </span>
                  </div>
                </div>
              </div>
              
              {reward.type === 'welcome' && (
                <Star className="w-5 h-5 text-yellow-500" />
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              {reward.description}
            </p>

            {/* Validity */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>
                  Valid until {reward.validUntil ? new Date(reward.validUntil).toLocaleDateString('en-US') : 'N/A'}
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-2 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {reward.type === 'welcome' ? 'Activate Offer' : 'Learn More'}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Bottom info */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
        </div>
        <p className="text-sm text-gray-600">
          All offers are only valid for registered members
        </p>
      </div>
    </motion.div>
  );
};

export default Rewards;
