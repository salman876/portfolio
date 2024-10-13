import { FC } from 'react';

import { Wrapper } from './Error.styles';

export const Error: FC<{ code: 500 | 404 }> = ({ code }) => {
  return (
    <Wrapper>
      <h1>{code} |</h1>
      <p>{code === 404 ? 'Not found.' : 'Something went wrong.'}</p>
    </Wrapper>
  );
};
