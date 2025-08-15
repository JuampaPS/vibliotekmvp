import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface WeeklyMenuProps {
  onBack: () => void;
}

const WeeklyMenu = ({ onBack }: WeeklyMenuProps) => {
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex items-center space-x-2 text-black hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back</span>
        </motion.button>
        <h1 className="text-2xl font-display font-bold text-black">Weekly Menu</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      {/* Daily Lunch Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white border-2 border-black rounded-lg p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-black mb-2 text-center">
          DAGENS LUNCH – 135 KR
        </h2>
        <p className="text-sm text-gray-600 text-center mb-4">
          Sallad, bröd & kaffe ingår alltid
        </p>

        {/* Monday */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-black mb-2">MÅNDAG</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Grillad pluma och zucchini serverad med hummus på vita bönnor, potatis och pinjenötter
          </p>
        </div>

        {/* Tuesday */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-black mb-2">TISDAG</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Grillad majskycklingbröst serverad med rostade morötter, rödlök och tomater. Serveras med aioli
          </p>
        </div>

        {/* Wednesday */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-black mb-2">ONSDAG</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Långkok kamben med BBQ-sås<br />
            Serverad med coleslaw och patatas bravas
          </p>
        </div>

        {/* Thursday */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-black mb-2">TORSDAG</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Hel rostad vårkyckling serveras med majrova och tomatsallad, potatis och aioli
          </p>
        </div>

        {/* Friday */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-black mb-2">FREDAG (149 KR)</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Grillad beef petite serveras med rödvinssås, potatisstomp, hel rostad spetskål och morötter. Toppad med chimichurri
          </p>
        </div>

        {/* Vegetarian Option */}
        <div className="mb-4">
          <h3 className="font-bold text-black mb-2">VECKANS VEGETARISK</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Grillad aubergine, zucchini och paprika. Serveras med potatis, hummus på vita bönnor, manchego ost och pinjenötter
          </p>
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

        {/* PEPITO DE TERNERA */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-black mb-2">PEPITO DE TERNERA</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            En klassisk biffmacka med Pedro Ximenez karamelliserad lök, piquillopeppar och rucola. Serverad med padrones och patatas bravas
          </p>
        </div>

        {/* BOCATA DE CALAMARES */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-black mb-2">BOCATA DE CALAMARES</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Blackfiskmacka med aioli, picklad selleri och rucola. Serverad med padrones och patatas bravas
          </p>
        </div>

        {/* BOCATA DE TORTILLA */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="font-bold text-black mb-2">BOCATA DE TORTILLA</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Spansk omelettsmörgås med aioli, piquillopeppar och rucola. Serverad med padrones och patatas bravas
          </p>
        </div>

        {/* BOCATA DE CERDO Y JAMÓN IBÉRICO */}
        <div className="mb-4">
          <h3 className="font-bold text-black mb-2">BOCATA DE CERDO Y JAMÓN IBÉRICO</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            Pulled pork och iberisk skinksmörgås med örter & vitlök färskost, picklad silverlök och rucola. Serverad med padrones och patatas bravas
          </p>
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

export default WeeklyMenu;
