import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colors, shadows, transitions } from 'constants/theme';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${colors.cardBackground};
  border: 1px solid ${colors.borderDark};
  border-radius: 4px;
  box-shadow: ${shadows.dark};
  max-height: 300px;
  overflow-y: auto;

  // Hide scrollbar
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const DropdownItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.background};
    transition: ${transitions.fast};
  }
`;

export const CoinInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const CoinIcon = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 16px;
`;

export const CoinName = styled.p`
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
`;

export const CoinSymbol = styled.span`
  font-size: 12px;
  line-height: 14px;
  color: ${colors.primaryText}90;
`;

export const CoinValue = styled.p`
  font-family: monospace;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
  text-align: right;
`;

export const CoinChange = styled.div<{ isPositive: boolean }>(
  ({ isPositive }) => css`
    font-family: monospace;
    font-size: 12px;
    color: ${isPositive ? colors.success : colors.danger};
    text-align: right;
  `,
);

export const Chevron = styled.img`
  width: 16px;
  height: 16px;
  cursor: pointer;
`;
