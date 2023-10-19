import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./services";
import environmentVars from "../../config/env";
import { dataSource } from "../../database/data-source";
import { User } from "../user/entity";

export class AuthController {
  /**
   * @description Gets the User view.
   * @param {Req} req
   * @param {Res} res
   */
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const query = dataSource.createQueryBuilder().from(User, "user").where("username = :username", { username: req.body.username })
        .getOne().then((user) => {

          if (!user) {
            return res.status(401).json({ success: false, msg: "could not find user" });
          }

          // Function defined at bottom of app.js
          const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

          if (isValid) {

            const tokenObject = utils.issueJWT(user);

            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

          } else {

            res.status(401).json({ success: false, msg: "you entered the wrong password" });

          }

        })
        .catch((err) => {
          next(err);
        });
      // Your code here: Generate JWT
      res.status(200).json();
    } catch (error) {
      console.log("catch");
      res.status(400).json(error);
    }
  };
}
