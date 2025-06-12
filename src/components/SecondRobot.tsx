
import React from 'react';
import { SecondRobotAnimations } from './robot/SecondRobotAnimations';
import { SecondRobotBody } from './robot/SecondRobotBody';

export const SecondRobot = () => {
  return (
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 py-0 px-0 mx-0 my-0">
      <SecondRobotAnimations />
      <SecondRobotBody />
    </div>
  );
};
