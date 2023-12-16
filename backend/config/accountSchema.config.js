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

const ajv = new Ajv({allErrors: true}) 
addFormats(ajv, ['email'])

const accountValidate = ajv.compile(accountSchema)
const emailValidate = ajv.compile(emailSchema)

export { accountValidate, emailValidate };