import styled from '@emotion/styled';

import { colors } from 'constants/theme';

export const CustomButton = styled.button`
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
  font-weight: 500;

  :hover {
    background: ${colors.primaryLight};
  }

  :active {
    background: ${colors.primaryLight};
  }
`;

export const ButtonLoader = styled.img`
  margin: 0 auto;
`;
