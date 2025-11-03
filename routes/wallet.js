// backend/routes/wallet.js (no major changes needed; already user-specific via authMiddleware and userId from token; minor fixes for consistency)
const Razorpay = require("razorpay");
const crypto = require("crypto");
const supabase = require("../config/supabase");
const { router } = require('../app');
const authMiddleware = require("../middleware/auth");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

function isValidUUID(u) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(u);
}

// ✅ Create Razorpay Order
router.post("/create-razor", authMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `wallet_${Date.now()}`,
    });

    res.json(order);
  } catch (error) {
    console.error("create-order error:", error);
    res.status(500).json({ error: "Order creation failed", details: error.message });
  }
});

// Verigy payment payment true or fack 
router.post("/verify-payment", authMiddleware, async (req, res) => {
  try {
    const { order_id, payment_id, signature, amount } = req.body;

    if (!order_id || !payment_id || !signature || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Extract token (header preferred, fallback to cookie)
    const authHeader = req.headers.authorization || "";
    let token = null;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies.sb_access_token) {
      token = req.cookies.sb_access_token;
    }

    if (!token) return res.status(401).json({ error: "No auth token provided" });

    // Verify token and get user via Supabase
    let userData, userErr;
    try {
      const result = await supabase.auth.getUser(token);
      userData = result.data;
      userErr = result.error;
    } catch (e) {
      console.error("Token verification network/error:", e);
      return res.status(500).json({ error: "Token verification failed (network)" });
    }

    if (userErr || !userData?.user) {
      console.error("Token verification failed:", userErr);
      return res.status(401).json({ error: "Invalid or expired token" });
    }

    const userId = userData.user.id;
    if (!isValidUUID(userId)) {
      return res.status(400).json({ error: "Invalid user id extracted from token" });
    }

    // Verify Razorpay signature
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${order_id}|${payment_id}`)
      .digest("hex");

    if (expected !== signature) {
      console.warn("Invalid signature", { expected, signature });
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    // Fetch payment to double-check
    const payment = await razorpay.payments.fetch(payment_id);
    if (!payment) {
      return res.status(400).json({ success: false, message: "Payment not found on Razorpay" });
    }
    if (payment.order_id !== order_id) {
      return res.status(400).json({ success: false, message: "order_id mismatch" });
    }
    if (payment.status !== "captured") {
      return res.status(400).json({ success: false, message: `Payment not captured: ${payment.status}` });
    }

    const amountPaise = Math.round(Number(amount) * 100);
    if (Number(payment.amount) !== amountPaise) {
      return res.status(400).json({ success: false, message: "Amount mismatch" });
    }

    // Idempotency check
    const { data: existing, error: selErr } = await supabase
      .from("wallet_transactions")
      .select("id")
      .eq("payment_id", payment_id)
      .limit(1);

    if (selErr) {
      console.error("Supabase lookup error:", selErr);
      return res.status(500).json({ success: false, message: "Server error" });
    }
    if (existing && existing.length > 0) {
      const { data: walletRows } = await supabase
        .from("wallets")
        .select("wallet_balance")
        .eq("user_id", userId)
        .limit(1);

      const wallet_balance = walletRows && walletRows[0] ? walletRows[0].wallet_balance : null;
      return res.json({ success: true, message: "Payment already processed", wallet_balance });
    }

    // Add to wallet (user-specific)
    const { data, error } = await supabase.rpc("add_to_wallet", {
      p_user: userId,
      p_amount: Number(amount),
      p_description: "Wallet recharge via Razorpay",
      p_payment_id: payment_id,
    });

    if (error) {
      console.error("Supabase add_to_wallet error:", error);
      return res.status(500).json({ success: false, message: "Failed to update wallet" });
    }

    const newBalance = data && data[0] ? data[0].wallet_balance : null;
    return res.json({ success: true, message: "Payment verified and wallet updated", wallet_balance: newBalance });
  } catch (err) {
    console.error("verify-payment error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET /wallet/balance (user-specific) - FIXED: Use .maybeSingle() to handle missing wallet rows
router.get("/wallet/balance", authMiddleware, async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    let token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies?.sb_access_token;
    if (!token) return res.status(401).json({ error: "No auth token" });

    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) return res.status(401).json({ error: "Invalid token" });

    const userId = userData.user.id;
    const { data, error } = await supabase
      .from("wallets")
      .select("wallet_balance")
      .eq("user_id", userId)
      .maybeSingle();  // ✅ Changed to .maybeSingle() to return null (not error) if no row

    if (error) {
      console.error("Supabase query error:", error);  // ✅ Added specific logging
      return res.status(500).json({ error: "Failed to fetch balance" });
    }

    // console.log(`WALLET b:${JSON.stringify(data.wallet_balance)}`);
    

    const wallet_balance = data ? data.wallet_balance : 0;  // ✅ Default to 0 if no wallet row
    return res.status(200).json({ wallet_balance });
  } catch (err) {
    console.error("wallet balance error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /wallet/history (user-specific)
router.get("/wallet/history", authMiddleware, async (req, res) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : (req.cookies && req.cookies.sb_access_token);

    if (!token) return res.status(401).json({ error: "No token" });

    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) return res.status(401).json({ error: "Invalid token" });

    const userId = userData.user.id;

    const { data, error } = await supabase
      .from("wallet_transactions")
      .select("id, amount, description, payment_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: "Failed to fetch history" });
    // console.log(data);
    
    return res.json({ transactions: data });
  } catch (err) {
    console.error("wallet history error", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /wallet/spend
router.post("/wallet/spend", authMiddleware, async (req, res) => {
  try {
    const { amount, description } = req.body;
    if (!amount || Number(amount) <= 0) return res.status(400).json({ error: "Invalid amount" });

    // get userId from token (you already use this pattern)
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : req.cookies?.sb_access_token;
    if (!token) return res.status(401).json({ error: "No auth token" });

    const { data: userData, error: userErr } = await supabase.auth.getUser(token);
    if (userErr || !userData?.user) return res.status(401).json({ error: "Invalid token" });

    const userId = userData.user.id;

    // call the RPC
    const { data, error } = await supabase.rpc("subtract_from_wallet", {
      p_user: userId,
      p_amount: Number(amount),
      p_description: description || "Wallet spend"
    });

    if (error) {
      console.error("subtract_from_wallet rpc error:", error);
      // If it's insufficient funds, return 400 with a friendly message
      const msg = error.message || JSON.stringify(error);
      if (msg.includes("insufficient_funds")) {
        return res.status(400).json({ success: false, message: error.message});
      }
      return res.status(500).json({ success: false, message: "Failed to deduct from wallet", error: msg });
    }

    // Normalize RPC result (it may return [{wallet_balance: X}])
    let newBalance = null;
    if (Array.isArray(data)) newBalance = data[0] && (data[0].wallet_balance ?? data[0]);
    else if (data && typeof data === "object") newBalance = data.wallet_balance ?? null;
    else newBalance = data;

    return res.json({ success: true, wallet_balance: Number(newBalance ?? 0) });
  } catch (err) {
    console.error("wallet spend error", err);
    if (String(err).includes("insufficient_funds")) {
      return res.status(400).json({ success: false, message: "Insufficient funds" });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;