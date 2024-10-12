import { FC, useState } from 'react';

import { Coin } from 'types/coin';

import { formatUSD } from 'utils/formatUSD';

import { CoinSelect } from 'components/CoinSelect';
import { Button } from 'components/ui/Button';
import { FieldWrapper } from 'components/ui/FieldWrapper';
import { Modal } from 'components/ui/Modal';
import { TextField } from 'components/ui/TextField';

import { SummaryItem, SummaryTitle } from './AssetModal.styles';

type AssetModalProps = {
  coins: Coin[];
  type: 'add' | 'release';
  onClose: () => void;
};

export const AssetModal: FC<AssetModalProps> = ({ type, coins, onClose }) => {
  const [selectedCoin, setSelectedCoin] = useState<Coin>();

  const handleCoinSelect = (coin: Coin) => setSelectedCoin(coin);

  return (
    <Modal isOpen onClose={onClose} title="Manage Holdings">
      <FieldWrapper>
        <CoinSelect label="Select coin" placeholder="Select coin" coins={coins} onSelect={handleCoinSelect} />
      </FieldWrapper>
      <FieldWrapper>
        <TextField
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
            <span>{`2 ${selectedCoin.symbol.toUpperCase()}`}</span>
          </SummaryItem>
          <SummaryItem>
            <span>Balance</span>
            <span>{`${formatUSD(2 * selectedCoin.current_price)}`}</span>
          </SummaryItem>
        </>
      )}
      <Button type="submit" onClick={() => {}} isDisabled={!selectedCoin}>
        Confirm
      </Button>
    </Modal>
  );
};
