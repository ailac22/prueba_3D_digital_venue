let JwtStrategy = require('passport-jwt').Strategy
let ExtractJwt = require('passport-jwt').ExtractJwt;
// import * as passportJwt from 'passport-jwt'
import fs from 'fs'
import path from 'path'
import { dataSource } from "../database/data-source";
import { User } from '../components/user/entity';
import { PassportStatic } from 'passport';
import environmentVars from './env';
import { authStrategy } from '../components/auth/middleware';
// const pathToKey = path.join(__dirname, '..', 'id_rsa_pub.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: environmentVars.JWT_PASSPHRASE,
  algorithms: ['HS256'],
  ignoreExpiration: false
};

function configurePassportStrategy(passport: PassportStatic){
  passport.use(new JwtStrategy(jwtOptions, authStrategy ));
}

export default configurePassportStrategy

