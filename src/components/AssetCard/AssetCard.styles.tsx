import styled from '@emotion/styled';

import { breakpoints, colors, transitions } from 'constants/theme';

export const Wrapper = styled.button`
  width: 100%;
  border-radius: 4px;
  padding: 20px 16px;
  margin: 8px 0;
  background: ${colors.cardBackground};
  border: none;
  text-decoration: none;
  appearance: none;
  outline: none;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  justify-items: stretch;
  column-gap: 20px;

  :hover {
    opacity: 0.8;
    transform: scale(1.01);
    transition: ${transitions.medium};
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  margin-right: 16px;
`;

export const Property = styled.p`
  font-family: monospace;
  font-size: 14px;
  line-height: 26px;
  text-align: right;

  ${breakpoints.medium} {
    font-size: 16px;
  }
`;
