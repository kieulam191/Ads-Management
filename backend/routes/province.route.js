import express from 'express';
import * as provinceModel from '../models/province.model.js'
const router = express.Router();

router.get('/', async (req, res) => {
    // #swagger.description = 'Lấy danh sách tỉnh thành'
    const data = await provinceModel.findAll();
    res.status(200).json({
        data,
    });
});

export default router;