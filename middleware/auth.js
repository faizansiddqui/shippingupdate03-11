// backend/middleware/auth.js
const supabase = require('../config/supabase');

const authMiddleware = async (req, res, next) => {
  try {
    // token can come from cookie or Authorization header
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : null;

    const accessToken = (req.cookies && req.cookies.sb_access_token) || tokenFromHeader;
    if (!accessToken) {
      return res.status(401).json({ status: false, message: 'Unauthorized: no token' });
    }

    const { data, error } = await supabase.auth.getUser(accessToken);
    if (error || !data?.user) {
      console.error('Supabase getUser error:', error);
      return res.status(401).json({ status: false, message: 'Invalid or expired token' });
    }

    // attach user to request for downstream handlers
    req.user = data.user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ status: false, message: 'Auth middleware error' });
  }
};

module.exports = authMiddleware;
