import { NextFunction, Request, Response } from "express";
import { dataSource } from "../../database/data-source";
import { User } from "./entity";
import { Transaction } from "../transaction/entity";
import { UsersIndexResponse } from "./types";

export class UserController {
  /**
   * @description users list.
   * @method GET
   * @param {Req} req
   * @param {Res} res
   */
  static index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // List all users
      const query = dataSource.createQueryBuilder().from(User, "user");
      query.select([
        "user.id as id",
        "user.username as username",
        "user.created as created",
      ]);
      // Default response
      const response: UsersIndexResponse = { data: null };

      console.log("response")

      if (req.query.related && req.query.related === "transactions") {
        // Your code here
      }
      // Execute default query
      response.data = await query.getRawMany();

      // Response
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  /**
   * @description transaction user.
   * @method POST
   * @param {Req} req
   * @param {Res} res
   */
  static transaction = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Your code here


      res.status(200).json();
    } catch (error) {
      next(error);
    }
  };

  /**
   * @description Gets User entity.
   * @param {Req} req
   * @param {Res} res
   */
  static view = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Your code here
      res.status(200).json();
    } catch (error) {
      next(error);
    }
  };
}
