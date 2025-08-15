import { motion } from 'framer-motion';
import { useState } from 'react';
import { trpc } from '../utils/trpc';
import { Clock, Coffee, Leaf, Circle, Star, Wine, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import WeeklyMenu from './WeeklyMenu';

const DailyMenu = () => {
  const [showWeeklyMenu, setShowWeeklyMenu] = useState(false);
  const { data: menu, isLoading, error } = trpc.menu.getDailyMenu.useQuery();

  // Weekly menu data with images
  const weeklyMenuData = {
    monday: {
      name: "Grillad pluma och zucchini serverad med hummus på vita bönnor, potatis och pinjenötter",
      price: 135,
      image: "/images/monday.jpg"
    },
    tuesday: {
      name: "Grillad majskycklingbröst serverad med rostade morötter, rödlök och tomater. Serveras med aioli",
      price: 135,
      image: "/images/tuesday.jpg"
    },
    wednesday: {
      name: "Långkok kamben med BBQ-sås. Serverad med coleslaw och patatas bravas",
      price: 135,
      image: "/images/wednesday.webp"
    },
    thursday: {
      name: "Hel rostad vårkyckling serveras med majrova och tomatsallad, potatis och aioli",
      price: 135,
      image: "/images/thursday.webp"
    },
    friday: {
      name: "Grillad beef petite serveras med rödvinssås, potatisstomp, hel rostad spetskål och morötter. Toppad med chimichurri",
      price: 149,
      image: "/images/friday.jpg"
    }
  };

  // Get current day menu
  const getCurrentDayMenu = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    switch (dayOfWeek) {
      case 1: // Monday
        return weeklyMenuData.monday;
      case 2: // Tuesday
        return weeklyMenuData.tuesday;
      case 3: // Wednesday
        return weeklyMenuData.wednesday;
      case 4: // Thursday
        return weeklyMenuData.thursday;
      case 5: // Friday
        return weeklyMenuData.friday;
      default:
        return weeklyMenuData.monday; // Default to Monday for weekends
    }
  };

  const currentDayMenu = getCurrentDayMenu();

  if (showWeeklyMenu) {
    return <WeeklyMenu onBack={() => setShowWeeklyMenu(false)} />;
  }

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md mx-auto p-6 text-center">
        <p className="text-gray-500">Could not load today's lunch</p>
      </div>
    );
  }

  if (!menu) return null;

  // Ensure date is properly handled
  const menuDate = menu.date ? new Date(menu.date) : new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-6"
    >
      {/* Hero Section with Menu of the Day */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-display font-bold text-black mb-4">
          Today's Lunch
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Discover today's exclusive dish at Vibliotek
        </p>
      </div>

      {/* Main Menu Card - Moved up after the subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-black rounded-lg p-6 shadow-lg mb-8"
      >
        {/* Date */}
        <div className="flex items-center justify-center mb-4">
          <Clock className="w-4 h-4 mr-2 text-gray-600" />
          <span className="text-sm text-gray-600 font-medium">
            {menuDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>

        {/* Dish name */}
        <h2 className="text-lg font-semibold text-black text-center mb-3 leading-tight">
          {currentDayMenu.name}
        </h2>

        {/* Menu image */}
        <div className="mb-4">
          <Image
            src={currentDayMenu.image}
            alt={`Today's menu: ${currentDayMenu.name}`}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
            priority
          />
        </div>

        {/* Includes section with price */}
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3 text-center">
            Includes:
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center space-x-6">
              <div className="flex flex-col items-center">
                <Leaf className="w-6 h-6 text-green-600 mb-1" />
                <span className="text-xs text-gray-600">Salad</span>
              </div>
              <div className="flex flex-col items-center">
                <Circle className="w-6 h-6 text-amber-600 mb-1" />
                <span className="text-xs text-gray-600">Bread</span>
              </div>
              <div className="flex flex-col items-center">
                <Coffee className="w-6 h-6 text-brown-600 mb-1" />
                <span className="text-xs text-gray-600">Coffee</span>
              </div>
            </div>
            <span className="text-4xl font-bold text-black">{currentDayMenu.price} kr</span>
          </div>
        </div>

        {/* Allergens */}
        {/* Allergens are not available in the new structure, so we'll keep it empty or remove it if not needed */}
        {/* <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Allergens: {menu.allergens.join(', ')}
            </p>
          </div> */}
      </motion.div>
        
      {/* CTA Buttons - Moved down after the menu card */}
      <div className="flex flex-col space-y-3 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowWeeklyMenu(true)}
          className="w-full py-4 px-6 bg-red-600 text-white rounded-lg font-semibold text-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Star className="w-5 h-5" />
          <span>Check Weekly Menu</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        >
          <Star className="w-4 h-4" />
          <span>Earn Points</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 px-6 border-2 border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
        >
          <Wine className="w-4 h-4" />
          <span>Join Wine Club</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-8"
      >
        <h3 className="text-lg font-semibold text-black mb-4 text-center">
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-300 transition-colors text-center"
          >
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-black">Add Stamp</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-300 transition-colors text-center"
          >
            <Wine className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <span className="text-sm font-medium text-black">Book Table</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Bottom accent circles */}
      <div className="flex items-center justify-center space-x-2">
        <div className="circle-accent"></div>
        <div className="circle-accent"></div>
        <div className="circle-accent"></div>
      </div>
    </motion.div>
  );
};

export default DailyMenu;
