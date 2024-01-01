import { accountValidate, emailValidate, otpValidate, passwordValidate } from "../config/accountSchema.config.js";
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

export async function checkEmailValid(req, res, next){
  const email = req.body.email;

  const valid = emailValidate(email)
  const check = await accountModel.findByEmail(email);

  if(!valid && check === null) {
      return res.status(409).json({
          msg: "Email invalid"
      })
  }

  next()
}

export async function checkOTPValid(req, res, next){
  const valid = otpValidate(req.body)

  if(!valid) {
      return res.status(409).json({
          msg: "OTP info invalid"
      })
  }

  next()
}

export async function checkPasswordValid(req, res, next){
  const valid = passwordValidate(req.body)

  if(!valid) {
      return res.status(409).json({
          msg: "password invalid. Length password at least is 6"
      })
  }

  next()
}