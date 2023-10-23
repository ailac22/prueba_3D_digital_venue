import { dataSource } from "../../database/data-source";
import { User } from "../user/entity";


function isRole(role: string) {
  return function (req, res, next) {

    if (req.user.role.type === role)
      next()
    else
      res.status(403).end()
  };
}

export const isAdmin = isRole('admin')

export const isCustomer = isRole('customer')


export const authStrategy = (jwt_payload, done) => {

    if (!jwt_payload.sub)
      return done(null, false)


    dataSource.getRepository(User).findOne({
      where: { id: jwt_payload.sub }, relations: { role: true, }
    }).then(async (user) => {

        if (user) {
            return done(null, user);
        } else {

            return done(null, false);
        }

    }).catch((err) => {
      return done(err, false);
    })



}

