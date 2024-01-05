import express from 'express';
import * as adsReqModel from '../models/adsReq.model.js'

const router =express.Router();

router.post('/', async (req, res) => {


    const result = await adsReqModel.insert(req.body);

    if(result === null) {
        return res.status(400).json('data invalid')
    }


    return res.status(200).json({
        msg: "đang chờ phê duyệt"
    })
})

export default router;
