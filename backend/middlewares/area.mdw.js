import {districtValidate, wardValidate} from "../config/areaSchema.config.js";

const checkAreaValid = (req, res, next) => {
    const role_type = +req.params.role_type || 0;
    let valid;
    
    if(role_type === 1)
      valid = wardValidate(req.body);
    else {
      valid = districtValidate(req.body);
    }

    if (!valid) {
        return res.status(422).json({
          msg: `invalid data for role type is ${role_type}`
        })
    }
    
    next();
};

const setPageQuery = (req, res, next) => {
  if (!req.query.page) {
      let redirectUrl = req.originalUrl;
      if (redirectUrl.includes("?")) {
         redirectUrl += "&page=1";
      } else {
         redirectUrl += "?page=1";
      }
      res.redirect(redirectUrl);
  } else {
      next()
  }
}

export default checkAreaValid;