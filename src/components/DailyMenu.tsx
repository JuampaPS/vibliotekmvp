import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { Clock, Coffee, Leaf, Circle } from 'lucide-react';
import Image from 'next/image';
import WeeklyMenu from './WeeklyMenu';

const DailyMenu = ({ activeTab, onShowBooking }: { activeTab: string; onShowBooking: () => void }) => {
  const [showWeeklyMenu, setShowWeeklyMenu] = useState(false);
  const { data: menu, isLoading, error } = trpc.menu.getDailyMenu.useQuery();

  // Hide weekly menu when navigating to home
  useEffect(() => {
    if (activeTab === 'home') {
      setShowWeeklyMenu(false);
    }
  }, [activeTab]);

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

  // Always at Vibliotek menu items
  const alwaysAtVibliotek = [
    {
      name: "PEPITO DE TERNERA - En klassisk biffmacka med Pedro Ximenez karamelliserad lök, piquillopeppar och rucola. Serverad med padrones och patatas bravas",
      price: 149,
      image: "/images/pepitoternera.webp"
    },
    {
      name: "BOCATA DE CALAMARES - Blackfiskmacka med aioli, picklad selleri och rucola. Serverad med padrones och patatas bravas",
      price: 149,
      image: "/images/bocatacalamares.jpg"
    },
    {
      name: "BOCATA DE TORTILLA - Spansk omelettsmörgås med aioli, piquillopeppar och rucola. Serverad med padrones och patatas bravas",
      price: 149,
      image: "/images/bocatatortilla.JPG"
    },
    {
      name: "BOCATA DE CERDO Y JAMÓN IBÉRICO - Pulled pork och iberisk skinksmörgås med örter & vitlök färskost, picklad silverlök och rucola. Serverad med padrones och patatas bravas",
      price: 149,
      image: "/images/bocatajamon.webp"
    }
  ];

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
      case 0: // Sunday
      case 6: // Saturday
        // Rotate through always available items based on date
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        const rotationIndex = dayOfYear % alwaysAtVibliotek.length;
        return alwaysAtVibliotek[rotationIndex];
      default:
        return weeklyMenuData.monday; // Fallback
    }
  };

  const currentDayMenu = getCurrentDayMenu();

  if (showWeeklyMenu) {
    return <WeeklyMenu onBack={() => setShowWeeklyMenu(false)} showBackButton={true} />;
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
        <h1 className={`text-4xl font-display font-bold mb-2 ${
          [0, 6].includes(new Date().getDay()) ? "text-red-600" : "text-black"
        }`}>
          {[0, 6].includes(new Date().getDay()) ? "À La Carte" : "Today's Lunch"}
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          {[0, 6].includes(new Date().getDay())
            ? "We've carefully chosen the finest ingredients to create our delicious tapas, blending traditional Spanish flavors with a modern twist. Inspired by the vibrant cuisine of Spain and the Mediterranean, each dish is crafted to bring a fresh, contemporary take on classic tastes. Expect a mix of bold spices, fresh herbs, and high-quality ingredients that come together to offer you a unique culinary experience. Our tapas are designed to delight your senses and transport you to the sunny coasts of the Mediterranean, all while enjoying a modern, stylish presentation!" 
            : "Discover today's exclusive dish at Vibliotek"
          }
        </p>
      </div>

      {/* Main Menu Card - Moved up after the subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-black rounded-lg p-6 shadow-lg mb-8"
      >
        {[0, 6].includes(new Date().getDay()) ? (
          // Weekend: Tapas content
          <>
            {/* Tapas title */}
            <h2 className="text-2xl font-bold text-black text-center mb-4">
              Delicious Tapas
            </h2>

            {/* Tapas image */}
            <div className="mb-4">
              <Image
                src="/images/Tapas.webp"
                alt="Delicious Tapas Selection"
                width={400}
                height={300}
                className="w-full h-48 object-contain rounded-lg border border-gray-200 bg-gray-50"
                priority
              />
            </div>


          </>
        ) : (
          // Weekday: Regular lunch content
          <>
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
                className="w-full h-48 object-contain rounded-lg border border-gray-200 bg-gray-50"
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
          </>
        )}

        {/* Allergens */}
        {/* Allergens are not available in the new structure, so we'll keep it empty or remove it if not needed */}
        {/* <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Allergens: {menu.allergens.join(', ')}
            </p>
          </div> */}
      </motion.div>
        
      {/* AW+17 Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white border-2 border-black rounded-lg shadow-lg mb-8 overflow-hidden"
      >
        <Image
          src="/images/AW+17.webp"
          alt="AW+17 Special"
          width={400}
          height={300}
          className="w-full object-contain"
          priority
        />
      </motion.div>



    </motion.div>
  );
};

export default DailyMenu;
