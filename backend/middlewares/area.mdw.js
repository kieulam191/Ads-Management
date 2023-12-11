import areaValidate from "../config/areaSchema.config.js";

const checkAreaValid = (req, res, next) => {
    const valid = areaValidate(req.body);

    if (!valid) {
        return res.status(422).json({
          msg: "invalid data"
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