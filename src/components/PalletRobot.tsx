import React from 'react';
import { RobotAnimations } from './robot/RobotAnimations';
import { Robot } from './robot/Robot';
export const PalletRobot = () => {
  return <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mx-[43px] py-0 px-0 my-[18px]">
      <RobotAnimations />
      <Robot />
    </div>;
};