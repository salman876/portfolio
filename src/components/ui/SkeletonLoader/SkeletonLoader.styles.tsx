import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

import { colors } from 'constants/theme';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const LoaderBar = styled.div<{ width: string; height: string; margin: string }>(
  ({ width, height, margin }) => css`
    width: ${width};
    height: ${height};
    margin: ${margin};
    background: linear-gradient(
      90deg,
      ${colors.cardBackground} 25%,
      ${colors.border} 50%,
      ${colors.cardBackground} 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1s infinite;
    border-radius: 4px;
  `,
);
