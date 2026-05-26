import React from 'react';
import { Composition } from 'remotion';
import { PachBannLoop } from './PachBannLoop';

export const RemotionRoot = () => {
  return (
    <Composition
      id="PachBannLoop"
      component={PachBannLoop}
      durationInFrames={180}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
