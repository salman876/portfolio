import styled from '@emotion/styled';

import { breakpoints, colors } from 'constants/theme';

export const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ContentWrapper = styled.div`
  height: 100vh;
  padding: 20px;
  flex: 1 1 0%;
  margin: 0px auto;

  ${breakpoints.medium} {
    max-width: 1400px;
    height: calc(100vh - 50px);
  }
`;

export const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0 8px;
  height: 50px;
`;

export const Copyright = styled.p`
  font-size: 14px;
  line-height: 26px;
  color: ${colors.primaryText};
`;
