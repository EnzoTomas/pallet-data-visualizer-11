
import React from 'react';
import { RobotAnimations } from './robot/RobotAnimations';
import { RobotBase } from './robot/RobotBase';
import { RobotBody } from './robot/RobotBody';
import { RobotArms } from './robot/RobotArms';
import { RobotGripper } from './robot/RobotGripper';
import { AnimatedBoxes } from './robot/AnimatedBoxes';
import { Pallet } from './robot/Pallet';
import { WorkParticles } from './robot/WorkParticles';

export const PalletRobot = () => {
  return (
    <div className="relative w-20 h-20 mx-4">
      <RobotAnimations />
      <RobotBase />
      <RobotBody />
      <RobotArms />
      <RobotGripper />
      <AnimatedBoxes />
      <Pallet />
      <WorkParticles />
    </div>
  );
};
