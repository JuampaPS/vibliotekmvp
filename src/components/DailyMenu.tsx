import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { trpc } from '../utils/trpc';
import { Clock, Coffee, Leaf, Circle, Star, Share2 } from 'lucide-react';
import Image from 'next/image';
import WeeklyMenu from './WeeklyMenu';

const DailyMenu = ({ activeTab }: { activeTab: string }) => {
  const [showWeeklyMenu, setShowWeeklyMenu] = useState(false);
  const [rating, setRating] = useState(0);
  const { data: menu, isLoading, error } = trpc.menu.getDailyMenu.useQuery();

  // Handle star rating
  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  // Hide weekly menu when navigating to home
  useEffect(() => {
    if (activeTab === 'home') {
      setShowWeeklyMenu(false);
    }
  }, [activeTab]);

  // Weekly menu data with images
  const weeklyMenuData = {
    monday: {
      name: "Grillad pluma och zucchini",
      price: 135,
      image: "/images/mondayvideo.mp4"
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
        // Show Monday's menu on weekends
        return weeklyMenuData.monday;
      default:
        return weeklyMenuData.monday; // Fallback
    }
  };

  const currentDayMenu = getCurrentDayMenu();

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Today's Menu: ${currentDayMenu.name}`,
        text: `Check out today's delicious lunch at Vibliotek: ${currentDayMenu.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`Check out today's delicious lunch at Vibliotek: ${currentDayMenu.name}`);
      alert('Menu link copied to clipboard!');
    }
  };

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
      className="w-full max-w-md mx-auto p-6 bg-black text-white"
    >
      {/* Hero Section with Menu of the Day */}
      <div className="text-center mb-8">
        <h1 className={`text-4xl font-montserrat font-bold mb-2 ${
          [0, 6].includes(new Date().getDay()) ? "text-red-600" : "text-white"
        }`}>
          {[0, 6].includes(new Date().getDay()) ? "Next's Lunch" : "Today's Lunch"}
        </h1>
        <p className="text-white text-sm mb-4 font-montserrat">
          {[0, 6].includes(new Date().getDay())
            ? "Discover next week's exclusive dish at Vibliotek"
            : "Discover today's exclusive dish at Vibliotek"
          }
        </p>
      </div>

      {/* Date */}
      <div className="flex items-center justify-center mb-4">
        <Clock className="w-4 h-4 mr-2 text-white" />
        <span className="text-sm text-white font-medium font-montserrat">
          {[0, 6].includes(new Date().getDay()) 
            ? (() => {
                // Calculate next Monday's date
                const today = new Date();
                const daysUntilMonday = (8 - today.getDay()) % 7;
                const nextMonday = new Date(today);
                nextMonday.setDate(today.getDate() + daysUntilMonday);
                return nextMonday.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                });
              })()
            : menuDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })
          }
        </span>
      </div>

      {/* Menu image/video - Full width and height like afterwork image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4 -mx-6"
      >
        {currentDayMenu.image.endsWith('.mp4') ? (
          <video
            src={currentDayMenu.image}
            className="w-screen h-96 object-cover"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            onMouseEnter={(e) => e.currentTarget.controls = false}
            onTouchStart={(e) => e.currentTarget.controls = false}
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={currentDayMenu.image}
            alt={`Today's menu: ${currentDayMenu.name}`}
            width={400}
            height={300}
            className="w-screen h-64 object-cover"
            priority
          />
        )}
      </motion.div>

      {/* Dish name and description below image */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white text-center mb-3 leading-tight font-montserrat">
          {currentDayMenu.name}
        </h2>
        <p className="text-sm text-white text-center mb-4 opacity-90 font-montserrat">
          Grillad pluma och zucchini serverad med hummus på vita bönnor, potatis och pinjenötter
        </p>
        
        {/* Rating and Share Section */}
        <div className="flex items-center justify-between px-4">
          {/* 5 Star Rating */}
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
                onClick={() => handleStarClick(star)}
              >
                <Star className="w-5 h-5" />
              </button>
            ))}
            <span className="text-xs text-white ml-2 opacity-80 font-montserrat">
              Rate this dish
            </span>
          </div>
          
          {/* Share Icon */}
          <button
            className="text-white hover:text-yellow-400 transition-colors"
            onClick={handleShare}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Includes section with price */}
      <div className="bg-red-600 border border-red-700 rounded-lg p-2 mb-8">
        <div className="flex flex-col">
          {/* Includes label */}
          <div className="text-left mb-2">
            <span className="text-sm font-semibold text-white font-montserrat">Includes:</span>
          </div>
          
          {/* Items and price in one line */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Leaf className="w-4 h-4 text-white" />
                <span className="text-xs text-white font-montserrat">Salad</span>
              </div>
              <div className="flex items-center space-x-2">
                <Circle className="w-4 h-4 text-white" />
                <span className="text-xs text-white font-montserrat">Bread</span>
              </div>
              <div className="flex items-center space-x-2">
                <Coffee className="w-4 h-4 text-white" />
                <span className="text-xs text-white font-montserrat">Coffee</span>
              </div>
            </div>
            
            {/* Price */}
            <span className="text-3xl font-bold text-white font-montserrat flex items-center">{currentDayMenu.price} kr</span>
          </div>
        </div>
      </div>
        
      {/* AW+17 Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8 -mx-6 overflow-hidden"
      >
        <Image
          src="/images/AW+17.webp"
          alt="AW+17 Special"
          width={400}
          height={300}
          className="w-screen object-contain"
          priority
        />
      </motion.div>



    </motion.div>
  );
};

export default DailyMenu;
