import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors, transitions } from 'constants/theme';

export const CustomButton = styled.button<{ isDisabled?: boolean }>(
  ({ isDisabled }) => css`
    width: 100%;
    height: 60px;
    background: ${colors.primary};
    text-decoration: none;
    appearance: none;
    outline: none;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 8px 16px;
    margin: 0;
    font-size: 14px;
    font-weight: 600;

    :hover {
      background: ${colors.primaryLight};
      transition: ${transitions.fast};
    }

    :active {
      background: ${colors.primaryLight};
    }

    ${isDisabled &&
    css`
      background: ${colors.disabled};
      cursor: not-allowed;

      :hover {
        background: ${colors.disabled};
      }
    `}
  `,
);

export const ButtonLoader = styled.img`
  margin: 0 auto;
`;
