import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DailyMenu from '../components/DailyMenu';
import LoyaltyCard from '../components/LoyaltyCard';
import Onboarding from '../components/Onboarding';
import Navigation from '../components/Navigation';
import VibliotekLogo from '../components/VibliotekLogo';
import WeeklyMenu from '../components/WeeklyMenu';
import Booking from '../components/Booking';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    // Forzar que se muestre el onboarding para testing
    // const hasSeenOnboarding = localStorage.getItem('vibliotek-onboarding');
    // if (!hasSeenOnboarding) {
    //   setShowOnboarding(true);
    // }
    
    // Mostrar onboarding siempre para testing
    setShowOnboarding(true);
  }, []);

  // Scroll to top when changing tabs
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('vibliotek-onboarding', 'true');
    setShowOnboarding(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DailyMenu activeTab={activeTab} />;
      case 'loyalty':
        return <LoyaltyCard />;
      case 'booking':
        return <Booking />;
      case 'weekly':
        return <WeeklyMenu onBack={() => setActiveTab('home')} showBackButton={false} />;
      default:
        return <DailyMenu activeTab={activeTab} />;
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
        className="bg-red-600 text-white"
      >
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Vibliotek Logo Oficial - Reduced to 50% size */}
              <div className="flex items-center">
                <VibliotekLogo size="mobileSmall" color="white" />
              </div>
              <div>
                {/* Loyalty Club text - Well proportioned */}
                <p className="text-lg sm:text-xl font-serif text-white tracking-wide">Loyalty Club</p>
              </div>
            </div>
                               <button
                     onClick={() => setShowProfileModal(true)}
                     className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors border-2 border-black"
                   >
                     <span className="text-xs text-black">👤</span>
                   </button>
          </div>
        </div>
        {/* Red line at bottom of header */}
        <div className="h-1.5 bg-red-600"></div>
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

      

      {/* Profile Modal */}
      {showProfileModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowProfileModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black">My Profile</h2>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-gray-500 hover:text-black text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-4 mb-6">
              {/* Profile Picture */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">👤</span>
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-black font-medium">Juampa</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-black font-medium">juampa@example.com</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-black font-medium">August 2025</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => setShowProfileModal(false)}
              className="w-full py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Home;
