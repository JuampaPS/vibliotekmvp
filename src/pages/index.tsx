import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DailyMenu from '../components/DailyMenu';
import LoyaltyCard from '../components/LoyaltyCard';
import Rewards from '../components/Rewards';
import Events from '../components/Events';
import Onboarding from '../components/Onboarding';
import Navigation from '../components/Navigation';
import Wallet from '../components/Wallet';
import Scan from '../components/Scan';
import Games from '../components/Games';
import VibliotekLogo from '../components/VibliotekLogo';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Forzar que se muestre el onboarding para testing
    // const hasSeenOnboarding = localStorage.getItem('vibliotek-onboarding');
    // if (!hasSeenOnboarding) {
    //   setShowOnboarding(true);
    // }
    
    // Mostrar onboarding siempre para testing
    setShowOnboarding(true);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('vibliotek-onboarding', 'true');
    setShowOnboarding(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DailyMenu />;
      case 'scan':
        return <Scan />;
      case 'rewards':
        return <Rewards />;
      case 'games':
        return <Games />;
      case 'wallet':
        return <Wallet />;
      default:
        return <DailyMenu />;
    }
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Vibliotek branding and user info */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-black text-white"
      >
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Vibliotek Logo Oficial */}
              <div className="flex items-center">
                <VibliotekLogo size="xs" color="white" />
              </div>
              <div>
                {/* Removed h1 "Vibliotek" as it's part of the logo component */}
                <p className="text-xs text-gray-300">Loyalty Club</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium text-white">189 kr</div>
                <div className="text-xs text-gray-400">Wallet</div>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs text-gray-300">👤</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Home;
