import multer from "multer";
import storage from "../utils/ImgUtils.js" 

const upload = multer({
  storage: storage
});

export default upload;