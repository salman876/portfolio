import { FC, ReactNode } from 'react';

import { ButtonLoader, CustomButton } from './Button.styles';

type ButtonProps = {
  children: ReactNode;
  isProcessing?: boolean;
  onClick: () => void;
};

export const Button: FC<ButtonProps> = ({ children, isProcessing, onClick }) => {
  return (
    <CustomButton onClick={onClick}>
      {isProcessing ? <ButtonLoader src={'assets/icons/loading.gif'} width="40" height="40" /> : children}
    </CustomButton>
  );
};
