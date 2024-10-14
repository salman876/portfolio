import styled from '@emotion/styled';

import { breakpoints } from 'constants/theme';

export const MainWrapper = styled.div`
  margin: 0 auto;

  ${breakpoints.medium} {
    width: 50%;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  column-gap: 20px;
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

export const SearchWrapper = styled.div`
  width: 100%;
  flex-grow: 2;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  flex-shrink: 2;
`;
