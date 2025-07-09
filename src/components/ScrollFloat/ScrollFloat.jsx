/*
	Installed from https://reactbits.dev/tailwind/
*/

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
  children,
  scrollContainerRef,
  containerClassName = "",
  textClassName = "",
  animationDuration = 1,
  ease = "back.inOut(2)",
  scrollStart = "center bottom+=50%",
  scrollEnd = "bottom bottom-=40%",
  stagger = 0.03,
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    
    // Better handling for Thai text - combine characters with tone marks
    const isThaiText = /[\u0E00-\u0E7F]/.test(text);
    
    if (isThaiText) {
      // For Thai text, combine base characters with tone marks
      const thaiChars = [];
      const chars = text.split("");
      
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        
        // Check if current character is a tone mark or combining character
        const isToneMark = /[\u0E34-\u0E3A\u0E47-\u0E4E]/.test(char);
        
        if (isToneMark && thaiChars.length > 0) {
          // Combine with previous character
          thaiChars[thaiChars.length - 1] += char;
        } else {
          // Add as new character
          thaiChars.push(char);
        }
      }
      
      return thaiChars.map((char, index) => (
        <span 
          className="inline-block" 
          key={index}
          style={{ 
            fontFamily: "'Prompt', 'Kanit', 'Mitr', 'Sarabun', 'Tahoma', 'Microsoft Sans Serif', 'Arial Unicode MS', sans-serif",
            letterSpacing: char === ' ' ? 'normal' : '0.02em',
            fontFeatureSettings: '"liga" 1, "calt" 1',
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            fontWeight: 'inherit'
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    } else {
      // For English text, use original logic
      return text.split("").map((char, index) => (
        <span 
          className="inline-block" 
          key={index}
          style={{ 
            fontFamily: "'Inter', 'Prompt', 'Kanit', 'Mitr', 'Tahoma', sans-serif",
            fontWeight: 'inherit'
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    }
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const charElements = el.querySelectorAll(".inline-block");

    if (charElements.length === 0) return;

    // Reset any previous animations
    gsap.set(charElements, {
      clearProps: "all"
    });

    // Check if text contains Thai characters to adjust animation
    const text = typeof children === "string" ? children : "";
    const isThaiText = /[\u0E00-\u0E7F]/.test(text);
    const adjustedStagger = isThaiText ? Math.max(stagger * 0.7, 0.01) : stagger;

    // Set initial state with better parameters for Thai text
    gsap.set(charElements, {
      opacity: 0,
      y: isThaiText ? 30 : 50,
      scale: isThaiText ? 0.8 : 0.5,
      rotation: isThaiText ? 5 : 10,
      transformOrigin: "center center",
      force3D: true,
    });

    // Create the animation with improved parameters
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        scroller,
        start: "top 85%",
        end: "top 15%",
        scrub: false, // Use toggleActions instead of scrub for better Thai text rendering
        toggleActions: "play none none reverse",
        markers: false,
        fastScrollEnd: true, // Better performance
        preventOverlaps: true,
      },
    });

    tl.to(charElements, {
      duration: isThaiText ? 1.2 : 0.8,
      ease: isThaiText ? "power2.out" : "back.out(1.7)",
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      stagger: {
        amount: adjustedStagger * charElements.length,
        from: "start",
        ease: "power2.inOut"
      },
    });

    // Cleanup function
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [
    children,
    scrollContainerRef,
    animationDuration,
    ease,
    scrollStart,
    scrollEnd,
    stagger,
  ]);

  return (
    <div
      ref={containerRef}
      className={`${containerClassName}`}
      style={{ 
        overflow: 'visible',
        minHeight: '120px',
      }}
    >
      <div
        className={`leading-[1.3] ${textClassName}`}
        style={{
          display: 'block',
          position: 'relative',
          fontWeight: 'inherit',
          fontFamily: /[\u0E00-\u0E7F]/.test(children) ? 
            "'Prompt', 'Kanit', 'Mitr', 'Sarabun', 'Tahoma', 'Microsoft Sans Serif', 'Arial Unicode MS', sans-serif" : 
            "'Inter', 'Prompt', 'Kanit', 'Mitr', 'Tahoma', sans-serif"
        }}
      >
        {splitText}
      </div>
    </div>
  );
};

export default ScrollFloat;
