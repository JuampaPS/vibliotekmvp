import { motion } from 'framer-motion';
import { Home, Star, Calendar } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: 'home', label: 'Hem', icon: Home },
    { id: 'loyalty', label: 'Stämpel', icon: Star },
    { id: 'booking', label: 'Boka Bord', icon: Calendar },
    { id: 'weekly', label: 'Veckan', icon: Calendar },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 bg-red-600 border-t-2 border-red-700 z-50"
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
                    ? 'text-white' 
                    : 'text-white opacity-70 hover:opacity-100'
                  }
                `}
              >
                <Icon className={`w-6 h-6 mb-1 text-white`} />
                <span className={`text-xs font-medium text-white`}>
                  {tab.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-12 h-1 bg-white rounded-t-full"
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
