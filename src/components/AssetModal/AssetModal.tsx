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
import { Modal } from 'components/ui/Modal';

import { SummaryItem, SummaryTitle } from './AssetModal.styles';
import { getAssetManagementSchema } from './utils/getAssetManagementSchema';

type AssetModalProps = {
  coins: Coin[];
  type: 'add' | 'release';
  onClose: () => void;
};

export const AssetModal: FC<AssetModalProps> = ({ type, coins, onClose }) => {
  const schema = useMemo(() => yup.object(getAssetManagementSchema(coins)).required(), [coins]);

  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid, isSubmitting },
    watch,
  } = useForm<yup.InferType<typeof schema>>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
  });

  const onSubmit = (payload: yup.InferType<typeof schema>) => {
    console.log(payload);
  };

  const [selectedCoin, amount] = watch(['coin', 'amount']);

  return (
    <Modal isOpen onClose={onClose} title="Manage Holdings">
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
            <SummaryTitle>Summary</SummaryTitle>
            <SummaryItem>
              <span>{`${selectedCoin.symbol.toUpperCase()} price`}</span>
              <span>{formatUSD(selectedCoin.current_price)}</span>
            </SummaryItem>
            <SummaryItem>
              <span>Amount</span>
              <span>{`${amount} ${selectedCoin.symbol.toUpperCase()}`}</span>
            </SummaryItem>
            <SummaryItem>
              <span>New balance</span>
              <span>{`${formatUSD(amount * selectedCoin.current_price)}`}</span>
            </SummaryItem>
          </>
        )}
        <Button type="submit" onClick={() => {}} isProcessing={isSubmitting} isDisabled={!isValid || !isDirty}>
          Confirm
        </Button>
      </form>
    </Modal>
  );
};
