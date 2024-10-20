import React, { FC, useEffect, useRef, useState } from 'react';

import { Coin } from 'types/coin';

import { formatUSD } from 'utils/formatUSD';

import { TextField } from 'components/ui/TextField';

import {
  Chevron,
  CoinChange,
  CoinIcon,
  CoinInfo,
  CoinName,
  CoinSymbol,
  CoinValue,
  DropdownItem,
  DropdownList,
  NotFoundText,
  Wrapper,
} from './CoinSelect.styles';

export type CoinSelectProps = {
  id: string;
  name: string;
  coins: Coin[];
  label?: string;
  placeholder?: string;
  initialCoin?: Coin;
  helperText?: string;
  notFoundText?: string;
  isError?: boolean;
  onSelect: (coin: Coin) => void;
  'data-testid'?: string;
};

export const CoinSelect: FC<CoinSelectProps> = ({
  id,
  name,
  coins,
  label,
  placeholder,
  initialCoin,
  helperText,
  notFoundText,
  isError,
  onSelect,
  'data-testid': testId,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Coin | undefined>(initialCoin);
  const [searchTerm, setSearchTerm] = useState(selectedCoin?.name || '');

  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredCoins = coins.filter(
    coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleCoinSelect = (coin: Coin) => {
    setSelectedCoin(coin);
    setSearchTerm(coin.name);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedCoin) onSelect(selectedCoin);
  }, [onSelect, selectedCoin]);

  return (
    <Wrapper ref={wrapperRef}>
      <TextField
        id={id}
        name={name}
        autoComplete="coins"
        label={label}
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        helperText={helperText}
        isError={isError}
        postfix={
          <Chevron
            src={isOpen ? '/assets/icons/chevron-up.svg' : '/assets/icons/chevron-down.svg'}
            alt={isOpen ? 'Close dropdown' : 'Open dropdown'}
            onClick={() => setIsOpen(!isOpen)}
          />
        }
        data-testid={`${testId}-coin-select`}
      />
      {isOpen && (
        <DropdownList>
          {!filteredCoins.length && notFoundText && <NotFoundText>{notFoundText}</NotFoundText>}
          {filteredCoins.map(coin => (
            <DropdownItem
              key={coin.id}
              onClick={() => handleCoinSelect(coin)}
              data-testid={`${testId}-${coin.id}-coin-select-option`}
            >
              <CoinInfo>
                <CoinIcon src={coin.image} alt={coin.name} />
                <div>
                  <CoinName>{coin.name}</CoinName>
                  <CoinSymbol>{coin.symbol.toUpperCase()}</CoinSymbol>
                </div>
              </CoinInfo>
              <div>
                <CoinValue>{formatUSD(coin.current_price)}</CoinValue>
                <CoinChange isPositive={coin.price_change_percentage_24h >= 0}>
                  {coin.price_change_percentage_24h >= 0 ? '+' : '-'}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </CoinChange>
              </div>
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Wrapper>
  );
};
