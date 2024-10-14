import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { breakpoints, colors } from 'constants/theme';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin: 40px 0;
`;

export const Card = styled.div`
  background: ${colors.cardBackground};
  border-radius: 4px;
  padding: 16px 20px;
  height: 60px;
  width: 100%;

  ${breakpoints.medium} {
    width: auto;
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
`;

export const InnerFlexWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
  display: block;
`;

export const CoinName = styled.p`
  font-size: 18px;
  line-height: 26px;
  font-weight: bold;
`;

export const CoinSymbol = styled.span`
  font-size: 14px;
  color: ${colors.primaryText}90;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
`;

export const Price = styled.span`
  font-size: 20px;
  font-family: monospace;
`;

export const PriceChange = styled.span<{ isPositive: boolean }>(
  ({ isPositive }) => css`
    font-size: 14px;
    font-family: monospace;
    color: ${isPositive ? colors.success : colors.danger};
  `,
);
