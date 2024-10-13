import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { Coin } from 'types/coin';

import { CoinSelect } from 'components/ui/CoinSelect';

interface FormCoinSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  label?: string;
  placeholder?: string;
  helperText?: string;
  notFoundText?: string;
  isError?: boolean;
  control: Control<TFieldValues>;
  options: Coin[];
}

export const FormCoinSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder,
  helperText,
  notFoundText,
  isError,
  control,
  options,
  ...props
}: FormCoinSelectProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController<TFieldValues, TName>({ name, control });
  const errorMessage = error?.message;

  return (
    <CoinSelect
      {...props}
      value={value}
      label={label}
      placeholder={placeholder}
      notFoundText={notFoundText}
      coins={options}
      onSelect={onChange}
      helperText={errorMessage || helperText}
      isError={Boolean(errorMessage) || isError}
    />
  );
};
