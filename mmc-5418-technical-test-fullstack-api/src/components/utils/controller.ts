import { NextFunction, Request, Response } from "express";
import { dataSource } from "../../database/data-source";
import * as argon2 from "argon2";
import { User } from "../user/entity";
import jsonwebtoken from "jsonwebtoken"
const fs = require('fs');
const path = require('path');

console.log(__dirname);

const pathToKey = path.join(__dirname, '../../config/jwt/id_rsa_priv.pem');
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

    console.log("req.params.id ", req.params.id);


    //Aqui va el password reset

    let hash = await this.genPassword(req.body.password)

    dataSource.createQueryBuilder().update(User).set({ password: hash })
      .where("id = :id", { id: parseInt(req.params.id) }).execute().then(() => res.send("ok"))
    //TODO: Hacer respuesta bien

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

  static async genPassword(password: string) {

    try {
      console.log("amo a hashea");
      return argon2.hash(password, { raw: false });
    } catch (err) {
      console.log("error!")
      throw new Error("Error al hashear el password")
    }

  }

  static validPassword = (password, hash) => {

    // Este algoritmo parece no necesita salt como param.
    return argon2.verify(hash, password)
  }

}
