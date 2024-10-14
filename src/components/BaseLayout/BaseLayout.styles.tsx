import styled from '@emotion/styled';

import { breakpoints, colors } from 'constants/theme';

export const Main = styled.main`
  padding: 16px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  margin: 0px auto;
  margin: 0px auto;
  max-height: calc(100vh + 50px);
  padding-bottom: 64px;

  ${breakpoints.medium} {
    max-width: 1400px;
  }
`;

export const FooterWrapper = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  height: 50px;
  background: ${colors.background};
`;

export const Copyright = styled.p`
  font-size: 12px;
  line-height: 14px;
  color: ${colors.primaryText};
`;
