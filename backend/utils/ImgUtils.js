import multer from "multer";
import { v4 as uuidv4 } from 'uuid';


console.log("dang xu ly anh");

const storage = multer.diskStorage({
   
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: async (req, file, cb) => {
        const url = uuidv4();

        console.log(url);
      
        req.url = url;
    
        cb(null, url+".jpeg")
    }
});



  


export default storage;