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


    console.log("req.body.username: ", req.body.username);
    const query = dataSource.createQueryBuilder().from(User, "user").where("username = :username", { username: req.body.username })
      .getOne().then((user) => {

        console.log("user: ", user);
        
        if (!user) {
          console.log("no user");
          return res.status(401).json({ success: false, msg: "could not find user" });
        }

        // Function defined at bottom of app.js
        const isValid = UtilsController.validPassword(req.body.password, user.password);

        if (isValid) {

          const tokenObject = UtilsController.issueJWT(user);

          console.log("Token: ", tokenObject);
          

          res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });

        } else {

          res.status(401).json({ success: false, msg: "Invalid credentials" });

        }

      })
      .catch((err) => {
        res.status(400).json(err);
        // next(err);
      });
  };
}
