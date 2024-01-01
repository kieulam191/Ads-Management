import Ajv from 'ajv';


const wardAreaSchema = {
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
        maxItems:1, 
        uniqueItems: true,
      }
    },
    required: ["district_code", "province_code", "wards"],
    additionalProperties: false,
}


const districtAreaSchema = {
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

const districtValidate = ajv.compile(districtAreaSchema)
const wardValidate = ajv.compile(wardAreaSchema)

export {districtValidate, wardValidate};