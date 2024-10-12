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
  control,
  options,
  ...props
}: FormCoinSelectProps<TFieldValues, TName>) => {
  const {
    field: { onChange, value },
  } = useController<TFieldValues, TName>({ name, control });
  return (
    <CoinSelect {...props} value={value} label={label} placeholder={placeholder} coins={options} onSelect={onChange} />
  );
};
