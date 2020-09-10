const express = require('express');
const mongoose = require("mongoose");
require('./db/mongoose');
const logger = require("morgan");
const cors = require('cors');
const helmet = require("helmet");
const compression = require("compression");
const mongoSessionStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");

require('./models/User');
require('./models/Feedback');
const routes = require('./routes');
require('./passport');

const dev = process.env.NODE_ENV !== "production";

const port = process.env.PORT || 4000;
const app = express();

if (!dev) {
  app.use(helmet());
  app.use(compression());
}

app.use(express.json());

const MongoStore = mongoSessionStore(session);
const sessionConfig = {
  name: "next-connect.sid",
  // secret used for using signed cookies w/ the session
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 14 * 24 * 60 * 60 // save session for 14 days
  }),
  // forces the session to be saved back to the store
  resave: false,
  // don't save unmodified sessions
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 14 // expires in 14 days
  }
};
if (!dev) {
  sessionConfig.cookie.secure = true; // serve secure cookies in production environment
  // app.set("trust proxy", 1); // trust first proxy
}
app.use(session(sessionConfig));

/* Add passport middleware to set passport up */
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  /* custom middleware to put our user data (from passport) on the req.user so we can access it as such anywhere in our app */
  res.locals.user = req.user || null;
  next();
});

app.use(express.json());
app.use(logger("combined"));
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});