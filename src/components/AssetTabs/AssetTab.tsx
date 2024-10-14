import { FC, useState } from 'react';

import { Coin } from 'types/coin';

import { Tabs } from 'components/ui/Tabs';

import { AssetDeposit } from './AssetDeposit';
import { AssetWithdrawal } from './AssetWithdrawal';

const TABS: { label: string; value: 'deposit' | 'withdrawal' }[] = [
  {
    label: 'Deposit',
    value: 'deposit',
  },
  {
    label: 'Withdraw',
    value: 'withdrawal',
  },
];

type AssetTabProps = {
  coins: Coin[];
  type?: 'deposit' | 'withdrawal';
  currentCoinId?: string;
  onCompleteCallback?: () => void;
};

export const AssetTabs: FC<AssetTabProps> = ({ type = 'deposit', coins, currentCoinId, onCompleteCallback }) => {
  const [selectedTab, setSelectedTab] = useState(type);

  return (
    <>
      <Tabs tabs={TABS} selectedTab={selectedTab} onChange={tab => setSelectedTab(tab)} data-testid="asset" />
      {selectedTab === 'deposit' && (
        <AssetDeposit coins={coins} currentCoinId={currentCoinId} onCompleteCallback={onCompleteCallback} />
      )}
      {selectedTab === 'withdrawal' && (
        <AssetWithdrawal coins={coins} currentCoinId={currentCoinId} onCompleteCallback={onCompleteCallback} />
      )}
    </>
  );
};
