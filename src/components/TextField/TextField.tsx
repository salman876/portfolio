import { FC, InputHTMLAttributes } from 'react';

import { Input, Label, Wrapper } from './TextField.styles';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const TextField: FC<TextFieldProps> = ({ label, ...props }) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Input {...props} />
    </Wrapper>
  );
};
