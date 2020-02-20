const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const key = require("./keys");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");
const userModel = require("../model/userModel");

//JWT Strategy
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretOrKey;

module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);

//GOOGLE Strategy

module.exports = passport.use(
  new GoogleStrategy(
    {
      clientID: key.google.ID_client,
      clientSecret: key.google.Client_Secret,
      callbackURL: "http://localhost:5000/users/google/redirect"
    },
    async function(accessToken, refreshToken, profile, done) {
      let payload = {};
      const checkId = "Google" + profile.id;
      let user = await userModel.findOne({ externalid: checkId });
      if (user) {
        console.log("CHECKED", user);
        // User exists
        payload = {
          _id: user._id,
          username: user.username,
          picture: user.picture
        };
      } else {
        console.log("NOT EXISTS", profile);
        const newUser = new userModel({
          username: profile.name.givenName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          pw: null,
          externalid: checkId
        });
        let nuovoUtente = await newUser.save();
        console.log("GOOGLE AGGIUNTO", nuovoUtente);
        payload = {
          _id: nuovoUtente._id,
          username: nuovoUtente.username,
          picture: nuovoUtente.picture
        };
      }
      const options = { expiresIn: 604800 };
      const token = jwt.sign(payload, key.secretOrKey, options);
      console.log("TOKEN", token)
      done(null, token);
    }
  )
);