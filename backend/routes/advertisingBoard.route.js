import express from 'express';
import * as advertisingBoardModel from '../models/advertisingBoard.model.js'

const router = express.Router();

router.post('/', async (req, res) => {
    // #swagger.description = 'Lấy danh sách công ty biển quảng cáo theo phường xã và quận huyện'
    try{
    let wards = req.body.wards;
    let districts_fullname = req.body.districts_fullname;
    const data = await advertisingPlacementModel.findAll(wards,districts_fullname);

    return res.status(200).json(data);
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
});

router.post('/add', async (req, res) => {
    // #swagger.description = 'Thêm công ty biển quảng cáo'
    try{
        const data = await advertisinglocationsModel.add(req.body);
        return res.status(200).json({msg:"Success"});
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
});

router.post('/id', async (req,res) => {
    // #swagger.description = 'Lấy công ty biển quảng cáo theo id'
    try{
        
        let advertising_placement_id = req.body.advertising_placement_id || 0;
        if(advertising_placement_id != 0)
        {
            const data = await advertisingBoardModel.findByAdPlaId(advertising_placement_id);
            return res.status(200).json(data);
        }
        return res.status(200).json({});
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
    
});

router.post('/update', async (req,res) => {
    // #swagger.description = 'Cập nhật công ty biển quảng cáo'
    try{
        let id = req.body.id || 0;
        let data = req.body.data || {};
        await advertisingPlacementModel.update(id,data);
        return res.status(200).json({msg:"Success"});
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
});


export default router;