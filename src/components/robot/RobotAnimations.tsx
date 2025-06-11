import React from 'react';

export const RobotAnimations = () => {
  return (
    <style>{`
      /* Animação do ombro (mantida como estava) */
      @keyframes shoulderMove {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-15deg); }
        50% { transform: rotate(10deg); }
        75% { transform: rotate(-5deg); }
      }
      
      /* Animação do antebraço (mantida como estava) */
      @keyframes armMove {
        0%, 100% { transform: rotate(0deg); }
        30% { transform: rotate(-20deg) translateY(-2px); }
        60% { transform: rotate(15deg) translateY(-4px); }
        80% { transform: rotate(-10deg) translateY(-1px); }
      }

      /* NOVA ANIMAÇÃO UNIFICADA: O caminho da Garra e da Caixa */
      @keyframes gripperPath {
        /* Fase 1: Ir até a caixa (0% -> 30%) */
        0% {
          transform: translateX(0px) translateY(0px) rotate(0deg);
        }
        30% {
          /* Ponto exato onde a garra encontra a caixa */
          transform: translateX(-18px) translateY(8px) rotate(-35deg);
        }

        /* Fase 2: Levar a caixa até o pallet (30% -> 70%) */
        70% {
          /* Ponto exato onde a garra solta a caixa no pallet */
          transform: translateX(28px) translateY(18px) rotate(25deg);
        }

        /* Fase 3: Voltar para a posição inicial (70% -> 100%) */
        100% {
          transform: translateX(0px) translateY(0px) rotate(0deg);
        }
      }

      /* NOVA ANIMAÇÃO DE AÇÃO: Abrir e Fechar a Garra */
      @keyframes gripperGrabAction {
        /* Garra fica aberta até chegar na caixa */
        0%, 25% { transform: scaleX(1); }
        
        /* Fecha para pegar a caixa */
        30%, 65% { transform: scaleX(0.7); } 
        
        /* Abre para soltar a caixa */
        70%, 100% { transform: scaleX(1); }
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
