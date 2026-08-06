const Razorpay = require('razorpay');

// Key Secret is read from an environment variable set in the Vercel
// dashboard — it is NEVER written in this file or sent to the browser.
const instance = new Razorpay({
  key_id: 'rzp_live_TMOyQgfsif3rQO',
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = async (req, res) => {
  // Allow the frontend (GitHub Pages) to call this endpoint
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
    const { amount, receipt } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const order = await instance.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: receipt || `rcpt_${Date.now()}`,
    });

    res.status(200).json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error('createRazorpayOrder error', err);
    res.status(500).json({ error: 'Order creation failed' });
  }
};
