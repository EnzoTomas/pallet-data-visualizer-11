
import React from 'react';

export const SecondRobotAnimations = () => {
  return (
    <style>{`
      /* Animação do braço principal - movimento mais amplo */
      @keyframes second-arm-sweep {
        0%, 100% { transform: rotate(-45deg); }
        25% { transform: rotate(10deg); }
        50% { transform: rotate(60deg); }
        75% { transform: rotate(25deg); }
      }
      
      /* Animação do braço secundário - movimento oposto */
      @keyframes second-forearm-swing {
        0%, 100% { transform: rotate(40deg); }
        25% { transform: rotate(-20deg); }
        50% { transform: rotate(-45deg); }
        75% { transform: rotate(15deg); }
      }

      /* Animação da garra - abertura e fechamento mais rápido */
      @keyframes second-claw-action {
        0%, 20% { transform: scaleX(1.2); }
        25%, 45% { transform: scaleX(0.4); }
        50%, 70% { transform: scaleX(1.2); }
        75%, 95% { transform: scaleX(0.7); }
        100% { transform: scaleX(1.2); }
      }

      /* Animação da caixa - trajetória diferente */
      @keyframes second-box-movement {
        0%, 24% {
          transform: translateX(-15px) translateY(5px);
          opacity: 1;
        }
        25% {
          transform: translateX(-15px) translateY(5px);
          opacity: 1;
        }
        50% {
          transform: translateX(45px) translateY(35px);
          opacity: 1;
        }
        75% {
          transform: translateX(70px) translateY(50px);
          opacity: 1;
        }
        76%, 100% {
          transform: translateX(70px) translateY(50px);
          opacity: 0;
        }
      }

      /* Partículas de trabalho */
      @keyframes second-work-sparkle {
        0%, 100% {
          transform: translateY(0) scale(0) rotate(0deg);
          opacity: 0;
        }
        30% {
          transform: translateY(-8px) scale(1) rotate(180deg);
          opacity: 1;
        }
        70% {
          transform: translateY(-12px) scale(0.9) rotate(360deg);
          opacity: 0.8;
        }
      }
    `}</style>
  );
};
