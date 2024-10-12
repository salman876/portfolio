import axios, { CancelToken } from 'axios';

import { Coin } from 'types/coin';

type CoinData = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  last_updated: string;
};

const coingeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'x-cg-demo-api-key': import.meta.env.API_KEY_COIN_GECKO as string,
  },
});

export const fetchCoinMarkets = async (cancelToken: CancelToken, currency: string = 'usd'): Promise<Coin[]> => {
  try {
    const response = await coingeckoApi.get<CoinData[]>('/coins/markets', {
      params: {
        vs_currency: currency,
      },
      cancelToken,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching coin markets:', error);
    throw error;
  }
};
