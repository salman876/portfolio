import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';

import { CoinSelect, CoinSelectProps } from 'components/ui/CoinSelect';

interface FormCoinSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends Omit<CoinSelectProps, 'onSelect'> {
  name: TName;
  control: Control<TFieldValues>;
}

export const FormCoinSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
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
      initialCoin={value}
      onSelect={onChange}
      helperText={errorMessage || props.helperText}
      isError={Boolean(errorMessage) || props.isError}
    />
  );
};
