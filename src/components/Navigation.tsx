import { motion } from 'framer-motion';
import { Home, QrCode, Gift, Gamepad2, Wallet } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'scan', label: 'Scan', icon: QrCode },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black z-50"
    >
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex flex-col items-center py-3 px-2 transition-colors duration-200
                  ${isActive 
                    ? 'text-red-600' 
                    : 'text-gray-500 hover:text-gray-700'
                  }
                `}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-red-600' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-red-600' : ''}`}>
                  {tab.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-12 h-1 bg-red-600 rounded-t-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
