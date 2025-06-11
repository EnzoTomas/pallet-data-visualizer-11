
import React from 'react';
import { RobotAnimations } from './robot/RobotAnimations';
import { Pallet } from './robot/Pallet';
import { Robot } from './robot/Robot';

export const PalletRobot = () => {
  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
      <RobotAnimations />
      <Pallet />
      <Robot />
    </div>
  );
};
