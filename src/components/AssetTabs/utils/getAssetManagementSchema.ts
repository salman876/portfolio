import * as yup from 'yup';

import { Coin } from 'types/coin';

export const getAssetManagementSchema = (coins: Coin[]) => ({
  coin: yup.mixed<Coin>().oneOf(coins).required('Required'),
  holdAmount: yup.number().default(0),
  amount: yup
    .number()
    .typeError('Amount is required and must be a number')
    .required('Amount is required and must be a number')
    .min(0.0001, 'Amount must be greater than 0.0001')
    .default(0)
    .test({
      name: 'lessThanOrEqualToHoldAmount',
      exclusive: false,
      message: 'Amount must be less than or equal to hodl amount',
      test: function (value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const holdAmount = this.parent.holdAmount as number;
        return !holdAmount || !value || value <= holdAmount;
      },
    }),
});
