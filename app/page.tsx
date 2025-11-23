"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [showWalrus, setShowWalrus] = useState(false);
  const [walrusPath, setWalrusPath] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    midX: 0,
    midY: 0,
    rotation: 0,
  });

  useEffect(() => {
    // Generate random starting position (from any edge)
    const startSide = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let startX = 0;
    let startY = 0;
    
    if (startSide === 0) { // Top
      startX = Math.random() * 100; // 0-100% of width
      startY = -10; // Above viewport
    } else if (startSide === 1) { // Right
      startX = 110; // Right of viewport
      startY = Math.random() * 100; // 0-100% of height
    } else if (startSide === 2) { // Bottom
      startX = Math.random() * 100;
      startY = 110; // Below viewport
    } else { // Left
      startX = -10; // Left of viewport
      startY = Math.random() * 100;
    }

    // Generate random ending position (opposite or different edge)
    const endSide = (startSide + 2 + Math.floor(Math.random() * 2)) % 4; // Opposite or adjacent
    let endX = 0;
    let endY = 0;
    
    if (endSide === 0) { // Top
      endX = Math.random() * 100;
      endY = -10;
    } else if (endSide === 1) { // Right
      endX = 110;
      endY = Math.random() * 100;
    } else if (endSide === 2) { // Bottom
      endX = Math.random() * 100;
      endY = 110;
    } else { // Left
      endX = -10;
      endY = Math.random() * 100;
    }

    // Random midpoint for bouncing
    const midX = 30 + Math.random() * 40; // 30-70% of width
    const midY = 20 + Math.random() * 60; // 20-80% of height

    setWalrusPath({
      startX,
      startY,
      endX,
      endY,
      midX,
      midY,
      rotation: (Math.random() - 0.5) * 40, // -20 to 20 degrees
    });

    const timer = setTimeout(() => {
      setShowWalrus(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <nav className="relative z-10 flex justify-between items-center p-6 border-b-2 border-white/20 backdrop-blur-sm">
        <div className="text-2xl font-black tracking-tighter text-walrus-neon uppercase">
          GuardRail
        </div>
        <div className="flex gap-4">
           <Link href="/test" className="px-6 py-2 border-2 border-white hover:bg-white hover:text-black transition-all font-bold uppercase text-sm tracking-widest">
            Launch App
           </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <div className="badge-shake mb-4 inline-block px-4 py-1 bg-walrus-pink text-black font-bold text-xs uppercase tracking-widest transform -rotate-2">
          v0.1.0 Beta
        </div>
        
        <h1 className="text-7xl md:text-9xl font-black uppercase leading-none mb-8 mix-blend-difference">
          AI Testing<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-walrus-neon via-walrus-cyan to-walrus-pink animate-pulse">
            Reimagined
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-200 max-w-2xl mb-12 font-light border-l-4 border-walrus-cyan pl-6 text-left">
          Upload your AI model and run automated safety, bias, and reliability tests.
          <br/>
          <span className="block mt-1.5">Identify risks before deployment with secure evaluation workflows.</span>
        </p>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Link href="/test" 
            className="group relative px-8 py-4 bg-walrus-neon text-black font-black text-xl uppercase tracking-wider overflow-hidden">
            <span className="relative z-10 group-hover:text-white transition-colors">Start Testing</span>
            <div className="absolute inset-0 bg-black transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
          </Link>
          
          <div className="text-white font-bold uppercase tracking-widest">
            Learn about{' '}
            <a href="https://walrus.xyz" target="_blank" rel="noopener noreferrer"
               className="hover:text-walrus-cyan underline decoration-2 underline-offset-4 transition-colors">
              Walrus
            </a>
            {' '}and{' '}
            <a href="https://docs.sui.io/concepts/cryptography/nautilus" target="_blank" rel="noopener noreferrer"
               className="hover:text-walrus-cyan underline decoration-2 underline-offset-4 transition-colors">
              Nautilus ↗
            </a>
          </div>
        </div>
      </main>

      {/* Walrus Logo Animation */}
      {showWalrus && (
        <div 
          className="walrus-float"
          style={{
            '--start-x': `${walrusPath.startX}vw`,
            '--start-y': `${walrusPath.startY}vh`,
            '--mid-x': `${walrusPath.midX}vw`,
            '--mid-y': `${walrusPath.midY}vh`,
            '--end-x': `${walrusPath.endX}vw`,
            '--end-y': `${walrusPath.endY}vh`,
            '--rotation': `${walrusPath.rotation}deg`,
          } as React.CSSProperties}
        >
          <Image 
            src="/3_icon_walrus_color_RGB.svg" 
            alt="Walrus" 
            width={80} 
            height={100}
            className="walrus-image"
          />
        </div>
      )}

      {/* Footer Marquee */}
      <div className="absolute bottom-0 w-full bg-white text-black py-2 overflow-hidden whitespace-nowrap border-t-4 border-walrus-pink">
        <div className="animate-marquee inline-block font-mono font-bold uppercase tracking-widest">
           VERIFY AND ATTEST YOUR MODELS +++ POWERED BY WALRUS & NAUTILUS +++ 
           VERIFY AND ATTEST YOUR MODELS +++ POWERED BY WALRUS & NAUTILUS +++ 
           VERIFY AND ATTEST YOUR MODELS +++ POWERED BY WALRUS & NAUTILUS +++ 
           VERIFY AND ATTEST YOUR MODELS +++ POWERED BY WALRUS & NAUTILUS +++
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        @keyframes shake {
          0%, 100% { transform: rotate(-2deg) translate(0, 0); }
          10% { transform: rotate(-2deg) translate(-2px, -1px); }
          20% { transform: rotate(-2deg) translate(2px, 1px); }
          30% { transform: rotate(-2deg) translate(-2px, 1px); }
          40% { transform: rotate(-2deg) translate(2px, -1px); }
          50% { transform: rotate(-2deg) translate(-1px, 2px); }
          60% { transform: rotate(-2deg) translate(1px, -2px); }
          70% { transform: rotate(-2deg) translate(-1px, -1px); }
          80% { transform: rotate(-2deg) translate(1px, 1px); }
          90% { transform: rotate(-2deg) translate(-1px, 0); }
        }
        .badge-shake:hover {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes walrusFloat {
          0% {
            transform: translate(calc(var(--start-x, 0vw) - 50%), calc(var(--start-y, 0vh) - 50%)) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(calc(var(--mid-x, 50vw) - 50%), calc(var(--mid-y, 50vh) - 50%)) rotate(var(--rotation, 0deg));
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(var(--end-x, 100vw) - 50%), calc(var(--end-y, 100vh) - 50%)) rotate(0deg);
            opacity: 0;
          }
        }
        .walrus-float {
          position: fixed;
          left: 50%;
          top: 50%;
          z-index: 5;
          pointer-events: none;
          animation: walrusFloat 4s ease-in-out forwards;
        }
        .walrus-image {
          filter: drop-shadow(0 0 10px rgba(151, 240, 229, 0.5));
        }
      `}</style>
    </div>
  );
}
