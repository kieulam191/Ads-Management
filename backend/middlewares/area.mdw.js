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

export default checkAreaValid;