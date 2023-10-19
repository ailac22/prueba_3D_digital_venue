import { NextFunction, Request, Response } from "express";
import * as argon2 from "argon2";
import { dataSource } from "../../database/data-source";
import { User } from "../user/entity";
import jsonwebtoken from "jsonwebtoken"
const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', '/config/jwt/id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

export class UtilsController {
  /**
   * @description Gets the User view.
   * @param {Req} req
   * @param {Res} res
   */
  static passwordUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    //Aqui va el password reset
  };


  static issueJWT(user: User) {
    const id = user.id;

    const expiresIn = '1d';

    const payload = {
      sub: id,
      iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }

  static genPassword(password) {

    return argon2.hash(password)
  }


  static validatePassword = () => {

    function validPassword(password, hash) {
      // Este algoritmo parece no usar salt. Quizás esta incluida en el hash en si
      argon2.verify(hash, password)
    }
  }

}
