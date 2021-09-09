import roles from '../roles';

export const grantAccess = (action, resource) => {
  return async (req, res, next) => {
    try {
      const permission = roles.can(req.user.role.toString())[action](resource);
      if (!permission.granted) {
        return res.status(401).json({
          message: "You don't have enough permission to perform this action"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

export const allowIfLoggedin = async (req, res, next) => {
  try {
   const user = res.locals.loggedInUser;
   if (!user)
    return res.status(401).json({
     message: "You need to be logged in to access this route"
    });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}