import { FC } from 'react';

import { Asset } from 'types/asset';

import { formatUSD } from 'utils/formatUSD';

import { Icon, NameWrapper, Property, Wrapper } from './AssetCard.styles';

type AssetCardProps = {
  asset: Asset;
  onClick: (asset: Asset) => void;
};

export const AssetCard: FC<AssetCardProps> = ({ asset, onClick }) => {
  return (
    <Wrapper onClick={() => onClick}>
      <NameWrapper>
        <Icon src={asset.icon} alt={asset.name} />
        <Property>{asset.name}</Property>
      </NameWrapper>
      <Property>{`${asset.amount} ${asset.symbol.toUpperCase()}`}</Property>
      <Property>{formatUSD(asset.price)}</Property>
      <Property>{formatUSD(asset.price * asset.amount)}</Property>
    </Wrapper>
  );
};
