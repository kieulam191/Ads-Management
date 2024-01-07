import express from 'express';
import * as advertisingBoardModel from '../models/advertisingBoard.model.js'

const router = express.Router();

router.post('/', async (req, res) => {
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