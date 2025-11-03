const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.APP_BASE_URL}/auth/google/callback`,
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, params, profile, done) {
    const user = {
      profile,
      accessToken,
      refreshToken,
      idToken: params.id_token
    };
    return done(null, user);
  }
));

module.exports = passport;