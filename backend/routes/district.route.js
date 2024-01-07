import express from 'express';
import * as districtModel from '../models/district.model.js'
const router = express.Router();

router.post('/', async (req, res) => {
    // #swagger.description = 'Lấy danh sách quận huyện theo mã tỉnh thành'
    let provinceCode = req.body.provinceCode || 79;
    let page = req.body.page || 0;
    const data = await districtModel.getByProvince(provinceCode,page);
    res.status(200).json({
        data,
    });
});

export default router;