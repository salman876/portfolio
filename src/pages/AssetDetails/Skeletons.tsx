import { SkeletonLoader } from 'components/ui/SkeletonLoader';

export const DescriptionSkeleton = () => (
  <>
    <SkeletonLoader width="50%" margin="0 0 10px 0" />
    <SkeletonLoader margin="0 0 10px 0" />
    <SkeletonLoader width="80%" margin="0 0 10px 0" />
    <SkeletonLoader width="80%" margin="0 0 10px 0" />
    <SkeletonLoader width="60%" margin="0 0 10px 0" />
  </>
);
