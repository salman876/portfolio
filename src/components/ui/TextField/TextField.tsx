import { FC, InputHTMLAttributes, ReactNode } from 'react';

import { HelperText, Input, InputWrapper, Label, PostfixWrapper } from './TextField.styles';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isError?: boolean;
  helperText?: string;
  postfix?: ReactNode;
  'data-testid'?: string;
}

export const TextField: FC<TextFieldProps> = ({
  label,
  helperText,
  postfix,
  isError,
  'data-testid': testId,
  ...props
}) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Input {...props} isError={isError} data-testid={`${testId}-textfield`} />
        {postfix && <PostfixWrapper>{postfix}</PostfixWrapper>}
      </InputWrapper>
      {helperText && <HelperText isError={isError}>{helperText}</HelperText>}
    </>
  );
};
