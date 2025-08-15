import { motion } from 'framer-motion';
import { Gamepad2, Gift, Star, Zap } from 'lucide-react';

const Games = () => {
  const games = [
    {
      id: 1,
      title: 'TRY OUR QUIZ',
      description: 'Answer questions about Vibliotek and win rewards',
      image: 'quiz',
      reward: 'Free Coffee',
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 2,
      title: 'SCRATCH CARD',
      description: 'Scratch and reveal your daily rewards',
      image: 'scratch',
      reward: 'Extra Points',
      color: 'bg-beige-50 border-beige-200'
    }
  ];

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
          Games
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          Play and win delicious prizes! Collect points and unlock exclusive offers.
        </p>
      </div>

      {/* Games Grid */}
      <div className="space-y-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`bg-white border-2 border-black rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${game.color}`}
          >
            {/* Game Image Placeholder */}
            <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              {game.image === 'quiz' ? (
                <div className="text-center">
                  <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="w-32 h-20 bg-white border-2 border-black rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-black">QUIZ</span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <div className="w-32 h-20 bg-white border-2 border-black rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-black">SCRATCH CARD</span>
                  </div>
                </div>
              )}
              
              {/* Reward Badge */}
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-xs font-medium">
                {game.reward}
              </div>
            </div>

            {/* Game Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-black mb-3 text-center">
                {game.title}
              </h3>
              
              <p className="text-gray-700 text-sm mb-6 text-center leading-relaxed">
                {game.description}
              </p>

              {/* Game Stats */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Points to win</span>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-black">50-200</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Zap className="w-4 h-4" />
                <span>Play Now</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Daily Challenge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 bg-white border-2 border-black rounded-lg p-6 text-center"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-red-600">Daily Challenge</span>
        </div>
        
        <h4 className="text-lg font-semibold text-black mb-2">
          Complete Quiz & Win 100 Points
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Answer 5 questions about Vibliotek and unlock bonus rewards
        </p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Start Challenge
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
          Play every day to maximize your points and rewards
        </p>
      </div>
    </motion.div>
  );
};

export default Games;
