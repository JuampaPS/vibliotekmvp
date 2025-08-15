import { motion } from 'framer-motion';
import { trpc } from '../utils/trpc';
import { Wallet as WalletIcon, TrendingUp, Calendar, MapPin } from 'lucide-react';

const Wallet = () => {
  // Mock wallet data - will be replaced with real data later
  const walletBalance = 189;
  const transactions = [
    { id: 1, date: '25.09.2024', location: 'Vibliotek Stockholm', amount: -135, type: 'purchase' },
    { id: 2, date: '24.09.2024', location: 'Vibliotek Göteborg', amount: 15, type: 'cashback' },
    { id: 3, date: '23.09.2024', location: 'Vibliotek Malmö', amount: 20, type: 'cashback' },
    { id: 4, date: '22.09.2024', location: 'Vibliotek Stockholm', amount: -135, type: 'purchase' },
    { id: 5, date: '21.09.2024', location: 'Vibliotek Göteborg', amount: 150, type: 'cashback' },
    { id: 6, date: '20.09.2024', location: 'Vibliotek Malmö', amount: 25, type: 'cashback' },
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
          Wallet
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          You get cashback for every purchase as a member. 
          Pay with your Wallet savings when you wish.
        </p>
      </div>

      {/* Current Balance Display */}
      <div className="bg-white border-2 border-black rounded-lg p-6 mb-6 text-center">
        <div className="relative mb-4">
          {/* Wallet Icon with floating elements */}
          <div className="w-20 h-20 mx-auto relative">
            <WalletIcon className="w-20 h-20 text-gray-300" />
            {/* Floating circular elements */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-200 rounded-full animate-bounce-gentle"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-beige-200 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 -right-3 w-2 h-2 bg-red-100 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        <div className="text-4xl font-bold text-black mb-2">
          {walletBalance} kr
        </div>
        <p className="text-sm text-gray-600">Available Balance</p>
      </div>

      {/* Transaction History */}
      <div className="bg-white border-2 border-black rounded-lg overflow-hidden">
        <div className="p-4 border-b-2 border-black">
          <h3 className="font-semibold text-black text-lg">Transaction History</h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium text-black">{transaction.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-sm text-gray-600">{transaction.date}</span>
                  </div>
                </div>
                
                <div className={`text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <div className="font-semibold text-lg">
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} kr
                  </div>
                  <div className="text-xs text-gray-500">
                    {transaction.type === 'cashback' ? 'Cashback' : 'Purchase'}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
          <div className="circle-accent"></div>
        </div>
        <p className="text-sm text-gray-600">
          Cashback is calculated automatically after each purchase
        </p>
      </div>
    </motion.div>
  );
};

export default Wallet;
