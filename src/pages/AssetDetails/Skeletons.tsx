import styled from '@emotion/styled';

import { SkeletonLoader } from 'components/ui/SkeletonLoader';

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin: 40px 0;
`;

export const DescriptionSkeleton = () => (
  <>
    <SkeletonLoader width="50%" margin="0 0 10px 0" />
    <SkeletonLoader margin="0 0 10px 0" />
    <SkeletonLoader width="80%" margin="0 0 10px 0" />
    <SkeletonLoader width="80%" margin="0 0 10px 0" />
    <SkeletonLoader width="60%" margin="0 0 10px 0" />
  </>
);

export const StatsSkeleton = () => (
  <FlexWrapper>
    <SkeletonLoader width="30%" height="60px" />
    <SkeletonLoader width="30%" height="60px" />
    <SkeletonLoader width="30%" height="60px" />
  </FlexWrapper>
);
