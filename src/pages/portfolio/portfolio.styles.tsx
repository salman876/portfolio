import styled from '@emotion/styled';

import { breakpoints } from 'constants/theme';

export const BalanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
`;

export const MainWrapper = styled.div`
  display: grid;

  ${breakpoints.medium} {
    grid-template-columns: 2fr 1fr;
    column-gap: 40px;
  }
`;

export const BalanceAmount = styled.p`
  font-family: monospace;
  font-size: 32px;
`;

export const BalanceLabel = styled.p`
  font-size: 14px;
  line-height: 14px;
  text-align: right;
  opacity: 0.7;
`;
