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
  type: 'deposit' | 'withdrawal';
  coins: Coin[];
  onCompleteCallback?: () => void;
};

export const AssetTabs: FC<AssetTabProps> = ({ type, coins, onCompleteCallback }) => {
  const [selectedTab, setSelectedTab] = useState(type);

  return (
    <>
      <Tabs tabs={TABS} selectedTab={selectedTab} onChange={tab => setSelectedTab(tab)} />
      {selectedTab === 'deposit' && <AssetDeposit coins={coins} onCompleteCallback={onCompleteCallback} />}
      {selectedTab === 'withdrawal' && <AssetWithdrawal coins={coins} onCompleteCallback={onCompleteCallback} />}
    </>
  );
};
