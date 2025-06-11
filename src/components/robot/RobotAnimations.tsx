
import React from 'react';

export const RobotAnimations = () => {
  return (
    <style>{`
      @keyframes shoulderMove {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(-15deg); }
        50% { transform: rotate(10deg); }
        75% { transform: rotate(-5deg); }
        100% { transform: rotate(0deg); }
      }
      
      @keyframes armMove {
        0% { transform: rotate(0deg) translateY(0); }
        30% { transform: rotate(-20deg) translateY(-2px); }
        60% { transform: rotate(15deg) translateY(-4px); }
        80% { transform: rotate(-10deg) translateY(-1px); }
        100% { transform: rotate(0deg) translateY(0); }
      }
      
      @keyframes gripperMove {
        0% { 
          transform: translateX(0) translateY(0) rotate(0deg);
          opacity: 1;
        }
        15% { 
          transform: translateX(5px) translateY(-8px) rotate(-15deg);
          opacity: 1;
        }
        30% { 
          transform: translateX(12px) translateY(-12px) rotate(-20deg);
          opacity: 1;
        }
        45% { 
          transform: translateX(18px) translateY(-8px) rotate(10deg);
          opacity: 1;
        }
        60% { 
          transform: translateX(22px) translateY(-2px) rotate(15deg);
          opacity: 1;
        }
        75% { 
          transform: translateX(20px) translateY(2px) rotate(-5deg);
          opacity: 1;
        }
        90% { 
          transform: translateX(10px) translateY(4px) rotate(-10deg);
          opacity: 1;
        }
        100% { 
          transform: translateX(0) translateY(0) rotate(0deg);
          opacity: 1;
        }
      }
      
      @keyframes gripperGrab {
        0%, 20% {
          transform: scaleX(1);
        }
        35%, 65% {
          transform: scaleX(0.7);
        }
        80%, 100% {
          transform: scaleX(1);
        }
      }
      
      @keyframes boxPalletize {
        0% {
          transform: translateX(-20px) translateY(-25px) rotate(0deg);
          opacity: 0;
        }
        10% {
          transform: translateX(-15px) translateY(-20px) rotate(2deg);
          opacity: 1;
        }
        25% {
          transform: translateX(-5px) translateY(-15px) rotate(-1deg);
          opacity: 1;
        }
        40% {
          transform: translateX(8px) translateY(-12px) rotate(1deg);
          opacity: 1;
        }
        55% {
          transform: translateX(15px) translateY(-8px) rotate(0deg);
          opacity: 1;
        }
        70% {
          transform: translateX(20px) translateY(-2px) rotate(0deg);
          opacity: 1;
        }
        85% {
          transform: translateX(25px) translateY(8px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateX(30px) translateY(15px) rotate(0deg);
          opacity: 0.3;
        }
      }
      
      @keyframes workParticle {
        0%, 100% {
          transform: translateY(0) scale(0);
          opacity: 0;
        }
        40% {
          transform: translateY(-10px) scale(1);
          opacity: 1;
        }
        80% {
          transform: translateY(-15px) scale(0.8);
          opacity: 0.6;
        }
      }
    `}</style>
  );
};
