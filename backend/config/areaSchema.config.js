import Ajv from 'ajv';


const areaSchema = {
    type: "object",
    properties: {
      district: {type: "string"},
      data: {
        type: "array", 
        minItems: 1, 
        uniqueItems: true,
      }
    },
    required: ["district", "data"],
    additionalProperties: false,
}

const ajv = new Ajv({allErrors: true}) 

const validate = ajv.compile(areaSchema)

export default validate;