
import React from 'react';
import { RobotAnimations } from './robot/RobotAnimations';
import { Pallet } from './robot/Pallet';
import { Robot } from './robot/Robot';
import { AnimatedBox } from './robot/AnimatedBox';
import { WorkParticles } from './robot/WorkParticles';

export const PalletRobot = () => {
  return (
    <div className="relative w-48 h-48 mx-auto mt-10">
      <RobotAnimations />
      <Pallet />
      <AnimatedBox />
      <Robot />
      <WorkParticles />
    </div>
  );
};
