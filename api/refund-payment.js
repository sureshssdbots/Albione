const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: 'rzp_live_TMOyQgfsif3rQO',
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { paymentId, amount } = req.body;
    if (!paymentId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid paymentId or amount' });
    }

    const refund = await instance.payments.refund(paymentId, {
      amount: Math.round(amount * 100), // paise
    });

    res.status(200).json({ success: true, refundId: refund.id, status: refund.status });
  } catch (err) {
    console.error('processRefund error', err);
    res.status(500).json({ success: false, error: (err && err.error && err.error.description) || 'Refund failed' });
  }
};
