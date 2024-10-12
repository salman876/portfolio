import { FC, useMemo, useState } from 'react';

import { Asset } from 'types/asset';

import { formatUSD } from 'utils/formatUSD';

import { AssetTable } from 'components/AssetTable';
import { TextField } from 'components/TextField';

import { AddButton, BalanceAmount, BalanceLabel, FlexWrapper, MainWrapper } from './portfolio.styles';

const ASSETS: Asset[] = [
  {
    name: 'Bitcoin',
    symbol: 'btc',
    icon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035',
    amount: 2,
    price: 63000,
  },
  {
    name: 'Ethereum',
    symbol: 'eth',
    icon: 'https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=035',
    amount: 22,
    price: 2410.8,
  },
  {
    name: 'Tether',
    symbol: 'usdt',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=035',
    amount: 49,
    price: 1,
  },
  {
    name: 'Litecoin',
    symbol: 'ltc',
    icon: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=035',
    amount: 10,
    price: 65.11,
  },
];

export const Portfolio: FC = () => {
  const [assets, setAssets] = useState<Asset[]>(ASSETS);

  const totalBalance = useMemo(() => ASSETS.reduce((sum, asset) => sum + asset.amount * asset.price, 0), []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setAssets(ASSETS);
      return;
    }

    setAssets(assets.filter(asset => asset.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleAssetClick = (asset: Asset) => console.log(asset.name);

  return (
    <MainWrapper>
      <FlexWrapper>
        <h1>My Portfolio</h1>
        <div>
          <BalanceAmount>{formatUSD(totalBalance)}</BalanceAmount>
          <BalanceLabel>Balance</BalanceLabel>
        </div>
      </FlexWrapper>
      <FlexWrapper>
        <TextField placeholder="Search" onChange={e => handleSearch(e.target.value)} />
        <AddButton>+ Add Holding</AddButton>
      </FlexWrapper>
      {assets.length > 0 ? <AssetTable assets={assets} onRowClick={handleAssetClick} /> : <p>No assets found.</p>}
    </MainWrapper>
  );
};
