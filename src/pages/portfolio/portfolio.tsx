import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FC, useMemo, useState } from 'react';

import { Asset } from 'types/asset';

import { attachRequestCancellation } from 'utils/attachRequestCancellation';
import { formatUSD } from 'utils/formatUSD';

import { fetchCoinMarkets } from 'api/coingecko';

import { AssetModal } from 'components/AssetModal';
import { AssetTable } from 'components/AssetTable';
import { Button } from 'components/ui/Button';
import { TextField } from 'components/ui/TextField';

import {
  BalanceAmount,
  BalanceLabel,
  ButtonWrapper,
  FlexWrapper,
  MainWrapper,
  SearchWrapper,
} from './portfolio.styles';

const ASSETS: Asset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=035',
    amount: 2,
    current_price: 63000,
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'eth',
    image: 'https://cryptologos.cc/logos/versions/ethereum-eth-logo-diamond-purple.svg?v=035',
    amount: 22,
    current_price: 2410.8,
  },
  {
    id: 'tether',
    name: 'Tether',
    symbol: 'usdt',
    image: 'https://cryptologos.cc/logos/tether-usdt-logo.png?v=035',
    amount: 49,
    current_price: 1,
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'ltc',
    image: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png?v=035',
    amount: 10,
    current_price: 65.11,
  },
];

export const Portfolio: FC = () => {
  const [assets, setAssets] = useState<Asset[]>(ASSETS);
  const [assetModal, setAssetModal] = useState<{ show: boolean; type: 'add' | 'release' }>({
    show: false,
    type: 'add',
  });

  const totalBalance = useMemo(() => ASSETS.reduce((sum, asset) => sum + asset.amount * asset.current_price, 0), []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setAssets(ASSETS);
      return;
    }

    setAssets(assets.filter(asset => asset.name.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleAssetClick = (asset: Asset) => console.log(asset.name);

  const handleAssetManageClick = (type: 'add' | 'release') => setAssetModal({ show: true, type });

  const handleAssetModalClose = () => setAssetModal({ ...assetModal, show: false });

  const dataQuery = useQuery({
    queryKey: ['coins'],
    queryFn: attachRequestCancellation(cancelToken => fetchCoinMarkets(cancelToken, 'usd')),
    placeholderData: keepPreviousData,
    retry: false,
    refetchOnWindowFocus: false,
  });

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
        <SearchWrapper>
          <TextField placeholder="Search" onChange={e => handleSearch(e.target.value)} />
        </SearchWrapper>
        <ButtonWrapper>
          <Button onClick={() => handleAssetManageClick('add')} isProcessing={dataQuery.isPending}>
            Manage Holdings
          </Button>
        </ButtonWrapper>
      </FlexWrapper>
      {assets.length > 0 ? <AssetTable assets={assets} onRowClick={handleAssetClick} /> : <p>No assets found.</p>}
      {assetModal.show && dataQuery.data && (
        <AssetModal coins={dataQuery.data} type={assetModal.type} onClose={handleAssetModalClose} />
      )}
    </MainWrapper>
  );
};
