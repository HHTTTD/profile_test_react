"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { renderToString } from "react-dom/server";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({ icons, images }) {
  const canvasRef = useRef(null);
  const [iconPositions, setIconPositions] = useState([]);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState(null);
  const animationFrameRef = useRef();
  const rotationRef = useRef(rotation);
  const iconCanvasesRef = useRef([]);
  const imagesLoadedRef = useRef([]);
  const lastSizeRef = useRef({ width: 0, height: 0 });
  const iconCacheRef = useRef(new Map()); // Cache for loaded icons
  const isInitializedRef = useRef(false);

  // Create icon canvases once when icons/images change - with caching
  useEffect(() => {
    if (!icons && !images) return;
    if (isInitializedRef.current) return; // Prevent re-initialization

    const items = icons || images || [];
    imagesLoadedRef.current = new Array(items.length).fill(false);
    isInitializedRef.current = true;

    const newIconCanvases = items.map((item, index) => {
      const cacheKey = images ? items[index] : JSON.stringify(item);
      
      // Check if icon is already cached
      if (iconCacheRef.current.has(cacheKey)) {
        const cachedCanvas = iconCacheRef.current.get(cacheKey);
        imagesLoadedRef.current[index] = true;
        return cachedCanvas;
      }

      const offscreen = document.createElement("canvas");
      offscreen.width = 40;
      offscreen.height = 40;
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        if (images) {
          // Handle image URLs directly
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = items[index];
          img.onload = () => {
            offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
            offCtx.drawImage(img, 0, 0, 40, 40);
            imagesLoadedRef.current[index] = true;
            iconCacheRef.current.set(cacheKey, offscreen); // Cache the canvas
          };
          img.onerror = () => {
            console.warn(`Failed to load icon: ${items[index]}`);
            imagesLoadedRef.current[index] = false;
          };
        } else {
          // Handle SVG icons
          try {
            offCtx.scale(0.4, 0.4);
            const svgString = renderToString(item);
            const img = new Image();
            img.src = "data:image/svg+xml;base64," + btoa(svgString);
            img.onload = () => {
              offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
              offCtx.drawImage(img, 0, 0);
              imagesLoadedRef.current[index] = true;
              iconCacheRef.current.set(cacheKey, offscreen); // Cache the canvas
            };
            img.onerror = () => {
              console.warn(`Failed to load SVG icon at index ${index}`);
              imagesLoadedRef.current[index] = false;
            };
          } catch (error) {
            console.warn(`Error processing SVG icon at index ${index}:`, error);
            imagesLoadedRef.current[index] = false;
          }
        }
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
  }, [icons, images]);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const items = icons || images || [];
    const newIcons = [];
    const numIcons = items.length || 20;

    // Fibonacci sphere parameters
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      newIcons.push({
        x: x * 160,
        y: y * 160,
        z: z * 160,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    setIconPositions(newIcons);
  }, [icons, images]);

  // Canvas drawing function - memoized to prevent unnecessary re-creation
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Only resize canvas when necessary
    const rect = canvas.getBoundingClientRect();
    const currentWidth = rect.width;
    const currentHeight = rect.height;

    if (lastSizeRef.current.width !== currentWidth || lastSizeRef.current.height !== currentHeight) {
      const devicePixelRatio = window.devicePixelRatio || 1;
      canvas.width = currentWidth * devicePixelRatio;
      canvas.height = currentHeight * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      canvas.style.width = currentWidth + "px";
      canvas.style.height = currentHeight + "px";
      
      lastSizeRef.current = { width: currentWidth, height: currentHeight };
    }

    // Clear canvas
    ctx.clearRect(0, 0, currentWidth, currentHeight);

    // Sort icons by z-depth (back to front)
    const sortedIcons = [...iconPositions].sort((a, b) => {
      const aZ = a.z * Math.cos(rotationRef.current.x) - a.y * Math.sin(rotationRef.current.x);
      const bZ = b.z * Math.cos(rotationRef.current.x) - b.y * Math.sin(rotationRef.current.x);
      return aZ - bZ;
    });

    // Draw icons
    sortedIcons.forEach((icon) => {
      const iconCanvas = iconCanvasesRef.current[icon.id];
      if (!iconCanvas || !imagesLoadedRef.current[icon.id]) return;

      // Apply rotation
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      // Project to screen
      const screenX = currentWidth / 2 + rotatedX;
      const screenY = currentHeight / 2 + rotatedY;

      // Calculate scale and opacity based on z-depth (smoother transitions)
      const scale = Math.max(0.3, Math.min(1.2, (rotatedZ + 320) / 480));
      const opacity = Math.max(0.3, Math.min(1, (rotatedZ + 320) / 480));

      // Draw icon with antialiasing
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.translate(screenX, screenY);
      ctx.scale(scale, scale);
      ctx.drawImage(iconCanvas, -20, -20);
      ctx.restore();
    });
  }, [iconPositions]);

  // Handle mouse events
  const handleMouseDown = (e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvasRef.current.width / 2 + rotatedX;
      const screenY = canvasRef.current.height / 2 + rotatedY;

      const scale = (rotatedZ + 320) / 480;
      const radius = 20 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z),
        );
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2),
        );

        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    });

    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.008,
        y: rotationRef.current.y + deltaX * 0.008,
      };

      setRotation(rotationRef.current);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Single unified animation loop
  useEffect(() => {
    const animate = () => {
      // Handle targeted rotation
      if (targetRotation) {
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(elapsed / targetRotation.duration, 1);
        const easeProgress = easeOutCubic(progress);

        const currentRotation = {
          x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easeProgress,
          y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easeProgress,
        };

        rotationRef.current = currentRotation;
        setRotation(currentRotation);

        if (progress >= 1) {
          setTargetRotation(null);
        }
      }

      // Handle auto-rotation when not dragging or targeting
      if (!isDragging && !targetRotation) {
        rotationRef.current = {
          x: rotationRef.current.x,
          y: rotationRef.current.y + 0.002,
        };
        setRotation(rotationRef.current);
      }

      // Draw the canvas
      drawCanvas();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drawCanvas, isDragging, targetRotation]);

  // Cleanup on unmount
  useEffect(() => {
    const iconCache = iconCacheRef.current;
    return () => {
      isInitializedRef.current = false;
      if (iconCache) {
        iconCache.clear();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}

export default IconCloud; 