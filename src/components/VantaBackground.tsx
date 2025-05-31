
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    VANTA: any;
    THREE: any;
  }
}

const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    if (!vantaEffect.current && vantaRef.current) {
      // Load Three.js and Vanta.js scripts dynamically
      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = () => resolve();
          script.onerror = reject;
          document.head.appendChild(script);
        });
      };

      const initVanta = async () => {
        try {
          // Load Three.js first
          if (!window.THREE) {
            await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
          }
          
          // Load Vanta Birds
          if (!window.VANTA) {
            await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js');
          }

          // Initialize Vanta effect
          if (window.VANTA && window.VANTA.BIRDS && vantaRef.current) {
            vantaEffect.current = window.VANTA.BIRDS({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              backgroundColor: 0x1a1a2e,
              color1: 0x16213e,
              color2: 0x0f3460,
              colorMode: 'variance',
              birdSize: 1.0,
              wingSpan: 40.0,
              speedLimit: 5.0,
              separation: 20.0,
              alignment: 20.0,
              cohesion: 20.0,
              quantity: 3.0
            });
          }
        } catch (error) {
          console.error('Failed to load Vanta.js:', error);
        }
      };

      initVanta();
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, []);

  return <div ref={vantaRef} className="fixed inset-0 z-0" />;
};

export default VantaBackground;
