import accountValidate from "../config/accountSchema.config.js";
import * as accountModel  from '../models/account.model.js';


export function checkAcccountValid(req, res, next) {
    const valid = accountValidate(req.body)
    if (!valid) {
      return res.status(422).json({
        msg: "invalid email"
      })
    }
    next()
}

export async function checkAccountExists(req, res, next){
  const email = req.body.email;
  const check = await accountModel.findByEmail(email);

  if(check !== null) {
      return res.status(409).json({
          msg: "Email already exists"
      })
  }

  next()
}