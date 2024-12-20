import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import { colors } from 'constants/theme';

import { Asset } from 'types/asset';
import { Coin } from 'types/coin';

import { formatUSD } from 'utils/formatUSD';

import { useAssetsContext } from 'contexts/assets';

import { FormCoinSelect } from 'components/form/FormCoinSelect';
import { FormTextField } from 'components/form/FormTextField';
import { Button } from 'components/ui/Button';
import { FieldWrapper } from 'components/ui/FieldWrapper';

import { SummaryItem, SummaryTitle } from './AssetTabs.styles';
import { getAssetManagementSchema } from './utils/getAssetManagementSchema';

type AssetWithdrawalProps = {
  coins: Coin[];
  currentCoinId?: string;
  onCompleteCallback?: () => void;
};

export const AssetWithdrawal: FC<AssetWithdrawalProps> = ({ coins, currentCoinId, onCompleteCallback }) => {
  const [storedAssets, setStoredAssets] = useAssetsContext();

  const assetCoins = useMemo(
    () => coins.filter(coin => storedAssets.some(asset => asset.id === coin.id)),
    [coins, storedAssets],
  );

  // I assume I'll only get here from a coin that's in my asset.
  // Meaning I am not viewing a coin here that I don't own.
  const currentCoin = useMemo(() => {
    if (!currentCoinId) return undefined;

    return assetCoins.find(assetCoin => assetCoin.id === currentCoinId);
  }, [assetCoins, currentCoinId]);

  const schema = yup.object(getAssetManagementSchema()).required();
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
    watch,
    setValue,
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      coin: currentCoin || undefined,
      holdAmount: 0,
      amount: 0,
    },
  });

  const [selectedCoin, amount] = watch(['coin', 'amount']);

  const holdAmount = useMemo(() => {
    if (!selectedCoin) return 0;

    return storedAssets.find(asset => asset.id === selectedCoin.id)?.amount || 0;
  }, [storedAssets, selectedCoin]);

  const onSubmit = (payload: yup.InferType<typeof schema>) => {
    const updatedAssets = storedAssets
      .map(asset => {
        if (asset.id === payload.coin.id) {
          const newAmount = asset.amount - payload.amount;
          return newAmount > 0 ? { ...asset, amount: newAmount } : null;
        }
        return asset;
      })
      .filter(Boolean) as Asset[];

    setStoredAssets(updatedAssets);
    toast.success('Asset withdrawn successfully!', {
      style: {
        borderRadius: '4px',
        background: colors.cardBackground,
        color: colors.primaryText,
        fontSize: '16px',
        lineHeight: '26px',
        fontWeight: '600',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      },
    });
    onCompleteCallback?.();
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
          id="coin"
          name="coin"
          control={control}
          initialCoin={selectedCoin}
          label="Select coin"
          placeholder="Select coin"
          notFoundText="Coin not found"
          coins={assetCoins}
          data-testid="withdrawal"
        />
      </FieldWrapper>
      <FieldWrapper>
        <FormTextField
          id="holdAmount"
          name="holdAmount"
          control={control}
          label="Hodling Amount"
          placeholder="Select asset first."
          value={holdAmount}
          type="number"
          postfix={<span>{selectedCoin?.symbol.toUpperCase()}</span>}
          data-testid="hold-amount"
          disabled
        />
      </FieldWrapper>
      <FieldWrapper>
        <FormTextField
          id="amount"
          name="amount"
          control={control}
          label="Amount"
          disabled={!selectedCoin}
          placeholder={!selectedCoin ? 'Select asset first.' : '0'}
          type="number"
          postfix={<span>{selectedCoin?.symbol.toUpperCase()}</span>}
          data-testid="withdrawal-amount"
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
        isProcessing={isSubmitting}
        isDisabled={!isValid || !isDirty || amount > holdAmount}
        data-testid="withdrawal-submit"
      >
        Confirm Withdrawal
      </Button>
    </form>
  );
};
