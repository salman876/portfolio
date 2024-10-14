import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { generatePath, useNavigate } from 'react-router-dom';

import { colors } from 'constants/theme';

import { AppRoute } from 'enums/routes';

import { Asset } from 'types/asset';
import { Coin } from 'types/coin';

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
} from './Portfolio.styles';

export const Portfolio: FC = () => {
  const navigate = useNavigate();

  const [storedAssets, setStoredAssets] = useAssetsContext();

  const [filteredAssets, setFilteredAssets] = useState<Asset[]>(storedAssets);
  const [assetModal, setAssetModal] = useState<{ show: boolean; type: 'deposit' | 'withdrawal' }>({
    show: false,
    type: 'deposit',
  });

  const totalBalance = useMemo(
    () => storedAssets.reduce((sum, asset) => sum + asset.amount * asset.current_price, 0),
    [storedAssets],
  );

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

  const handleAssetClick = (asset: Asset) => {
    navigate(generatePath(AppRoute.AssetDetails, { id: asset.id }));
  };

  const handleAssetManageClick = (type: 'deposit' | 'withdrawal') => setAssetModal({ show: true, type });

  const handleAssetModalClose = () => setAssetModal({ ...assetModal, show: false });

  const dataQuery = useQuery({
    queryKey: ['coins'],
    queryFn: attachRequestCancellation(cancelToken => fetchCoinMarkets(cancelToken, 'usd')),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
  });

  const updateAssets = useCallback(
    (data: Coin[]) => {
      setStoredAssets(prevAssets =>
        prevAssets.map(asset => {
          const updatedCoin = data.find(coin => coin.id === asset.id);
          return updatedCoin ? { ...asset, current_price: updatedCoin.current_price } : asset;
        }),
      );
    },
    [setStoredAssets],
  );

  useEffect(() => {
    if (dataQuery.status === 'success' && dataQuery.data) {
      updateAssets(dataQuery.data);
    }

    if (dataQuery.status === 'error') {
      toast.error('Failed to get coin prices.', {
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
    }
  }, [dataQuery.status, dataQuery.data, updateAssets]);

  useEffect(() => {
    setFilteredAssets(storedAssets);
  }, [storedAssets]);

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
