import * as yup from 'yup';

import { Coin } from 'types/coin';

export const getAssetManagementSchema = (coins: Coin[]) => ({
  coin: yup.mixed<Coin>().oneOf(coins).required('Required'),
  amount: yup.number().min(0.0001, 'Amount must be greater than 0.0001').default(0).required('Required'),
});
