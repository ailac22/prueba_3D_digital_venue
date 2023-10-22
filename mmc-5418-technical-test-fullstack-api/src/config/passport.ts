let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt;
// import * as passportJwt from 'passport-jwt'
import fs from 'fs'
import path from 'path'
import { dataSource } from "../database/data-source";
import { User } from '../components/user/entity';
import { PassportStatic } from 'passport';
import environmentVars from './env';
// const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: environmentVars.JWT_PASSPHRASE,
  algorithms: ['HS256'],
  ignoreExpiration: false
};

function configurePassportStrategy(passport: PassportStatic){
  // The JWT payload is passed into the verify callback
  passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {

    // We will assign the `sub` property on the JWT to the database ID of user
    if (!jwt_payload.sub)
      return done(null, false)


    dataSource.getRepository(User).findOne({
      where: { id: jwt_payload.sub }, relations: { role: true, }
    }).then(async (user) => {

    // const findOne = dataSource.getRepository(User).createQueryBuilder("user")
    //   .where("user.id = :id", { id: jwt_payload.sub }).getOne().then((user: User) => {

        console.log("usuario: ", user)

        // This flow look familiar?  It is the same as when we implemented
        // the `passport-local` strategy
        if (user) {
            return done(null, user);
        } else {

            return done(null, false);
        }

    }).catch((err) => {
      return done(err, false);
    })



}));
}

export default configurePassportStrategy

