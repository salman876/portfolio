import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AppRoute } from 'enums/routes';

import { attachRequestCancellation } from 'utils/attachRequestCancellation';
import { parseHtml } from 'utils/parseHtml';

import { fetchCoinChartHistory, fetchCoinDetails, fetchCoinMarkets } from 'api/coingecko';

import { useAssetsContext } from 'contexts/assets';

import { AssetCards } from 'components/AssetCards';
import { AssetTabs } from 'components/AssetTabs';
import { Chart } from 'components/Chart';
import { Error } from 'components/Error';

import { AssetWrapper, BackButton, BackIcon, Description, Header, MainWrapper, Title } from './AssetDetails.styles';
import { DescriptionSkeleton, StatsSkeleton } from './Skeletons';

export const AssetDetails: FC = () => {
  const [storedAssets] = useAssetsContext();
  const navigate = useNavigate();

  const [selectedDayRange, setSelectedDayRange] = useState<number>(1);

  const { id } = useParams();

  const coinsQuery = useQuery({
    queryKey: ['coins', id],
    queryFn: attachRequestCancellation(cancelToken => fetchCoinMarkets(cancelToken, 'usd')),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: 60 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: Boolean(id),
  });

  const coinDetailsQuery = useQuery({
    queryKey: ['coinDetails', id],
    queryFn: attachRequestCancellation(cancelToken => fetchCoinDetails(cancelToken, id as string)),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    refetchInterval: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: Boolean(id),
  });

  const coinChartQuery = useQuery({
    queryKey: ['coinChartHistory', id, selectedDayRange],
    queryFn: attachRequestCancellation(cancelToken =>
      fetchCoinChartHistory(cancelToken, id as string, 'usd', 2, selectedDayRange),
    ),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: 24 * 60 * 60 * 1000, // 1 day
    refetchInterval: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: Boolean(id),
  });

  if (!id) return <Error code={404} />;

  const asset = storedAssets.find(storedAsset => storedAsset.id === id);
  if (!asset) {
    navigate(AppRoute.Portfolio, { replace: true });
    return null;
  }

  const handleDayRangeChange = (dayRange: number) => setSelectedDayRange(dayRange);

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
          {coinChartQuery.data && coinDetailsQuery.data && (
            <Chart
              data={coinChartQuery.data?.prices}
              basePrice={coinDetailsQuery.data.current_price}
              currentDayRange={selectedDayRange}
              onDayRangeChange={handleDayRangeChange}
            />
          )}
          {coinDetailsQuery.data && (
            <AssetCards coinDetails={coinDetailsQuery.data} asset={asset} days={selectedDayRange} />
          )}
          {coinDetailsQuery.isPending && <StatsSkeleton />}
          <h2>About</h2>
          {coinDetailsQuery.isPending && <DescriptionSkeleton />}
          {coinDetailsQuery.data && (
            <Description>
              {coinDetailsQuery.data.description
                ? parseHtml(coinDetailsQuery.data.description)
                : 'No description is present at the moment.'}
            </Description>
          )}
        </div>
        <div>
          <AssetWrapper>
            {coinsQuery.data && <AssetTabs coins={coinsQuery.data} currentCoinId={asset.id} />}
          </AssetWrapper>
        </div>
      </MainWrapper>
    </>
  );
};
