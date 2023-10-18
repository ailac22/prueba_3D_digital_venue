import { NextFunction, Request, Response } from "express";
import { AuthServices } from "./services";
import environmentVars from "../../config/env";

export class AuthController {
  /**
   * @description Gets the User view.
   * @param {Req} req
   * @param {Res} res
   */
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Your code here: Generate JWT
      res.status(200).json();
    } catch (error) {
      console.log("catch");
      res.status(400).json(error);
    }
  };
}
