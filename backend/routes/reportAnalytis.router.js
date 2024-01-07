import express from 'express';
import * as reportModel from '../models/report.model.js'
import {USER_REPORT_FIELDS} from '../config/constance.js'
import * as ts from "../utils/timestampUtil.js"

const router = express.Router();

router.get('/', async (req, res) => {
    /*
        #swagger.description = 'Lấy tất cả báo cáo'
     */
    let page = +req.query.page || 1;

    if(page < 1) page = 1;

    const data = await reportModel.findAll(page, USER_REPORT_FIELDS);

    return res.status(200).json({data});
});

router.get('/statistic', async (req, res) => {
    /*
        #swagger.description = 'thống kê báo cáo'
     */
    const {field} = req.query;
    const timestamp = ts.convertTS();
    const data = await reportModel.analysis(field, field, timestamp);

    return res.status(200).json(data);
})

export default router;