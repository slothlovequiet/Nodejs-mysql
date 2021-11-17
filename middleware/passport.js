//const config = require('./../config')

const db = require("./../settings/db");
const JwtStrategy = require("passport-jwt").Strategy,
   ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = {};
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "jwt-key";
module.exports = (passport) => {
   passport.use(
      new JwtStrategy(opts, function (payload, done) {
         try {
            db.query(
               "SELECT `id`, `email` FROM `users` WHERE `id` = '" +
                  payload.userid +
                  "'",
               (error, rows, fields) => {
                  if (error) {
                     console.log(error);
                  } else {
                     const user = rows;
                     if (user) {
                        done(null, user);
                     } else {
                        done(null, false);
                     }
                  }
               }
            );
         } catch (e) {
            console.log(e);
         }
      })
   );
};
