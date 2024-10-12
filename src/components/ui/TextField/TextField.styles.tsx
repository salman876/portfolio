import { css } from '@emotion/react';
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

export const HelperText = styled.p<{ isError?: boolean }>(
  ({ isError }) => css`
    font-size: 12px;
    line-height: 14px;
    margin: 8px 0;
    color: ${isError ? colors.danger : colors.primaryText};
  `,
);

export const Input = styled.input<{ isError?: boolean }>(
  ({ isError }) => css`
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

    :disabled {
      cursor: not-allowed;
    }

    ${isError &&
    css`
      border-color: ${colors.danger};

      :focus {
        border-color: ${colors.danger};
      }
    `};
  `,
);

export const PostfixWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
`;
