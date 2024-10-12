import { FC, InputHTMLAttributes, ReactNode } from 'react';

import { Input, InputWrapper, Label, PostfixWrapper } from './TextField.styles';

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  postfix?: ReactNode;
}

export const TextField: FC<TextFieldProps> = ({ label, postfix, ...props }) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Input {...props} />
        {postfix && <PostfixWrapper>{postfix}</PostfixWrapper>}
      </InputWrapper>
    </>
  );
};
