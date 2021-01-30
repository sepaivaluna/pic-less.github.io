const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    function (accessToken, refreshToken, profile, cb) {
      Student.findOne({ googleId: profile.id }, function (err, student) {
        if (err) return cb(err);
        if (student) {
          return cb(null, student);
        } else {
          // we have a new student via OAuth!
          const newStudent = new Student({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
          });
          newStudent.save(function (err) {
            if (err) return cb(err);
            return cb(null, newStudent);
          });
        }
      });
    }
  )
);
