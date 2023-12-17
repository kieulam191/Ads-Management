import Ajv from 'ajv';
import addFormats from "ajv-formats"


const accountSchema = {
    type: "object",
    properties: {
      email: {type: "string", format: "email"},
      role_type: {type: "number"}
    },
    required: ["email", "role_type"],
    additionalProperties: false,
}

const emailSchema = {
  type: "object",
  properties: {
    email: {type: "string", format: "email"},
  },
  required: ["email"],
  additionalProperties: false,
}

const otpSchema = {
  type: "object",
  properties: {
    email: {type: "string", format: "email"},
    otp: {type: "string"}
  },
  required: ["email", "otp"],
  additionalProperties: false,
}

const passwordSchema = {
  type: "object",
  properties: {
    new_password: {type: "string",  "minLength": 6},
   
  },
  required: ["new_password"],
  additionalProperties: false,
}

const ajv = new Ajv({allErrors: true}) 
addFormats(ajv, ['email'])

const accountValidate = ajv.compile(accountSchema)
const emailValidate = ajv.compile(emailSchema)
const otpValidate = ajv.compile(otpSchema)
const passwordValidate = ajv.compile(passwordSchema)

export { 
  accountValidate, 
  emailValidate, 
  otpValidate,
  passwordValidate,
};