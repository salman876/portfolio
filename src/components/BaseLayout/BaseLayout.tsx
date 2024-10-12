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
        <Copyright>
          By &nbsp; <a href="https://www.linkedin.com/in/salman-quraishi/">Salman Q</a> &nbsp; | &nbsp;
          {`Copyright? © ${new Date().getFullYear()}`}
        </Copyright>
      </FooterWrapper>
    </Main>
  );
};
