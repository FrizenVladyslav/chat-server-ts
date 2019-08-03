import passport from 'passport'
import * as passportLocal from 'passport-local'
import { User } from '../models'

const LocalStrategy = passportLocal.Strategy

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              message: 'email or password is invalid',
            })
          }

          return done(null, user)
        })
        .catch(done)
    }
  )
)
