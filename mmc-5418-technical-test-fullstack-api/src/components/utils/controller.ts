import { NextFunction, Request, Response } from "express";
import { dataSource } from "../../database/data-source";
import * as argon2 from "argon2";
import { User } from "../user/entity";
import jsonwebtoken from "jsonwebtoken"
import environmentVars from "../../config/env";
import { log } from "console";
const fs = require('fs');
const path = require('path');

console.log(__dirname);

// const pathToKey = path.join(__dirname, '../../config/jwt/id_rsa_priv.pem');
const PRIV_KEY = environmentVars.JWT_PASSPHRASE 

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

    if (!req.body.password)
      res.send(400)

    let hash = await this.genPassword(req.body.password)

    await dataSource.createQueryBuilder().update(User).set({ password: hash })
      .where("id = :id", { id: parseInt(req.params.id) }).execute()

    //TODO: Hacer respuesta bien

  };

  static issueJWT(user: User) {

    console.log("user en issue: ", user)

    const id = user.id;

    const expiresIn = environmentVars.JWT_EXPIRES_IN;

    const payload = {
      sub: id,
      iat: Math.floor(Date.now() / 1000),
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn });

    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }

  static async genPassword(password: string) {

    try {
      return argon2.hash(password);
    } catch (err) {
      throw new Error("Error al hashear el password")
    }

  }

  static validPassword = async (password, hash) => {

    // Este algoritmo parece no necesita salt como param.
    return argon2.verify(hash, password)
  }

}
