import { describe, expect, it } from 'vitest';
import * as yup from 'yup';

import { getAssetManagementSchema } from './getAssetManagementSchema';

const COINS = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'btc',
    image: 'xxx',
    current_price: 123,
    price_change_percentage_24h: 123,
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'ltc',
    image: 'xxx',
    current_price: 123,
    price_change_percentage_24h: 123,
  },
];

const schema = yup.object(getAssetManagementSchema()).required(),
  correctData = {
    coin: COINS[0],
    amount: 1,
  },
  correctDataWithHoldAmount = {
    coin: COINS[0],
    holdAmount: 2,
    amount: 1,
  };

describe(getAssetManagementSchema.name, () => {
  it('should pass when correct data is passed', () => {
    expect(schema.isValidSync(correctData)).toBe(true);
  });

  it('should fail when coin is empty', () => {
    expect(schema.isValidSync({ ...correctData, coin: undefined })).toBe(false);
  });

  it('should fail when amount is invalid', () => {
    expect(schema.isValidSync({ ...correctData, amount: 0.000001 })).toBe(false);
  });

  it('should fail when hold amount is greater than amount', () => {
    expect(schema.isValidSync({ ...correctDataWithHoldAmount, amount: 90 })).toBe(false);
  });
});
