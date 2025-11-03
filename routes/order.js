const supabase = require('../config/supabase')

const { router } = require('../app')

/**
 * Pay with Wallet (auto debit)
 * Body: { userId, amount, orderId (optional) }
 * amount in rupees
 */
router.post("/pay", async (req, res) => {
  try {
    const { userId, amount, orderId } = req.body;
    if (!userId || !amount) return res.status(400).json({ error: "Missing fields" });

    // call debit_wallet RPC
    const { data, error } = await supabase.rpc("debit_wallet", {
      p_user: userId,
      p_amount: amount,
      p_description: "Order payment",
      p_order_id: orderId || null,
    });

    if (error) {
      // If Postgres raised exception 'insufficient_balance' or 'user_not_found', it will appear here
      console.error("debit_wallet error:", error);
      if (error.message && error.message.includes("insufficient_balance")) {
        return res.status(400).json({ success: false, message: "Insufficient wallet balance" });
      }
      if (error.message && error.message.includes("user_not_found")) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      return res.status(500).json({ success: false, message: "Failed to debit wallet", details: error.message });
    }

    const newBalance = data && data[0] ? data[0].wallet_balance : null;
    return res.json({ success: true, wallet_balance: newBalance, message: "Payment successful from wallet" });
  } catch (error) {
    console.error("order pay error:", error);
    res.status(500).json({ error: "Order payment failed", details: error.message });
  }
});

module.exports = router;
