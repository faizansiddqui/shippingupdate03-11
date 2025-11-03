const express = require('express');

const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

module.exports = { app, router };
