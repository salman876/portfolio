import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { TextField, TextFieldProps } from 'components/ui/TextField';

interface FormTextFieldProps<
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
}: FormTextFieldProps<TFieldValues, TName>): JSX.Element => {
  const {
    field: { onBlur, onChange, value },
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, control });
  const errorMessage = error?.message;

  return (
    <TextField
      {...props}
      name={name}
      onBlur={onBlur}
      onChange={val => {
        onChange(val);
        props.onChange?.(val);
      }}
      value={value}
      helperText={errorMessage}
      isError={Boolean(errorMessage)}
    />
  );
};
