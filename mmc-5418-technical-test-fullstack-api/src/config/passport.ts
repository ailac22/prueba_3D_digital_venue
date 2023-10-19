import {Strategy, ExtractJwt, JwtStrategy } from 'passport-jwt'
import fs from 'fs'
import path from 'path'

const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
};

module.exports = (passport) => {
    // The JWT payload is passed into the verify callback
    passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {

        console.log(jwt_payload);
        
        // We will assign the `sub` property on the JWT to the database ID of user
        User.findOne({_id: jwt_payload.sub}, function(err, user) {
            
            // This flow look familiar?  It is the same as when we implemented
            // the `passport-local` strategy
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
            
        });
        
    }));
}

