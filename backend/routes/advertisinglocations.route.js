import express from 'express';
import * as advertisingModel from '../models/advertising.model.js'
import * as adsDetailModel from '../models/adsDetail.model.js'
import * as advertisinglocationsModel from '../models/advertisinglocations.model.js'

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
    let wards = req.body.wards;
    let districts_fullname = req.body.districts_fullname;
    const data = await advertisinglocationsModel.findAll(wards,districts_fullname);

    return res.status(200).json(data);
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
        let id = req.body.location_id || 0;
        const data = await advertisinglocationsModel.findById(req.body.location_id);
        return res.status(200).json(data);
    }
    catch(e)
    {
        console.log(e.stack);
        return res.status(400);
    }
    
});


export default router;