import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface WeeklyMenuProps {
  onBack: () => void;
  showBackButton?: boolean;
}

const WeeklyMenu = ({ onBack, showBackButton = true }: WeeklyMenuProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentAlwaysSlide, setCurrentAlwaysSlide] = useState(0);

  const weeklyDishes = [
    {
      day: 'MÅNDAG',
      name: 'Grillad pluma och zucchini',
      description: 'Serverad med hummus på vita bönnor, potatis och pinjenötter',
      price: '135 KR',
      image: '/images/monday.jpg'
    },
    {
      day: 'TISDAG',
      name: 'Grillad majskycklingbröst',
      description: 'Serverad med rostade morötter, rödlök och tomater. Serveras med aioli',
      price: '135 KR',
      image: '/images/tuesday.jpg'
    },
    {
      day: 'ONSDAG',
      name: 'Långkok kamben med BBQ-sås',
      description: 'Serverad med coleslaw och patatas bravas',
      price: '135 KR',
      image: '/images/wednesday.webp'
    },
    {
      day: 'TORSDAG',
      name: 'Hel rostad vårkyckling',
      description: 'Serveras med majrova och tomatsallad, potatis och aioli',
      price: '135 KR',
      image: '/images/thursday.webp'
    },
    {
      day: 'FREDAG',
      name: 'Grillad beef petite',
      description: 'Serveras med rödvinssås, potatisstomp, hel rostad spetskål och morötter. Toppad med chimichurri',
      price: '149 KR',
      image: '/images/friday.jpg'
    },
    {
      day: 'VEGETARISK',
      name: 'Grillad aubergine, zucchini och paprika',
      description: 'Serveras med potatis, hummus på vita bönnor, manchego ost och pinjenötter',
      price: '135 KR',
      image: '/images/vegetarisk.jpg'
    }
  ];

  const alwaysAvailable = [
    {
      name: 'PEPITO DE TERNERA',
      description: 'En klassisk biffmacka med Pedro Ximenez karamelliserad lök, piquillopeppar och rucola. Serverad med padrones och patatas bravas',
      price: '149 KR',
      image: '/images/pepitoternera.webp'
    },
    {
      name: 'BOCATA DE CALAMARES',
      description: 'Blackfiskmacka med aioli, picklad selleri och rucola. Serverad med padrones och patatas bravas',
      price: '149 KR',
      image: '/images/bocatacalamares.jpg'
    },
    {
      name: 'BOCATA DE TORTILLA',
      description: 'Spansk omelettsmörgås med aioli, piquillopeppar och rucola. Serverad med padrones och patatas bravas',
      price: '149 KR',
      image: '/images/bocatatortilla.JPG'
    },
    {
      name: 'BOCATA DE CERDO Y JAMÓN IBÉRICO',
      description: 'Pulled pork och iberisk skinksmörgås med örter & vitlök färskost, picklad silverlök och rucola. Serverad med padrones och patatas bravas',
      price: '149 KR',
      image: '/images/bocatajamon.webp'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % weeklyDishes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + weeklyDishes.length) % weeklyDishes.length);
  };

  const nextAlwaysSlide = () => {
    setCurrentAlwaysSlide((prev) => (prev + 1) % alwaysAvailable.length);
  };

  const prevAlwaysSlide = () => {
    setCurrentAlwaysSlide((prev) => (prev - 1 + alwaysAvailable.length) % alwaysAvailable.length);
  };

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (type: 'weekly' | 'always') => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      if (type === 'weekly') {
        nextSlide();
      } else {
        nextAlwaysSlide();
      }
    }
    
    if (isRightSwipe) {
      if (type === 'weekly') {
        prevSlide();
      } else {
        prevAlwaysSlide();
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        {showBackButton ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center space-x-2 text-black hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </motion.button>
        ) : (
          <div className="w-20"></div>
        )}
        <h1 className="text-2xl font-display font-bold text-black">Weekly Menu</h1>
        <div className="w-20"></div>
      </div>

      {/* Weekly Dishes Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-black mb-4 text-center">
          DAGENS LUNCH – 135 KR
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Sallad, bröd & kaffe ingår alltid
        </p>

        {/* Carousel Container */}
        <div 
          className="relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={() => onTouchEnd('weekly')}
        >
          {/* Current Slide */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Day Badge */}
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full mb-4">
              <span className="font-bold text-sm">{weeklyDishes[currentSlide].day}</span>
            </div>

            {/* Dish Image */}
            <div className="mb-4">
              <Image
                src={weeklyDishes[currentSlide].image}
                alt={weeklyDishes[currentSlide].name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                priority
              />
            </div>

            {/* Dish Name */}
            <h3 className="font-bold text-black text-lg mb-2">
              {weeklyDishes[currentSlide].name}
            </h3>

            {/* Dish Description */}
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {weeklyDishes[currentSlide].description}
            </p>

            {/* Price */}
            <div className="text-2xl font-bold text-red-600">
              {weeklyDishes[currentSlide].price}
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black rounded-full p-2 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black rounded-full p-2 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {weeklyDishes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Always Available Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-black mb-4 text-center">
          ALWAYS AT VIBLIOTEK – 149 KR
        </h2>

        {/* Grid of Always Available Dishes */}
        <div 
          className="relative"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={() => onTouchEnd('always')}
        >
          {/* Current Slide */}
          <motion.div
            key={currentAlwaysSlide}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {/* Dish Image */}
            <div className="mb-4">
              <Image
                src={alwaysAvailable[currentAlwaysSlide].image}
                alt={alwaysAvailable[currentAlwaysSlide].name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-lg border border-gray-200"
                priority
              />
            </div>

            {/* Dish Name */}
            <h3 className="font-bold text-black text-lg mb-2">
              {alwaysAvailable[currentAlwaysSlide].name}
            </h3>

            {/* Dish Description */}
            <p className="text-sm text-gray-700 leading-relaxed mb-3">
              {alwaysAvailable[currentAlwaysSlide].description}
            </p>

            {/* Price */}
            <div className="text-2xl font-bold text-red-600">
              {alwaysAvailable[currentAlwaysSlide].price}
            </div>
          </motion.div>

          {/* Navigation Arrows */}
          <button
            onClick={prevAlwaysSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black rounded-full p-2 hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextAlwaysSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border-2 border-black rounded-full p-2 hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-4">
            {alwaysAvailable.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAlwaysSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentAlwaysSlide ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>


    </motion.div>
  );
};

export default WeeklyMenu;
