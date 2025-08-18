import { motion } from 'framer-motion';
import { useState } from 'react';
import { Gift, Star, Wallet, Crown, ArrowRight } from 'lucide-react';
import VibliotekLogo from './VibliotekLogo';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');

  const steps = [
    {
      title: 'Sign Up Now',
      subtitle: 'Get personal benefits and offers with the Vibliotek app. Sign up as a member and get a free welcome gift.',
      icon: Gift,
      color: 'bg-red-600'
    },
    {
      title: 'Collect Stamps',
      subtitle: 'Get a stamp every time you buy lunch. Collect 10 stamps and get 1 lunch free.',
      icon: Star,
      color: 'bg-black'
    },
    {
      title: 'Earn Points',
      subtitle: 'Earn points and get rewards for each new level you achieve. Get cashback and exclusive offers.',
      icon: Crown,
      color: 'bg-red-600'
    },
    {
      title: 'Your Wallet',
      subtitle: 'You get cashback for every purchase as a member. Pay with your Wallet savings when you wish.',
      icon: Wallet,
      color: 'bg-black'
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    if (email.trim()) {
      onComplete();
    }
  };

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  // Primera pantalla estilo MASH
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-red-600 flex flex-col justify-center items-center px-6">
        {/* Logo Vibliotek oficial estilo MASH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          {/* Logo principal con diseño oficial */}
          <div className="relative mb-6">
            <VibliotekLogo size="sm" color="white" className="scale-75" />
          </div>
        </motion.div>

        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-sm mb-8"
        >
          <h2 className="text-xl font-medium text-white mb-4 opacity-95 font-montserrat">
            Sign Up Now
          </h2>
          <p className="text-white text-sm leading-relaxed opacity-90 font-light font-montserrat">
            Get personal benefits and offers<br />
            with the Vibliotek app.<br />
            Sign up as a member<br />
            and get a free welcome gift.
          </p>
        </motion.div>

        {/* Botón de inicio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-48"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="w-full py-3 px-6 bg-white text-red-600 rounded-lg font-medium text-base hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Indicador de progreso */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8"
        >
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full opacity-100"></div>
            <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
            <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
            <div className="w-2 h-2 bg-white rounded-full opacity-40"></div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Resto de las pantallas del onboarding
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-1">
        <motion.div
          className="h-full bg-red-600"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`w-24 h-24 ${currentStepData.color} rounded-full flex items-center justify-center mx-auto mb-8`}
          >
            <Icon className="w-12 h-12 text-white" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-3xl font-display font-bold text-black mb-4"
          >
            {currentStepData.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-600 text-lg leading-relaxed mb-8"
          >
            {currentStepData.subtitle}
          </motion.p>

          {/* Email Input (only on last step) */}
          {currentStep === steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-black rounded-lg text-center text-lg focus:outline-none focus:border-red-500 transition-colors"
              />
            </motion.div>
          )}

          {/* Welcome Gift (only on last step) */}
          {currentStep === steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8"
            >
              <div className="flex items-center justify-center space-x-3">
                <Gift className="w-6 h-6 text-red-600" />
                <span className="text-red-800 font-medium">
                  Free welcome gift: You get 20% discount!
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Previous Button */}
          {currentStep > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handlePrevious}
              className="px-6 py-3 border-2 border-black text-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </motion.button>
          )}

          {/* Next/Complete Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={currentStep === steps.length - 1 ? handleComplete : handleNext}
            disabled={currentStep === steps.length - 1 && !email.trim()}
            className={`
              px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2
              ${currentStep === steps.length - 1 && !email.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
              }
            `}
          >
            <span>
              {currentStep === steps.length - 1 ? 'Start Your Journey' : 'Next'}
            </span>
            {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index <= currentStep ? 'bg-red-600' : 'bg-gray-300'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
