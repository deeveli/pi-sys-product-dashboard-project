'use client';

import React from 'react';
import Lottie from 'lottie-react';
import EmptyLottie from '@/animations/empty-lottie.json';

interface LottieAnimationProps {
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  lottieFile?: any;
}
const LottieAnimation: React.FC<LottieAnimationProps> = ({
  loop = true,
  autoplay = true,
  className,
  lottieFile = EmptyLottie,
}) => {
  return (
    <div className={`${className ? className : ''}`}>
      <Lottie animationData={lottieFile} loop={loop} autoplay={autoplay} />
    </div>
  );
};

export default LottieAnimation;
