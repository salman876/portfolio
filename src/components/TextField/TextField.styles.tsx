import styled from '@emotion/styled';

import { colors } from 'constants/theme';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
`;

export const Label = styled.p`
  font-size: 14px;
  line-height: 26px;
  color: ${colors.label};
`;

export const Input = styled.input`
  height: 60px;
  padding: 0 20px;
  outline: none;
  appearance: none;
  border: 1px solid black;
  border-radius: 4px;
  overflow: hidden;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  font-size: 16px;
  line-height: 26px;

  :focus {
    border: 1px solid #ffffff14;
  }
`;
