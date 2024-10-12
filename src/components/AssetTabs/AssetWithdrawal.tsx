import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { Asset } from 'types/asset';
import { Coin } from 'types/coin';

import { formatUSD } from 'utils/formatUSD';

import { FormCoinSelect } from 'components/form/FormCoinSelect';
import { FormTextField } from 'components/form/FormTextField';
import { Button } from 'components/ui/Button';
import { FieldWrapper } from 'components/ui/FieldWrapper';

import { SummaryItem, SummaryTitle } from './AssetTabs.styles';
import { getAssetManagementSchema } from './utils/getAssetManagementSchema';

type AssetWithdrawalProps = {
  coins: Coin[];
  assets: Asset[];
};

export const AssetWithdrawal: FC<AssetWithdrawalProps> = ({ coins, assets }) => {
  const assetCoins = useMemo(() => coins.filter(coin => assets.some(asset => asset.id === coin.id)), [assets, coins]);
  const schema = useMemo(() => yup.object(getAssetManagementSchema(assetCoins)).required(), [assetCoins]);

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
    watch,
    setValue,
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const [selectedCoin, amount] = watch(['coin', 'amount']);

  const holdAmount = useMemo(() => {
    if (!selectedCoin) return 0;

    return assets.find(asset => asset.id === selectedCoin.id)?.amount || 0;
  }, [assets, selectedCoin]);

  const onSubmit = (payload: yup.InferType<typeof schema>) => {
    console.log(payload);
  };

  useEffect(() => {
    if (selectedCoin) {
      setValue('holdAmount', holdAmount, { shouldValidate: true });
    }
  }, [selectedCoin, holdAmount, setValue]);

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper>
        <FormCoinSelect
          name="coin"
          control={control}
          label="Select asset"
          placeholder="Select asset"
          options={assetCoins}
        />
      </FieldWrapper>
      <FieldWrapper>
        <FormTextField
          name="holdAmount"
          control={control}
          label="Hodling Amount"
          placeholder="Select asset first."
          value={holdAmount}
          type="number"
          postfix={<span>{selectedCoin?.symbol.toUpperCase()}</span>}
          disabled
        />
      </FieldWrapper>
      <FieldWrapper>
        <FormTextField
          name="amount"
          control={control}
          label="Amount"
          disabled={!selectedCoin}
          placeholder={!selectedCoin ? 'Select asset first.' : '0'}
          type="number"
          postfix={<span>{selectedCoin?.symbol.toUpperCase()}</span>}
        />
      </FieldWrapper>
      {selectedCoin && (
        <>
          <SummaryTitle>Withdrawal Summary</SummaryTitle>
          <SummaryItem>
            <span>{`${selectedCoin.symbol.toUpperCase()} price`}</span>
            <span>{formatUSD(selectedCoin.current_price)}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Withdraw amount</span>
            <span>{`${amount || 0} ${selectedCoin.symbol.toUpperCase()}`}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Withdraw value</span>
            <span>{`${formatUSD(amount * selectedCoin.current_price)}`}</span>
          </SummaryItem>
        </>
      )}
      <Button
        type="submit"
        onClick={() => {}}
        isProcessing={isSubmitting}
        isDisabled={!isValid || !isDirty || amount > holdAmount}
      >
        Confirm Withdrawal
      </Button>
    </form>
  );
};
