import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { motion } from 'framer-motion';

interface OptimizedVideoProps {
  src: string;
  alt: string;
  className?: string;
  poster?: string;
}

const OptimizedVideo = ({ src, alt, className = "", poster }: OptimizedVideoProps) => {
  const { elementRef, hasIntersected } = useIntersectionObserver();

  return (
    <motion.div
      ref={elementRef}
      className="relative w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: hasIntersected ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {hasIntersected ? (
        <video
          src={src}
          className={`w-full h-full object-cover ${className}`}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          preload="metadata"
          poster={poster}
          onMouseEnter={(e) => (e.currentTarget.controls = false)}
          onTouchStart={(e) => (e.currentTarget.controls = false)}
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto'
          }}
        >
          Your browser does not support the video tag.
        </video>
      ) : (
        <div 
          className={`w-full bg-gray-200 flex items-center justify-center ${className}`}
          style={{ 
            minHeight: '384px',
            aspectRatio: '16/9'
          }}
        >
          <div className="text-center text-gray-500">
            <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-2xl">▶️</span>
            </div>
            <p className="text-sm">Loading video...</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default OptimizedVideo;
