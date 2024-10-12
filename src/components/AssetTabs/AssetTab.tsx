import { FC, useState } from 'react';

import { Asset } from 'types/asset';
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
  assets: Asset[];
  coins: Coin[];
};

export const AssetTabs: FC<AssetTabProps> = ({ type, assets, coins }) => {
  const [selectedTab, setSelectedTab] = useState(type);

  return (
    <>
      <Tabs tabs={TABS} selectedTab={selectedTab} onChange={tab => setSelectedTab(tab)} />
      {selectedTab === 'deposit' && <AssetDeposit coins={coins} />}
      {selectedTab === 'withdrawal' && <AssetWithdrawal coins={coins} assets={assets} />}
    </>
  );
};
