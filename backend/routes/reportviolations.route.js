import express from 'express';
import * as reportviolationsModel from '../models/reportviolations.model.js'

const router = express.Router();

router.post('/', async (req, res) => {
    let wards = req.body.wards;
    let districts_fullname = req.body.districts_fullname;
    const data = await reportviolationsModel.findAll(wards,districts_fullname);

    return res.status(200).json(data);
});

router.post('/add', async (req, res) => {
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

router.post('/id', async (req,res) => {
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