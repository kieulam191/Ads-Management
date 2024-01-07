import express from 'express';
import * as areaModel from '../models/area.model.js';
import * as timestamp from '../utils/timestampUtil.js';


const router = express.Router();

router.get('/', function (req, res)
{
     // #swagger.description = 'Test'
    res.json(
        {
            msg: 'Hello from expressjs'
        }
    );
});




export default router;