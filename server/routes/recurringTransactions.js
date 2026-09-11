/**
 * @file Defines the route for retrieving recurring transactions (subscriptions/bills/income).
 */
const { asyncWrapper } = require('../middleware');
const express = require('express');
const plaid = require('../plaid');
const { retrieveItemsByUser } = require('../db/queries');

const router = express.Router();

router.get(
  '/:userId',
  asyncWrapper(async (req, res) => {
    const { userId } = req.params;
    const items = await retrieveItemsByUser(userId);

    let allInflow = [];
    let allOutflow = [];

    for (const item of items) {
      const response = await plaid.transactionsRecurringGet({
        access_token: item.plaid_access_token,
      });
      allInflow = allInflow.concat(response.data.inflow_streams);
      allOutflow = allOutflow.concat(response.data.outflow_streams);
    }

    res.json({ inflow_streams: allInflow, outflow_streams: allOutflow });
  })
);

module.exports = router;