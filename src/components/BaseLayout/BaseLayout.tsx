import { FC, ReactNode } from 'react';

import { ContentWrapper, Copyright, FooterWrapper, Main } from './BaseLayout.styles';

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <Main>
      <ContentWrapper>{children}</ContentWrapper>
      <FooterWrapper>
        <Copyright>{`Copyright ${new Date().getFullYear()}. All rights reserved.`}</Copyright>
      </FooterWrapper>
    </Main>
  );
};
