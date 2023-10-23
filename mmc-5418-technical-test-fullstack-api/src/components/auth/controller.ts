import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./services";
import environmentVars from "../../config/env";
import { dataSource } from "../../database/data-source";
import { User } from "../user/entity";
import { UtilsController } from "../utils/controller";

export class AuthController {
  /**
   * @description Gets the User view.
   * @param {Req} req
   * @param {Res} res
   */
  static login = async (req: Request, res: Response, next: NextFunction) => {

    if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string')
      return res.status(400).send("Entrada incorrecta")

    const query = dataSource.getRepository(User).createQueryBuilder("user").leftJoinAndSelect("user.role", "role").where("user.username = :username", { username: req.body.username })
      .addSelect("user.password").getOne().then(async (user) => {

        if (!user) 
          return res.status(401).json({ success: false, msg: "could not find user" });
        

        const isValid = await UtilsController.validPassword(req.body.password, user.password);

        if (isValid) {

          const tokenObject = UtilsController.issueJWT(user);

          delete user.password

          const isAdmin = user.role.type === 'admin' ? true : false
          delete user.role

          res.status(200).json({ success: true, token: tokenObject.token, user, isAdmin, expiresIn: tokenObject.expires });

        } else {

          res.status(401).json({ success: false, msg: "Invalid credentials" });
        }

      })
      .catch((err) => {
        res.status(400).send("Error al hacer login").end();
      });
  };
}
