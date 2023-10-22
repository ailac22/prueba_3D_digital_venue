
//TODO: poner install http-errors ?

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



