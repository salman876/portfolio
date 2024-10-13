import { FC } from 'react';

import { LoaderBar } from './SkeletonLoader.styles';

type SkeletonLoaderProps = {
  width?: string;
  height?: string;
  margin?: string;
};

export const SkeletonLoader: FC<SkeletonLoaderProps> = ({ width = '100%', height = '20px', margin = '0' }) => {
  return <LoaderBar width={width} height={height} margin={margin} />;
};
