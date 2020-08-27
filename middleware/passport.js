const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')

const options = {
 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
 secretOrKey: process.env.JWT
}


module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id')
        // add user to req field for all reqs. it means that you can pull it like (req.user) from any req
        user ? done(null, user) : done(null, false)
        
      } catch (e) {
        console.log(e)
        }
    })
  )
}