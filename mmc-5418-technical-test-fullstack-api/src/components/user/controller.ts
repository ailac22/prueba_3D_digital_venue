import { NextFunction, Request, Response } from "express";
import { dataSource } from "../../database/data-source";
import { User } from "./entity";
import { Transaction } from "../transaction/entity";
import { UserCounts, UsersIndexResponse, UsersTotal } from "./types";
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

      const queryRunner = dataSource.createQueryRunner()

      queryRunner.startTransaction()

      const amount: UsersTotal = await queryRunner.manager.createQueryBuilder()
        .select("SUM(transaction.amount)", "amount").from(Transaction, "transaction").execute()

      const data: UserCounts[] = await queryRunner.manager.createQueryBuilder()
        .select(['user.id as id', 'user.username as username'])
        .addSelect('SUM(transaction.amount)', 'totalAmount')
        .addSelect('COUNT(transaction.id)', 'totalTransactions')
        .addSelect('MAX(transaction.created)', 'mostRecentTransactionDate')
        .from(User,"user")
        .leftJoin('user.transactions', 'transaction')
        .groupBy('user.id')
        .addGroupBy('user.username')
        .execute()

      await queryRunner.commitTransaction()

      const result: UsersIndexResponse = {totals: amount[0], data}
      res.status(200).json(result);

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

      if (typeof req.body.amount !== 'number' || typeof req.body.detail !== 'string')
        return res.status(400).send("Entrada incorrecta")

      const repo = dataSource.getRepository(TransactionEntity);
      const newTransaction = new TransactionEntity()

      newTransaction.amount = req.body.amount
      newTransaction.detail = req.body.detail
      
      newTransaction.user = req.user

      delete newTransaction.user.role

      //TODO: AQUI También hay que hacer el total

      const savedEntity = await repo.save(newTransaction)

      return res.send(savedEntity)

    } catch (error) {
      next(error); //TODO: A donde iria esto?
    }
  };

  /**
   * @description Gets User entity.
   * @param {Req} req
   * @param {Res} res
   */
  static view = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const user = await dataSource.getRepository(User).findOne({
        where: {
          id: req.user.id
        },
        relations: {
          transactions: true,
        },
      })

      return res.send(user)

    } catch (error) {
      next(error);
    }
  };
}
