import styled from '@emotion/styled';

import { colors } from 'constants/theme';

export const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const Label = styled.p`
  font-size: 14px;
  line-height: 26px;
  margin-bottom: 2px;
  color: ${colors.label};
`;

export const Input = styled.input`
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  padding: 0 20px;
  outline: none;
  appearance: none;
  border: 1px solid ${colors.border};
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
    border: 1px solid ${colors.borderActive};
  }
`;

export const PostfixWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;
