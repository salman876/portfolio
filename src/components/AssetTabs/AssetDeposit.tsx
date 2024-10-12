import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Coin } from 'types/coin';

import { formatUSD } from 'utils/formatUSD';

import { FormCoinSelect } from 'components/form/FormCoinSelect';
import { FormTextField } from 'components/form/FormTextField';
import { Button } from 'components/ui/Button';
import { FieldWrapper } from 'components/ui/FieldWrapper';

import { SummaryItem, SummaryTitle } from './AssetTabs.styles';
import { getAssetManagementSchema } from './utils/getAssetManagementSchema';

type AssetDepositProps = {
  coins: Coin[];
};

export const AssetDeposit: FC<AssetDepositProps> = ({ coins }) => {
  const schema = useMemo(() => yup.object(getAssetManagementSchema(coins)).required(), [coins]);

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
    watch,
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const [selectedCoin, amount] = watch(['coin', 'amount']);

  const onSubmit = (payload: yup.InferType<typeof schema>) => {
    console.log(payload);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper>
        <FormCoinSelect name="coin" control={control} label="Select coin" placeholder="Select coin" options={coins} />
      </FieldWrapper>
      <FieldWrapper>
        <FormTextField
          name="amount"
          control={control}
          label="Amount"
          disabled={!selectedCoin}
          placeholder={!selectedCoin ? 'Select coin first.' : '0'}
          type="number"
          postfix={<span>{selectedCoin?.symbol.toUpperCase()}</span>}
        />
      </FieldWrapper>
      {selectedCoin && (
        <>
          <SummaryTitle>Deposit Summary</SummaryTitle>
          <SummaryItem>
            <span>{`${selectedCoin.symbol.toUpperCase()} price`}</span>
            <span>{formatUSD(selectedCoin.current_price)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Deposit amount</span>
            <span>{`${amount || 0} ${selectedCoin.symbol.toUpperCase()}`}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Value</span>
            <span>{`${formatUSD(amount * selectedCoin.current_price)}`}</span>
          </SummaryItem>
        </>
      )}
      <Button type="submit" onClick={() => {}} isProcessing={isSubmitting} isDisabled={!isValid || !isDirty}>
        Confirm Deposit
      </Button>
    </form>
  );
};
