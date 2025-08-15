import { motion } from 'framer-motion';
import Image from 'next/image';

interface VibliotekLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'white' | 'black';
  className?: string;
}

const VibliotekLogo = ({ size = 'md', color = 'black', className = '' }: VibliotekLogoProps) => {
  const sizeClasses = {
    xs: { width: 120, height: 48 },
    sm: { width: 300, height: 120 },
    md: { width: 450, height: 180 },
    lg: { width: 800, height: 320 },
    xl: { width: 1000, height: 400 }
  };

  const currentSize = sizeClasses[size];

  return (
    <motion.div className={`text-center ${className}`}>
      {/* Logo principal */}
      <div className="relative mb-2">
        <Image
          src="/images/formula+love+blanco.png"
          alt="Vibliotek - TAPAS, MARKET & FRIENDS"
          width={currentSize.width}
          height={currentSize.height}
          className={`object-contain ${color === 'white' ? 'brightness-0 invert' : ''}`}
          priority
        />
      </div>
      
      {/* Fallback si no hay imagen */}
      <div className="hidden">
        <div className={`font-sans font-bold tracking-wider text-${color === 'white' ? 'white' : 'black'}`}>
          VIBLIOTEK
        </div>
        <div className={`text-xs font-medium tracking-wider opacity-90 text-${color === 'white' ? 'white' : 'black'}`}>
          TAPAS, MARKET & FRIENDS
        </div>
      </div>
    </motion.div>
  );
};

export default VibliotekLogo;
