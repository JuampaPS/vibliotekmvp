import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

interface VideoPlayerProps {
  src: string;
  alt: string;
  className?: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

const VideoPlayer = ({ 
  src, 
  alt, 
  className = "", 
  poster, 
  autoPlay = true, 
  loop = true, 
  muted = true 
}: VideoPlayerProps) => {
  const { elementRef, hasIntersected } = useIntersectionObserver();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (hasIntersected && videoRef.current) {
      const video = videoRef.current;
      
      const handleLoadedData = () => {
        setIsLoaded(true);
        setError(false);
      };

      const handleError = () => {
        setError(true);
        setIsLoaded(false);
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('error', handleError);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('error', handleError);
      };
    }
  }, [hasIntersected]);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  if (error) {
    return (
      <div className={`w-full bg-gray-200 flex items-center justify-center ${className}`} style={{ minHeight: '384px' }}>
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-2xl">❌</span>
          </div>
          <p className="text-sm">Error loading video</p>
          <p className="text-xs mt-1">{alt}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={elementRef}
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: hasIntersected ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {hasIntersected ? (
        <div className="relative">
          <video
            ref={videoRef}
            src={src}
            className={`w-full h-full object-cover ${className}`}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            playsInline
            controls={false}
            preload="metadata"
            poster={poster}
            onMouseEnter={(e) => (e.currentTarget.controls = false)}
            onTouchStart={(e) => (e.currentTarget.controls = false)}
            onClick={handleVideoClick}
            style={{
              display: 'block',
              maxWidth: '100%',
              height: 'auto',
              cursor: 'pointer'
            }}
          >
            Your browser does not support the video tag.
          </video>
          
          {!isLoaded && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-12 h-12 mx-auto mb-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm">Loading video...</p>
              </div>
            </div>
          )}
          
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 rounded-full p-2">
            <span className="text-white text-xs">▶️</span>
          </div>
        </div>
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

export default VideoPlayer;
