import { Strategy, ExtractJwt, JwtStrategy } from 'passport-jwt'
import fs from 'fs'
import path from 'path'
import { dataSource } from "../database/data-source";
import { User } from '../components/user/entity';

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

    const findOne = dataSource.getRepository(User).createQueryBuilder("user")
      .where("user.id = :id", { id: jwt_payload.sub }).getOne().then((res: User) => {

        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        // if (err) {
        //     return done(err, false);
        // }
        // if (user) {
        //     return done(null, user);
        // } else {
        //     return done(null, false);
        // }

    })



}));
}

