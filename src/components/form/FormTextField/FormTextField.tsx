import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { TextField, TextFieldProps } from 'components/ui/TextField';

export interface IFormTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends TextFieldProps {
  name: TName;
  control: Control<TFieldValues>;
}

export const FormTextField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  ...props
}: IFormTextFieldProps<TFieldValues, TName>): JSX.Element => {
  const {
    field: { onBlur, onChange, value },
  } = useController<TFieldValues, TName>({ name, control });
  return (
    <TextField
      {...props}
      name={name}
      onBlur={onBlur}
      onChange={val => {
        onChange(val);
        if (props.onChange) {
          props.onChange(val);
        }
      }}
      value={value}
    />
  );
};
