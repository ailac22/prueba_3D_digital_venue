import { NextFunction, Request, Response } from "express";
import { dataSource } from "../../database/data-source";
import { User } from "./entity";
import { Transaction } from "../transaction/entity";
import { UsersIndexResponse } from "./types";
import { Transaction as TransactionEntity } from "./../transaction/entity"

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

      if (typeof req.body.amount !== 'number' || typeof req.body.detail !== 'string') {
        return res.status(400).send("Entrada incorrecta")
      }

      const repo = dataSource.getRepository(TransactionEntity);
      const newTransaction = new TransactionEntity()

      newTransaction.amount = req.body.amount
      newTransaction.detail = req.body.detail
      newTransaction.user = req.user

      const savedEntity = await repo.save(newTransaction)

      console.log("saved Entity vale: ", savedEntity);
      
      return res.send(savedEntity)

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
