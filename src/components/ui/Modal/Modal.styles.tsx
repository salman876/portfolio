import styled from '@emotion/styled';

import { colors, shadows, transitions } from 'constants/theme';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.09);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; // should probably make this a constant
`;

export const ModalContent = styled.div`
  background-color: ${colors.background};
  border: 1px solid ${colors.border};
  box-shadow: ${shadows.dark};
  padding: 20px;
  margin: 8px;
  border-radius: 4px;
  max-width: 400px;
  width: 100%;
  bottom: 10%;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const CloseButton = styled.button`
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

export const CloseIcon = styled.img`
  display: block;
  position: absolute;
  top: 7px;
  left: 7px;
`;

export const Title = styled.h2`
  margin: 0;
  font-weight: 600;
`;
