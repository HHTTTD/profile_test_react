import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CreativeRotatingText = ({ 
  prefix = "Creative",
  words = ["coding", "design", "innovation", "solutions", "experiences"],
  interval = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [microMovements, setMicroMovements] = useState({});
  const intervalRef = useRef(null);
  const animationRef = useRef(null);

  // Generate subtle micro-movements for each character (reduced intensity)
  useEffect(() => {
    const generateMicroMovements = () => {
      const currentWord = words[currentIndex];
      const movements = {};
      
      currentWord.split('').forEach((char, index) => {
        const time = Date.now() * 0.0005; // ลดความเร็ว
        const baseFreq = 0.3 + (index * 0.05); // ลดความถี่
        const amplitude = 0.15 + (Math.sin(index) * 0.1); // ลดความเข้ม
        
        movements[index] = {
          y: Math.sin(time * baseFreq) * amplitude,
          x: Math.cos(time * baseFreq * 0.7) * (amplitude * 0.2), // ลดการเคลื่อนไหวแนวนอน
          scale: 1 + (Math.sin(time * baseFreq * 1.2) * 0.005), // ลดการขยาย
          rotate: Math.sin(time * baseFreq * 0.8) * 0.2 // ลดการหมุน
        };
      });
      
      setMicroMovements(movements);
    };

    // Start micro-movements animation with reduced frequency
    const startAnimation = () => {
      const animate = () => {
        generateMicroMovements();
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    };

    startAnimation();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentIndex, words]);

  // Handle word rotation with smoother timing
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % words.length;
        setCurrentIndex(nextIndex);
        setIsVisible(true);
      }, 250); // ลดเวลารอระหว่างการเปลี่ยน
      
    }, interval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIndex, words.length, interval]);

  const currentWord = words[currentIndex];
  const characters = currentWord.split('');

  return (
    <div className={`rotating-text-demo ${className}`}>
      <div className="rotating-text-ptag inline-flex items-baseline">
        {/* Static prefix */}
        <span className="pt-0.5 sm:pt-1 md:pt-2 mr-3">
          {prefix}
        </span>
        
        {/* Rotating text container with fixed position */}
        <span className="text-rotate rotating-text-main relative inline-block overflow-hidden min-w-[120px] min-h-[40px] flex items-center justify-center">
          {/* Screen reader text */}
          <span className="text-rotate-sr-only sr-only">{currentWord}</span>
          
          {/* Fixed background box - stable, no layout animation */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"
            style={{ 
              zIndex: 0
            }}
          />
          
          {/* Text content with animation - separate from background */}
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.span
                key={`text-${currentIndex}`}
                className="text-rotate inline-block relative"
                aria-hidden="true"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeInOut"
                }}
              >
                {/* Text content with padding */}
                <span className="text-rotate-word rotating-text-split inline-flex px-4 py-2 text-white font-medium relative z-20">
                  {characters.map((char, index) => {
                    const movement = microMovements[index] || { y: 0, x: 0, scale: 1, rotate: 0 };
                    
                    return (
                      <motion.span
                        key={`${currentIndex}-${index}`}
                        className="text-rotate-element inline-block"
                        variants={{
                          initial: { y: 15, scale: 0.9, opacity: 0 },
                          animate: { 
                            y: 0, 
                            scale: 1,
                            opacity: 1,
                            transition: {
                              duration: 0.3,
                              delay: index * 0.03, // เข้า: จากหน้าไปหลัง
                              ease: "easeOut"
                            }
                          },
                          exit: { 
                            y: -15, 
                            scale: 0.9,
                            opacity: 0,
                            transition: {
                              duration: 0.3,
                              delay: (characters.length - 1 - index) * 0.02, // ออก: จากหลังไปหน้า (เร็วขึ้น)
                              ease: "easeIn"
                            }
                          }
                        }}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{
                          transform: `translateY(${movement.y}px) translateX(${movement.x}px) scale(${movement.scale}) rotate(${movement.rotate}deg)`,
                          transformOrigin: '50% 50%',
                          display: 'inline-block',
                          willChange: 'transform'
                        }}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
};

export default CreativeRotatingText; 