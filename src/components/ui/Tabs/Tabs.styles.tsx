import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors, shadows, transitions } from 'constants/theme';

export const TabsContainer = styled.div`
  height: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
`;

export const Tab = styled.button<{ isActive?: boolean }>(
  ({ isActive }) => css`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    appearance: none;
    outline: none;
    border: none;
    height: 40px;
    background: ${colors.cardBackground};
    font-size: 14px;
    line-height: 26px;
    font-weight: 600;

    :first-of-type {
      border-radius: 4px 0 0 4px;
    }

    :last-of-type {
      border-radius: 0 4px 4px 0;
    }

    :hover {
      cursor: pointer;
    }

    ${isActive &&
    css`
      background: ${colors.primary};
      box-shadow: ${shadows.dark};
    `};

    ${!isActive &&
    css`
      :hover {
        opacity: 0.8;
        transition: ${transitions.fast};
      }
    `};
  `,
);
