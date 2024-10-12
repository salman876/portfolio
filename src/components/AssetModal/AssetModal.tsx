import { FC } from 'react';

import { Coin } from 'types/coin';

import { CoinSelect } from 'components/CoinSelect';
import { Modal } from 'components/ui/Modal';

type AssetModalProps = {
  coins: Coin[];
  type: 'add' | 'release';
  onClose: () => void;
};

export const AssetModal: FC<AssetModalProps> = ({ type, coins, onClose }) => {
  const handleCoinSelect = (coin: Coin) => console.log(coin.name);

  return (
    <Modal isOpen onClose={onClose} title="Manage Holdings">
      <CoinSelect label="Select coin" placeholder="Select coin" coins={coins} onSelect={handleCoinSelect} />
    </Modal>
  );
};
