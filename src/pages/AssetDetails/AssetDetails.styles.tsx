import styled from '@emotion/styled';

import { breakpoints, colors, shadows, transitions } from 'constants/theme';

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  background: ${colors.background};
`;

export const BackButton = styled.button`
  background: none;
  appearance: none;
  cursor: pointer;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: relative;

  :hover {
    border-color: ${colors.borderActive};
    color: ${colors.borderActive};
    transition: ${transitions.fast};
  }

  :active {
    border-color: ${colors.borderActive};
    color: ${colors.borderActive};
    transition: ${transitions.fast};
  }
`;

export const BackIcon = styled.img`
  display: block;
  position: absolute;
  top: 7px;
  left: 7px;
`;

export const Title = styled.h1`
  color: ${colors.primaryText};
`;

export const MainWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 40px;

  ${breakpoints.medium} {
    grid-template-columns: 2fr 1fr;
  }
`;

export const AssetWrapper = styled.div`
  border: 1px solid ${colors.border};
  border-radius: 4px;
  padding: 32px;
  box-shadow: ${shadows.dark};
`;

export const Description = styled.div`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  color: ${colors.primaryText};
`;
