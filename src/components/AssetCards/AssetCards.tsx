import React from 'react';

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
};

export const AssetCards: React.FC<AssetCardsProps> = ({ coinDetails, asset }) => {
  const isPositive = coinDetails.price_change_percentage_24h >= 0;

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
            <PriceChange isPositive={isPositive}>{coinDetails.price_change_percentage_24h}%</PriceChange>
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
