import React, { useMemo } from 'react';

import { Asset } from 'types/asset';
import { CoinDetails } from 'types/coin';

import { formatUSD } from 'utils/formatUSD';

import {
  Card,
  CoinName,
  CoinSymbol,
  FlexWrapper,
  Icon,
  InnerFlexWrapper,
  Price,
  PriceChange,
  PriceContainer,
  Wrapper,
} from './AssetCards.styles';

type AssetCardsProps = {
  coinDetails: CoinDetails;
  asset: Asset;
  days: number;
};

export const AssetCards: React.FC<AssetCardsProps> = ({ coinDetails, asset, days }) => {
  const priceChangeByDay = useMemo(() => {
    switch (days) {
      case 7:
        return coinDetails.price_change_percentage_7d;
      case 30:
        return coinDetails.price_change_percentage_30d;
      default:
        return coinDetails.price_change_percentage_24h;
    }
  }, [
    coinDetails.price_change_percentage_24h,
    coinDetails.price_change_percentage_30d,
    coinDetails.price_change_percentage_7d,
    days,
  ]);

  return (
    <Wrapper>
      <Card>
        <FlexWrapper>
          <InnerFlexWrapper>
            <Icon src={coinDetails.image} alt={coinDetails.name} />
            <div>
              <CoinName>{coinDetails.name}</CoinName>
              <CoinSymbol>{coinDetails.symbol.toUpperCase()}</CoinSymbol>
            </div>
          </InnerFlexWrapper>
          <PriceContainer>
            <Price>{formatUSD(asset.current_price)}</Price>
            <PriceChange isPositive={priceChangeByDay >= 0}>
              {priceChangeByDay >= 0 ? '+' : '-'}
              {Math.abs(priceChangeByDay).toFixed(2)}% ({days} day{days > 1 ? 's' : ''})
            </PriceChange>
          </PriceContainer>
        </FlexWrapper>
      </Card>
      <Card>
        <FlexWrapper>
          <p>Hodl Amount</p>
          <Price>{`${asset.amount} ${asset.symbol.toUpperCase()}`}</Price>
        </FlexWrapper>
      </Card>
      <Card>
        <FlexWrapper>
          <p>Holding Value</p>
          <Price>{formatUSD(asset.current_price * asset.amount)}</Price>
        </FlexWrapper>
      </Card>
    </Wrapper>
  );
};
