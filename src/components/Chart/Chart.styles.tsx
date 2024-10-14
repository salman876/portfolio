import styled from '@emotion/styled';

import { breakpoints } from 'constants/theme';

export const ChartWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 480px;
`;

export const ChartMount = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export const TabWrapper = styled.div`
  margin: 20px 0;

  ${breakpoints.medium} {
    width: 50%;
    margin: 40px auto;
    display: block;
  }
`;
