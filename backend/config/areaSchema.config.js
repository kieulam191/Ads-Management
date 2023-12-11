import Ajv from 'ajv';


const areaSchema = {
    type: "object",
    properties: {
      district_code: {type: "string"},
      province_code: {type: "string"},
      wards: {
        type: "array", 
        items: {
          type: "string"
        },
        minItems: 1, 
        uniqueItems: true,
      }
    },
    required: ["district_code", "province_code", "wards"],
    additionalProperties: false,
}

const ajv = new Ajv({allErrors: true}) 

const validate = ajv.compile(areaSchema)

export default validate;