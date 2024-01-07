import express from 'express';
import * as reportviolationsModel from '../models/reportviolations.model.js'

const router = express.Router();

router.post('/', async (req, res) => {
    // #swagger.description = 'Lấy danh sách báo cáo theo phường xã và quận huyện'
    let wards = req.body.wards;
    let districts_fullname = req.body.districts_fullname;
    const data = await reportviolationsModel.findAll(wards,districts_fullname);

    return res.status(200).json(data);
});

router.post('/add', async (req, res) => {
    // #swagger.description = 'Thêm báo cáo vi phạm'
    try{
        const data = await reportviolationsModel.add(req.body);
        return res.status(200).json({msg:"Success"});
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
    
});

router.post('/update', async (req, res) => {
    // #swagger.description = 'Cập nhật báo cáo vi phạm'
    try{
        let id = req.body.id; // Get id and data from request body
        let data = req.body.data;
        const result = await reportviolationsModel.update(id, data);
        return res.status(200).json({ msg: "Success" });
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
});

router.post('/id', async (req,res) => {
    // #swagger.description = 'Lấy báo cáo vi phạm theo id'
    try{
        let id = req.body.id || 0;
        const data = await reportviolationsModel.findById(id);
        return res.status(200).json(data);
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
    
});

export default router;