import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  onLoad?: () => void;
  fallback?: React.ReactNode;
}

const SplineScene: React.FC<SplineSceneProps> = ({ sceneUrl, className = "", onLoad, fallback }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const initializeSpline = React.useCallback(() => {
    if (containerRef.current && window.SPLINE) {
      try {
        const app = new window.SPLINE.Application(containerRef.current);
        app.load(sceneUrl).then(() => {
          setIsLoading(false);
          if (onLoad) onLoad();
        }).catch((error: unknown) => {
          console.error('Failed to load Spline scene:', error);
          setHasError(true);
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Failed to initialize Spline:', error);
        setHasError(true);
        setIsLoading(false);
      }
    }
  }, [sceneUrl, onLoad]);

  useEffect(() => {
    // Check if Spline runtime is already loaded
    if (window.SPLINE) {
      initializeSpline();
      return;
    }

    // Load Spline runtime
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/runtime@0.9.0/build/spline-runtime.min.js';
    script.async = true;
    
    script.onload = () => {
      initializeSpline();
    };

    script.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [initializeSpline]);

  // Show fallback if there's an error or while loading
  if (hasError || isLoading) {
    return (
      <motion.div
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {fallback}
        {isLoading && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-green/20 backdrop-blur-sm flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
};

// Add Spline types to window object
declare global {
  interface Window {
    SPLINE: {
      Application: new (container: HTMLElement) => {
        load: (url: string) => Promise<void>;
      };
    };
  }
}

export default SplineScene; 