import express from 'express';
import * as advertisingPlacementModel from '../models/advertisingPlacement.model.js'

const router = express.Router();

router.get('/', async (req, res) => {
    const address = req.query.search;
    const result = await advertisinglocationsModel.findByAddress(address);

    if(result === null) {
        return res.status(204).end();
    }

    return res.status(200).json(result[0]);
})

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
        let id = req.body.id || 0;
        const data = await advertisingPlacementModel.findById(id);
        return res.status(200).json(data);
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