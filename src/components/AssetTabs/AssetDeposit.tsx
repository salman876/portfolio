import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as yup from 'yup';

import { colors } from 'constants/theme';

import { Coin } from 'types/coin';

import { formatUSD } from 'utils/formatUSD';

import { useAssetsContext } from 'contexts/assets';

import { FormCoinSelect } from 'components/form/FormCoinSelect';
import { FormTextField } from 'components/form/FormTextField';
import { Button } from 'components/ui/Button';
import { FieldWrapper } from 'components/ui/FieldWrapper';

import { SummaryItem, SummaryTitle } from './AssetTabs.styles';
import { getAssetManagementSchema } from './utils/getAssetManagementSchema';

type AssetDepositProps = {
  coins: Coin[];
  currentCoinId?: string;
  onCompleteCallback?: () => void;
};

export const AssetDeposit: FC<AssetDepositProps> = ({ coins, currentCoinId, onCompleteCallback }) => {
  const [storedAssets, setStoredAssets] = useAssetsContext();

  const currentCoin = useMemo(() => {
    if (!currentCoinId) return undefined;

    return coins.find(coin => coin.id === currentCoinId);
  }, [coins, currentCoinId]);

  const schema = yup.object(getAssetManagementSchema()).required();
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
    watch,
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      coin: currentCoin || undefined,
      amount: 0,
    },
  });

  const [selectedCoin, amount] = watch(['coin', 'amount']);

  const onSubmit = (payload: yup.InferType<typeof schema>) => {
    const assets = [...storedAssets];
    const existingAssetIndex = assets.findIndex(asset => asset.id === payload.coin.id);

    if (existingAssetIndex !== -1) {
      assets[existingAssetIndex].amount += payload.amount;
    } else {
      assets.push({
        id: payload.coin.id,
        symbol: payload.coin.symbol,
        amount: payload.amount,
        name: payload.coin.name,
        image: payload.coin.image,
        current_price: payload.coin.current_price,
      });
    }

    setStoredAssets(assets);
    toast.success('Asset deposited successfully!', {
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

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <FieldWrapper>
        <FormCoinSelect
          name="coin"
          control={control}
          initialCoin={selectedCoin}
          label="Select coin"
          placeholder="Select coin"
          notFoundText="Coin not found"
          coins={coins}
        />
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
      <Button type="submit" isProcessing={isSubmitting} isDisabled={!isValid || !isDirty}>
        Confirm Deposit
      </Button>
    </form>
  );
};
