import { NextFunction, Request, Response } from "express";
import * as argon2 from "argon2";
import { dataSource } from "../../database/data-source";
import { User } from "../user/entity";

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
  ) => {};
}
