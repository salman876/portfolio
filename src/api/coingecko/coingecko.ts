import axios, { CancelToken } from 'axios';

import { Coin, CoinChartHistory, CoinDetails } from 'types/coin';

import { CoinChartHistoryData, CoinData, CoinDetailsData } from './types';

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

export const fetchCoinDetails = async (cancelToken: CancelToken, coinId: string): Promise<CoinDetails> => {
  try {
    const response = await coingeckoApi.get<CoinDetailsData>(`/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
      cancelToken,
    });

    return {
      id: response.data.id,
      symbol: response.data.symbol,
      name: response.data.name,
      description: response.data.description.en,
      image: response.data.image.large,
      current_price: response.data.market_data.current_price.usd,
      market_cap: response.data.market_data.market_cap.usd,
      market_cap_rank: response.data.market_data.market_cap_rank,
      fully_diluted_valuation: response.data.market_data.fully_diluted_valuation.usd,
      total_supply: response.data.market_data.total_supply,
      max_supply: response.data.market_data.max_supply?.toString() || 'infinite',
      circulating_supply: response.data.market_data.circulating_supply,
      price_change_percentage_24h: response.data.market_data.price_change_percentage_24h,
      price_change_percentage_7d: response.data.market_data.price_change_percentage_7d,
      price_change_percentage_30d: response.data.market_data.price_change_percentage_30d,
      price_change_percentage_1y: response.data.market_data.price_change_percentage_1y,
    };
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw error;
  }
};

export const fetchCoinChartHistory = async (
  cancelToken: CancelToken,
  coinId: string,
  currency: string = 'usd',
  precision: number = 2,
  days: number = 1,
): Promise<CoinChartHistory> => {
  try {
    const response = await coingeckoApi.get<CoinChartHistoryData>(`/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
        precision: precision,
      },
      cancelToken,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching coin chart history:', error);
    throw error;
  }
};
