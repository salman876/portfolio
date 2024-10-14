import styled from '@emotion/styled';

import { breakpoints } from 'constants/theme';

export const ChartMount = styled.div`
  display: block;
`;

export const TabWrapper = styled.div`
  margin: 20px 0;

  ${breakpoints.medium} {
    width: 50%;
    margin: 40px auto;
    display: block;
  }
`;
