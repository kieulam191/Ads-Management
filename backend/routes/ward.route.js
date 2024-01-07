import express from 'express';
import * as wardModel from '../models/ward.model.js'
const router = express.Router();

router.post('/', async (req, res) => {
    // #swagger.description = 'Lấy danh sách phường xã theo mã quận huyện'
    let districtCode = req.body.districtCode;
    let page = req.body.page || 0;
    const data = await wardModel.getByDictrict(districtCode,page);
    res.status(200).json({
        data,
    });
});

export default router;