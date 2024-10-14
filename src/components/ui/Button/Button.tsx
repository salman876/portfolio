import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { ButtonLoader, CustomButton } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isDisabled?: boolean;
  isProcessing?: boolean;
  onClick?: () => void;
  'data-testid'?: string;
}

export const Button: FC<ButtonProps> = ({
  children,
  isDisabled,
  isProcessing,
  onClick,
  'data-testid': testId,
  ...props
}) => {
  return (
    <CustomButton
      onClick={onClick}
      isDisabled={isDisabled}
      disabled={isDisabled}
      data-testid={`${testId}-button`}
      {...props}
    >
      {isProcessing ? <ButtonLoader src={'/assets/icons/loading.gif'} width="40" height="40" /> : children}
    </CustomButton>
  );
};
