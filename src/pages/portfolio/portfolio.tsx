import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FC, useEffect, useMemo, useState } from 'react';

import { Asset } from 'types/asset';

import { attachRequestCancellation } from 'utils/attachRequestCancellation';
import { formatUSD } from 'utils/formatUSD';

import { fetchCoinMarkets } from 'api/coingecko';

import { useAssetsContext } from 'contexts/assets';

import { AssetTable } from 'components/AssetTable';
import { AssetTabs } from 'components/AssetTabs';
import { Button } from 'components/ui/Button';
import { Modal } from 'components/ui/Modal';
import { TextField } from 'components/ui/TextField';

import {
  BalanceAmount,
  BalanceLabel,
  ButtonWrapper,
  FlexWrapper,
  MainWrapper,
  SearchWrapper,
} from './portfolio.styles';

export const Portfolio: FC = () => {
  const [storedAssets] = useAssetsContext();

  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(storedAssets);
  const [assetModal, setAssetModal] = useState<{ show: boolean; type: 'deposit' | 'withdrawal' }>({
    show: false,
    type: 'deposit',
  });

  const totalBalance = useMemo(
    () => storedAssets.reduce((sum, asset) => sum + asset.amount * asset.current_price, 0),
    [storedAssets],
  );

  useEffect(() => {
    setFilteredAssets(storedAssets);
  }, [storedAssets]);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredAssets(storedAssets);
      return;
    }

    setFilteredAssets(
      storedAssets.filter(
        asset =>
          asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          asset.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  const handleAssetClick = (asset: Asset) => console.log(asset.name);

  const handleAssetManageClick = (type: 'deposit' | 'withdrawal') => setAssetModal({ show: true, type });

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
          <Button onClick={() => handleAssetManageClick('deposit')} isProcessing={dataQuery.isPending}>
            Manage Holdings
          </Button>
        </ButtonWrapper>
      </FlexWrapper>
      {filteredAssets.length > 0 ? (
        <AssetTable assets={filteredAssets} onRowClick={handleAssetClick} />
      ) : (
        <p>No assets found.</p>
      )}
      {assetModal.show && dataQuery.data && (
        <Modal isOpen onClose={handleAssetModalClose} title="Manage Holdings">
          <AssetTabs
            type={'deposit'}
            coins={dataQuery.data}
            onCompleteCallback={() => setAssetModal({ ...assetModal, show: false })}
          />
        </Modal>
      )}
    </MainWrapper>
  );
};
