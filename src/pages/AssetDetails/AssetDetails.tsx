import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { attachRequestCancellation } from 'utils/attachRequestCancellation';
import { parseHtml } from 'utils/parseHtml';

import { fetchCoinDetails, fetchCoinMarkets } from 'api/coingecko';

import { useAssetsContext } from 'contexts/assets';

import { AssetTabs } from 'components/AssetTabs';
import { Error } from 'components/Error';

import { AssetWrapper, BackButton, BackIcon, Description, Header, MainWrapper, Title } from './AssetDetails.styles';
import { DescriptionSkeleton } from './Skeletons';

export const AssetDetails: FC = () => {
  const [storedAssets] = useAssetsContext();
  const navigate = useNavigate();

  const { id } = useParams();

  const coinsQuery = useQuery({
    queryKey: ['coins', id],
    queryFn: attachRequestCancellation(cancelToken => fetchCoinMarkets(cancelToken, 'usd')),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

  const coinDetailsQuery = useQuery({
    queryKey: ['coinsDetails', id],
    queryFn: attachRequestCancellation(cancelToken => fetchCoinDetails(cancelToken, id as string)),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    refetchInterval: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });

  if (!id) return <Error code={404} />;

  const asset = storedAssets.find(storedAsset => storedAsset.id === id);
  if (!asset) return <Error code={404} />;

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <BackIcon src="/assets/icons/arrow-back.svg" alt="back" height={24} width={24} />
        </BackButton>
        <Title>{asset.name}</Title>
      </Header>
      <MainWrapper>
        <div>
          <h1>About</h1>
          {coinDetailsQuery.isPending && <DescriptionSkeleton />}
          {coinDetailsQuery.data && <Description>{parseHtml(coinDetailsQuery.data.description)}</Description>}
        </div>
        <AssetWrapper>{coinsQuery.data && <AssetTabs coins={coinsQuery.data} currentCoinId={asset.id} />}</AssetWrapper>
      </MainWrapper>
    </>
  );
};
