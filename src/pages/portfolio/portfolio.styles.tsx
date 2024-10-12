import styled from '@emotion/styled';

import { breakpoints } from 'constants/theme';

import { TextField } from 'components/TextField';

export const MainWrapper = styled.div`
  margin: 0 auto;

  ${breakpoints.medium} {
    width: 50%;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
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

export const SearchField = styled(TextField)`
  width: 100%;

  ${breakpoints.medium} {
    width: 50%;
  }
`;
